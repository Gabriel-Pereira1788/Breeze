import { supabase } from "@infra";
import { authAdapter } from "./authAdapter";
import { Session } from "./authTypes";

async function signIn(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data.session ? authAdapter.toValidSession(data.session) : null;
}

async function signUp(email: string, password: string, phone: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    phone,
  });

  if (error) throw new Error(error.message);

  return data.user ? authAdapter.toUser(data.user) : null;
}

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session ? authAdapter.toValidSession(data.session) : null;
}

function onAuthStateChanged(event: (session: Session | null) => void) {
  supabase.auth.onAuthStateChange((_event, session) => {
    const validSession = session && authAdapter.toValidSession(session);
    event(validSession);
  });
}

export const authService = {
  signIn,
  signUp,
  getSession,
  onAuthStateChanged,
};

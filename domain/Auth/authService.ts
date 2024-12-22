import { supabase } from "@infra";
import { authAdapter } from "./authAdapter";
import { Session, SignUpRequest } from "./authTypes";

let inMemorySession: Session | null = null;

async function signIn(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data.session ? authAdapter.toValidSession(data.session) : null;
}

async function signUp({ email, password, phone, username }: SignUpRequest) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    phone,
  });

  if (error) throw new Error(error.message);

  const { error: userError } = await supabase.from("profiles").upsert({
    id: data.user?.id,
    username: username,
  });

  if (userError) throw new Error(userError.message);

  return data.user ? authAdapter.toUser(data.user) : null;
}

async function fetchSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  const session = data.session
    ? authAdapter.toValidSession(data.session)
    : null;

  inMemorySession = session;
  return session;
}

function onAuthStateChanged(event: (session: Session | null) => void) {
  supabase.auth.onAuthStateChange((_event, session) => {
    const validSession = session && authAdapter.toValidSession(session);
    inMemorySession = validSession;
    event(validSession);
  });
}

function getInMemorySession() {
  return inMemorySession;
}

export const authService = {
  signIn,
  signUp,
  fetchSession,
  onAuthStateChanged,
  getInMemorySession,
};

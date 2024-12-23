import { authService, Session } from "@domain";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ISessionContext {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<ISessionContext>({
  session: null,
  loading: true,
});

const SessionContextActions = createContext<{ clearSession: () => void }>({
  clearSession: () => {},
});

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authService.fetchSession().then((_session) => {
      setSession(_session);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });

    authService.onAuthStateChanged((_session) => {
      setSession(_session);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  function clearSession() {
    setSession(null);
  }

  return (
    <SessionContextActions.Provider value={{ clearSession }}>
      <SessionContext.Provider value={{ session, loading }}>
        {children}
      </SessionContext.Provider>
    </SessionContextActions.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

export function useSessionActions() {
  return useContext(SessionContextActions);
}

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@/app/lib/firebase/auth";
import { Session, User } from "../types";
import { useRouter } from "next/navigation";
import { firebaseConfig } from "../firebase/config";

const SessionContext = createContext<User | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(session?.user || null);
  const router = useRouter();

  // Register the service worker that sends auth state back to server
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serviceWorkerUrl = `/auth-service-worker.js`;
      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => {
          console.log("scope is: ", registration.scope);
        })
        .catch((error) => {
          console.error("Failed to register service worker:", error);
        });

      navigator.serviceWorker.ready
        .then((registration) => {
          registration.active?.postMessage({
            type: "INIT",
            firebaseConfig,
          });
        })
        .catch((error) => {
          console.error("Service worker ready event failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          name: authUser?.displayName,
          id: authUser?.uid,
          email: authUser?.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { auth as firebaseAuth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(c) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          String(c.email),
          String(c.password)
        );
        const user = userCredential.user;
        const userDetails = {
          id: user.uid,
          email: String(user.email),
          name: user.displayName,
        };
        return userDetails;
      } catch (error) {
        return null;
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = !nextUrl.pathname.includes("/dashboard"); // if page not a dashboard page and not an auth page

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
  },
});

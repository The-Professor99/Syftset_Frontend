import { FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth, getIdToken } from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

declare const self: ServiceWorkerGlobalScope;

let firebaseConfigResolve: (config: FirebaseOptions) => void;
let firebaseConfigReject: (reason?: any) => void;

const firebaseConfigPromise = new Promise<FirebaseOptions>(
  (resolve, reject) => {
    firebaseConfigResolve = resolve;
    firebaseConfigReject = reject;
  }
);

// Listen for Firebase config via postMessage
self.addEventListener("message", (event) => {
  const data = event.data;
  if (data?.type === "INIT" && data.firebaseConfig) {
    console.log("Firebase config received");
    firebaseConfigResolve(data.firebaseConfig);
  }
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const { origin } = new URL(event.request.url);

  // Skip requests that don't match the service worker's origin
  if (origin !== self.location.origin) return;

  event.respondWith(
    firebaseConfigPromise
      .then((config) => fetchWithFirebaseHeaders(event.request, config))
      .catch((error) => {
        console.error("Failed to fetch with Firebase headers:", error);
        return new Response(
          "Service Worker Error: Firebase config missing or invalid.",
          { status: 500 }
        );
      })
  );
});

async function fetchWithFirebaseHeaders(
  request: Request,
  config: FirebaseOptions
) {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const installations = getInstallations(app);

  const headers = new Headers(request.headers);
  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);

  if (installationToken)
    headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);

  const newRequest = new Request(request, { headers });
  return fetch(newRequest);
}

async function getAuthIdToken(auth: Auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}

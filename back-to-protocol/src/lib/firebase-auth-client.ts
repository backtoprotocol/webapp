import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  getAuth,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  type Auth,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

export type ProtocolAuthUser = {
  uid: string;
  email: string;
  displayName: string;
};

function toProtocolUser(user: User | null): ProtocolAuthUser | null {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
  };
}

export function hasFirebaseConfig(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );
}

export function ensureFirebaseConfig(): void {
  if (!hasFirebaseConfig()) {
    throw new Error(
      "Missing Firebase config. Add NEXT_PUBLIC_FIREBASE_* values to the web app environment before using sign-in.",
    );
  }
}

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;

function ensureFirebaseApp(): FirebaseApp {
  if (cachedApp) {
    return cachedApp;
  }

  cachedApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return cachedApp;
}

function getFirebaseAuth(): Auth {
  if (cachedAuth) {
    return cachedAuth;
  }

  ensureFirebaseConfig();
  cachedAuth = getAuth(ensureFirebaseApp());
  return cachedAuth;
}

export function observeAuthState(callback: (user: ProtocolAuthUser | null) => void): () => void {
  if (!hasFirebaseConfig()) {
    callback(null);
    return () => {
      // no-op
    };
  }

  return onAuthStateChanged(getFirebaseAuth(), (user) => callback(toProtocolUser(user)));
}

export async function getEmailSignInMethods(email: string): Promise<string[]> {
  const auth = getFirebaseAuth();
  return fetchSignInMethodsForEmail(auth, email.trim().toLowerCase());
}

export async function loginWithEmail(email: string, password: string): Promise<ProtocolAuthUser> {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  const user = toProtocolUser(credential.user);

  if (!user) {
    throw new Error("Unable to sign in with email and password.");
  }

  return user;
}

export async function createWithEmail(email: string, password: string): Promise<ProtocolAuthUser> {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  const user = toProtocolUser(credential.user);

  if (!user) {
    throw new Error("Unable to create account with email and password.");
  }

  return user;
}

export async function loginWithGoogle(): Promise<ProtocolAuthUser> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const popupTimeoutMs = 60000;
  const credential = await Promise.race([
    signInWithPopup(auth, provider),
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        const timeoutError = new Error("Google popup did not complete in time.") as Error & { code?: string };
        timeoutError.code = "auth/popup-timeout";
        reject(timeoutError);
      }, popupTimeoutMs);
    }),
  ]);
  const user = toProtocolUser(credential.user);

  if (!user) {
    throw new Error("Unable to complete Google sign-in.");
  }

  return user;
}

export async function loginWithApple(): Promise<ProtocolAuthUser> {
  const auth = getFirebaseAuth();
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  const credential = await signInWithPopup(auth, provider);
  const user = toProtocolUser(credential.user);

  if (!user) {
    throw new Error("Unable to complete Apple sign-in.");
  }

  return user;
}

export async function sendResetEmail(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}

export async function signOutAccount(): Promise<void> {
  await signOut(getFirebaseAuth());
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code ?? "")
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email already has an account. Use your existing sign-in method.";
    case "auth/account-exists-with-different-credential":
      return "This email is already linked to another sign-in method. Use that method instead.";
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup closed before completion. Complete sign-in in the popup and do not close it manually.";
    case "auth/popup-blocked":
      return "Popup was blocked by the browser. Allow popups for this site and try again.";
    case "auth/popup-timeout":
      return "Google sign-in timed out. Keep the popup open, finish account selection, then try again.";
    case "auth/network-request-failed":
      return "Network error during sign-in. Check connection and try again.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase auth. Add it in Firebase Authentication settings.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in Firebase Authentication.";
    case "auth/missing-email":
      return "Enter your email address first.";
    default:
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
  }
}
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  createWithEmail,
  ensureFirebaseConfig,
  getAuthErrorMessage,
  getEmailSignInMethods,
  hasFirebaseConfig,
  loginWithApple,
  loginWithEmail,
  loginWithGoogle,
  sendResetEmail,
} from "@/lib/firebase-auth-client";

type FormMode = "sign-in" | "create";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.2 2.9-7.2 0-.7-.1-1.4-.2-2H12Z" />
      <path fill="#34A853" d="M12 21.5c2.6 0 4.8-.9 6.4-2.4l-3.1-2.4c-.9.6-2 1-3.3 1-2.5 0-4.6-1.7-5.4-4H3.4v2.5c1.6 3.1 4.8 5.3 8.6 5.3Z" />
      <path fill="#4A90E2" d="M6.6 13.7c-.2-.6-.3-1.2-.3-1.8s.1-1.3.3-1.8V7.6H3.4A9.6 9.6 0 0 0 2.4 12c0 1.5.4 3 1 4.4l3.2-2.7Z" />
      <path fill="#FBBC05" d="M12 6.1c1.4 0 2.7.5 3.6 1.4l2.7-2.7C16.7 3.3 14.5 2.4 12 2.4c-3.8 0-7 2.2-8.6 5.3l3.2 2.5c.8-2.4 2.9-4.1 5.4-4.1Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M16.8 12.7c0-2 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.7-1.4 0-2.7.8-3.4 2-.7 1.2-.9 3.1-.2 4.9.7 1.8 1.8 3.8 3.1 3.8.6 0 1.1-.4 2-.4.9 0 1.4.4 2.1.4 1.3 0 2.2-1.9 2.9-3.7.3-.8.4-1.3.4-1.4 0 0-1.9-.7-1.9-3Zm-2-6.1c.5-.7.8-1.6.7-2.5-.8 0-1.8.5-2.4 1.2-.5.6-.9 1.6-.8 2.5.9.1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function AuthButton({ children, onClick, disabled }: Readonly<{ children: React.ReactNode; onClick: () => void; disabled: boolean }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<FormMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);
  const passwordValid = useMemo(() => password.trim().length >= 6, [password]);

  const heading = mode === "create" ? "Create Account" : "Sign In";
  const submitLabel = mode === "create" ? "Create Account" : "Sign In";

  const requireConfig = () => {
    ensureFirebaseConfig();
  };

  const nextPath = useMemo(() => {
    const candidate = searchParams.get("next") || "/account";
    return candidate.startsWith("/") ? candidate : "/account";
  }, [searchParams]);

  const handleSuccess = () => {
    router.push(nextPath);
    router.refresh();
  };

  const clearMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };

  const handleEmailPasswordSubmit = async () => {
    if (!emailValid || !passwordValid || busy) {
      return;
    }

    setBusy(true);
    clearMessages();

    try {
      requireConfig();

      if (mode === "create") {
        await createWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }

      handleSuccess();
    } catch (error) {
      setErrorMessage(
        getAuthErrorMessage(error, mode === "create" ? "Unable to create account." : "Unable to sign in."),
      );
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    if (busy) {
      return;
    }

    setBusy(true);
    clearMessages();

    try {
      requireConfig();
      if (emailValid) {
        const methods = await getEmailSignInMethods(email);
        if (methods.includes("password")) {
          setInfoMessage("This email already uses password sign-in. Continue with email and password.");
        }
      }
      await loginWithGoogle();
      handleSuccess();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Unable to sign in with Google."));
    } finally {
      setBusy(false);
    }
  };

  const handleApple = async () => {
    if (busy) {
      return;
    }

    setBusy(true);
    clearMessages();

    try {
      requireConfig();
      await loginWithApple();
      handleSuccess();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Unable to sign in with Apple."));
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async () => {
    if (busy) {
      return;
    }

    clearMessages();

    if (!emailValid) {
      setErrorMessage("Enter your email address first.");
      return;
    }

    setBusy(true);

    try {
      requireConfig();
      await sendResetEmail(email);
      setInfoMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Unable to send password reset email."));
    } finally {
      setBusy(false);
    }
  };

  const configMissing = !hasFirebaseConfig();

  return (
    <div className="w-full max-w-[22rem] sm:max-w-[24rem]">
      <h2 className="text-4xl font-semibold tracking-tight text-slate-950">{heading}</h2>
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
        <span>{mode === "create" ? "Already have an account?" : "Don't have an account?"}</span>
        <button
          type="button"
          onClick={() => {
            clearMessages();
            setMode((current) => (current === "create" ? "sign-in" : "create"));
          }}
          className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-white"
        >
          {mode === "create" ? "Sign In" : "Create Account"}
        </button>
      </div>

      <div className="mt-10 space-y-5">
        <AuthButton onClick={handleGoogle} disabled={busy || configMissing}>
          <GoogleIcon />
          <span>{mode === "create" ? "Continue with Google" : "Sign in with Google"}</span>
        </AuthButton>
        <AuthButton onClick={handleApple} disabled={busy || configMissing}>
          <AppleIcon />
          <span>{mode === "create" ? "Continue with Apple" : "Sign in with Apple"}</span>
        </AuthButton>
      </div>

      <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
        <div className="h-px flex-1 bg-slate-200" />
        <span>Or</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleEmailPasswordSubmit();
        }}
      >
        <label className="block">
          <span className="sr-only">Email Address</span>
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 placeholder:text-slate-400 focus:border-slate-950 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="sr-only">Password</span>
          <input
            type="password"
            placeholder="Password"
            autoComplete={mode === "create" ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 placeholder:text-slate-400 focus:border-slate-950 focus:outline-none"
          />
        </label>

        {configMissing ? (
          <p className="text-sm leading-6 text-amber-700">
            Add your Firebase web config to the environment before using this page.
          </p>
        ) : null}

        {errorMessage ? <p className="text-sm leading-6 text-red-600">{errorMessage}</p> : null}
        {infoMessage ? <p className="text-sm leading-6 text-slate-600">{infoMessage}</p> : null}

        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="submit"
            disabled={busy || !emailValid || !passwordValid || configMissing}
            className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {busy ? "Please wait..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => void handleResetPassword()}
            className="text-sm font-medium text-slate-950 transition hover:text-slate-600 disabled:cursor-not-allowed disabled:text-slate-400"
            disabled={busy || configMissing}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      <p className="mt-8 text-sm text-slate-600">
        Questions?{" "}
        <Link href="/about" className="underline underline-offset-4 transition hover:text-slate-950">
          Our support team is here to help.
        </Link>
      </p>
    </div>
  );
}
import Link from 'next/link';

export const metadata = {
  title: 'Sign In - Back to Protocol',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-neutral-200">
        <div className="container-max">
          <div className="h-20 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-700">Back to Protocol</Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Sign In</h1>
            <p className="text-neutral-700">Access your account</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-neutral-900 font-semibold mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <div>
              <label className="block text-neutral-900 font-semibold mb-2">Password</label>
              <input type="password" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <button type="submit" className="w-full btn-primary">Sign In</button>
          </form>

          <button className="w-full px-4 py-3 border-2 border-neutral-300 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
            Sign in with Google
          </button>

          <p className="text-center text-neutral-700">
            Don't have an account? <Link href="/auth/signup" className="text-primary-700 font-semibold hover:text-primary-800">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export const metadata = {
  title: 'Contact - Back to Protocol',
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold text-primary-700">Back to Protocol</Link>
            <div className="flex gap-4">
              <Link href="/auth/signin" className="btn-outline text-sm">Sign In</Link>
              <Link href="/auth/signup" className="btn-primary text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max py-16">
        <h1 className="mb-8">Contact Us</h1>
        <div className="max-w-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-neutral-900 font-semibold mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <div>
              <label className="block text-neutral-900 font-semibold mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <div>
              <label className="block text-neutral-900 font-semibold mb-2">Message</label>
              <textarea rows={6} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
          <Link href="/" className="btn-outline inline-block mt-8">Back Home</Link>
        </div>
      </div>
    </div>
  );
}

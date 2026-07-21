import Link from 'next/link';

export const metadata = {
  title: 'About - Back to Protocol',
};

export default function AboutPage() {
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
        <h1 className="mb-8">About Back to Protocol</h1>
        <div className="max-w-3xl space-y-6">
          <p>
            Back to Protocol is a health and wellness media company dedicated to providing evidence-based, scientifically-sound information on topics that matter to your health.
          </p>
          <p>
            Our mission is to bridge the gap between medical research and everyday wellness practices, making expert knowledge accessible to everyone.
          </p>
          <p>
            All content is reviewed by qualified medical professionals to ensure accuracy and safety.
          </p>
          <Link href="/" className="btn-primary inline-block mt-8">Back Home</Link>
        </div>
      </div>
    </div>
  );
}

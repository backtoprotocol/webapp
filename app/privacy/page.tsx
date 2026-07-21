import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Back to Protocol',
};

export default function PrivacyPage() {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold text-primary-700">Back to Protocol</Link>
          </div>
        </div>
      </header>

      <div className="container-max py-16">
        <h1 className="mb-8">Privacy Policy</h1>
        <div className="max-w-3xl space-y-6 prose prose-neutral">
          <div className="bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-lg">
            <p className="text-sm text-neutral-700 font-semibold">⚠️ IMPORTANT: This is a template. Please have a lawyer review and customize this privacy policy for your specific needs and jurisdiction before publishing.</p>
          </div>

          <h2 className="text-2xl font-bold mt-8">1. Introduction</h2>
          <p>Back to Protocol ("we," "us," or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.</p>

          <h2 className="text-2xl font-bold mt-8">2. Information Collection</h2>
          <p>We collect several different types of information for various purposes to provide and improve our service to you.</p>

          <h2 className="text-2xl font-bold mt-8">3. Use of Data</h2>
          <p>Back to Protocol uses the collected data for various purposes including providing and maintaining our service, notifying you about changes, allowing you to participate in interactive features, and for analysis and improvement of our service.</p>

          <h2 className="text-2xl font-bold mt-8">4. Security</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure.</p>

          <Link href="/" className="btn-primary inline-block mt-8">Back Home</Link>
        </div>
      </div>
    </div>
  );
}

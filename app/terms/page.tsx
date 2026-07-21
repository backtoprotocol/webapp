import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Back to Protocol',
};

export default function TermsPage() {
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
        <h1 className="mb-8">Terms of Service</h1>
        <div className="max-w-3xl space-y-6">
          <div className="bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-lg">
            <p className="text-sm text-neutral-700 font-semibold">⚠️ IMPORTANT: This is a template. Please have a lawyer review and customize these terms for your specific needs and jurisdiction before publishing.</p>
          </div>

          <h2 className="text-2xl font-bold mt-8">1. Agreement to Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2 className="text-2xl font-bold mt-8">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Back to Protocol for personal, non-commercial transitory viewing only.</p>

          <h2 className="text-2xl font-bold mt-8">3. Disclaimer</h2>
          <p>The materials on Back to Protocol are provided on an 'as is' basis. Back to Protocol makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>

          <h2 className="text-2xl font-bold mt-8">4. Medical Disclaimer</h2>
          <p>The content provided on this website is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider before making any decisions about your health.</p>

          <Link href="/" className="btn-primary inline-block mt-8">Back Home</Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-max py-24 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-neutral-700 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}

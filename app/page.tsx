import Link from 'next/link';
import { TOPICS } from '@/lib/constants';

export default function HomePage() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold text-primary-700">
              Back to Protocol
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="#" className="text-neutral-700 hover:text-primary-700">Topics</Link>
              <Link href="/about" className="text-neutral-700 hover:text-primary-700">About</Link>
              <Link href="/contact" className="text-neutral-700 hover:text-primary-700">Contact</Link>
            </nav>
            <div className="flex gap-4">
              <Link href="/auth/signin" className="btn-outline text-sm">Sign In</Link>
              <Link href="/auth/signup" className="btn-primary text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Evidence-Based Health
            <span className="block text-primary-700">and Wellness</span>
          </h1>
          <p className="text-xl text-neutral-700 mb-8 max-w-2xl mx-auto">
            Trusted medical expertise and scientific insights to help you live your healthiest life.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#featured" className="btn-primary">Explore Articles</Link>
            <Link href="#topics" className="btn-outline">Browse Topics</Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="featured" className="py-16 md:py-24">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Featured Articles</h2>
            <p className="text-lg text-neutral-700">Latest insights from our expert contributors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100" />
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1 rounded-full">Sample Topic</span>
                  <h3 className="text-xl font-bold text-neutral-900 mt-3 mb-2">Sample Article {i}</h3>
                  <p className="text-neutral-700 text-sm mb-4">This is a sample article. Connect your database to see real content.</p>
                  <div className="flex justify-between text-xs text-neutral-600 pt-4 border-t border-neutral-200">
                    <span>Dr. Author</span>
                    <time>Today</time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-max">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-8 max-w-md">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Stay Informed</h3>
            <p className="text-neutral-700 mb-6">Get evidence-based health insights delivered to your inbox.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section id="topics" className="py-16 md:py-24">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Browse by Topic</h2>
            <p className="text-lg text-neutral-700">Explore health topics that matter to you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TOPICS.map((topic) => (
              <Link
                key={topic}
                href={`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white border border-neutral-200 rounded-lg p-6 hover:border-primary-400 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-700">{topic}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-100 py-12">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Back to Protocol</h3>
              <p className="text-neutral-400 text-sm">Evidence-based health and wellness content from trusted medical experts.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-neutral-400 hover:text-white text-sm">About</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-neutral-400 hover:text-white text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-neutral-400 hover:text-white text-sm">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8">
            <p className="text-neutral-400 text-sm text-center">© 2024 Back to Protocol. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

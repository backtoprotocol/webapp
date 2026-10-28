import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Cookie Policy | Treehouse by Back to Protocol",
  description:
    "How cookies and similar technologies may be used on the Treehouse website.",
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Treehouse · Privacy"
      title="Cookie policy"
      description="This policy explains how cookies and similar browser technologies may be used when you visit the Treehouse website."
      lastUpdated="October 28, 2026"
      sections={[
        {
          id: "what-cookies-are",
          title: "What cookies are",
          content: (
            <p>
              Cookies are small files stored by your browser. Similar
              technologies can store or read limited information on your device
              to support website functions and security.
            </p>
          ),
        },
        {
          id: "how-we-use-them",
          title: "How the website may use them",
          content: (
            <p>
              The Treehouse website may use cookies or similar technologies
              where needed to deliver pages, maintain security, remember
              settings, or understand basic website performance. The specific
              technologies in use can change as the website is maintained.
            </p>
          ),
        },
        {
          id: "your-choices",
          title: "Your choices",
          content: (
            <p>
              Most browsers let you review, block, or delete cookies through
              their settings. If you block a cookie that a website function
              depends on, that function may not work as expected. Browser
              controls do not necessarily remove information already held by a
              website or service provider.
            </p>
          ),
        },
        {
          id: "updates-contact",
          title: "Updates and contact",
          content: (
            <p>
              We may update this policy when website technologies or practices
              change. The date above indicates the latest revision. Questions
              about cookies or privacy can be sent to{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Treehouse%20cookie%20question">
                support@backtoprotocol.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}

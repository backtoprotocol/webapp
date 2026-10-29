import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: { absolute: "Cookie Policy | Back to Protocol" },
  description:
    "Learn how Back to Protocol uses cookies and similar technologies across our websites and web-based products.",
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Back to Protocol · Privacy"
      title="Cookie policy"
      description="This policy explains how Back to Protocol may use cookies and similar technologies on our websites and web-based products, and how you can manage them."
      lastUpdated="October 29, 2026"
      sections={[
        {
          id: "scope",
          title: "Scope and relationship to our Privacy Policy",
          content: (
            <p>
              This Cookie Policy applies to Back to Protocol websites and
              web-based products that link to it. It supplements our{" "}
              <a href="/privacy">Privacy Policy</a>, which describes more
              generally how we handle personal information across our company,
              apps, and software. A mobile or desktop app may use technologies
              that are controlled by its operating system or providers and may
              have additional product-specific disclosures.
            </p>
          ),
        },
        {
          id: "what-they-are",
          title: "What cookies and similar technologies are",
          content: (
            <>
              <p>
                Cookies are small files that a website may place in your
                browser. Similar technologies include local storage, pixels,
                tags, SDKs, and other methods that store or access information
                on a device or help recognize a browser or device on later
                requests.
              </p>
              <p>
                A cookie may be set for a single visit (“session” cookies) or
                remain until it expires or you delete it (“persistent”
                cookies). First-party cookies are set by the site you visit;
                third-party technologies are provided by another organization.
              </p>
            </>
          ),
        },
        {
          id: "purposes",
          title: "Why these technologies may be used",
          content: (
            <>
              <p>
                Depending on the website, product, and configuration, we or
                service providers may use these technologies for purposes such
                as:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Essential operation and security:</strong> to deliver
                  pages or requested functions, route requests, help prevent
                  abuse, and protect the service.
                </li>
                <li>
                  <strong>Preferences:</strong> to remember choices or settings
                  you make, where the website provides those features.
                </li>
                <li>
                  <strong>Performance and diagnostics:</strong> to understand
                  reliability, diagnose errors, and measure how a service is
                  functioning, where such tools are enabled.
                </li>
                <li>
                  <strong>Optional measurement or promotion:</strong> if a
                  product uses optional analytics or advertising technologies,
                  they may help measure visits or campaigns, subject to
                  applicable law and any required consent or choice.
                </li>
              </ul>
              <p>
                The specific technologies and purposes can vary. We do not
                claim that every category is used on every Back to Protocol
                website or product. Where a consent banner or settings tool is
                provided, it will describe the choices available for that
                service.
              </p>
              <p>
                On this website, Cloudflare Web Analytics measures page visits
                and performance. Its browser beacon is not loaded unless you
                choose “Allow optional analytics” in our privacy choices.
                Choosing “Use essential only” keeps the analytics beacon off.
                If you opt in, the beacon sends page-view and performance
                measurements to Cloudflare. See{" "}
                <a href="https://www.cloudflare.com/privacypolicy/">
                  Cloudflare’s Privacy Policy
                </a>{" "}
                for information about its handling of data.
              </p>
            </>
          ),
        },
        {
          id: "information",
          title: "Information that may be collected",
          content: (
            <p>
              Information handled through cookies or similar technologies may
              include a cookie or device identifier, browser or device type,
              settings, pages or features requested, timestamps, and technical
              or diagnostic data. Depending on the technology and context,
              some of this information may be considered personal information
              under applicable law. See the{" "}
              <a href="/privacy">Privacy Policy</a> for information about how
              personal information is handled.
            </p>
          ),
        },
        {
          id: "third-parties",
          title: "Third-party technologies",
          content: (
            <p>
              Some website functions may be provided by third parties, such as
              hosting, security, embedded content, or other services. If those
              providers use cookies or similar technologies, their collection
              and use of information is subject to their own privacy notices
              and settings. We do not control technologies on third-party
              websites or services.
            </p>
          ),
        },
        {
          id: "choices",
          title: "Your choices and browser controls",
          content: (
            <>
              <p>
                You can choose “Use essential only” or “Allow optional
                analytics” when the privacy choices notice appears. The
                choice is stored in a first-party cookie in this browser for
                up to 180 days. You can reopen Privacy choices at any time
                using the link in the footer. If you withdraw an analytics
                choice, the page reloads to stop further beacon activity.
                Analytics remain off when your browser sends a Global Privacy
                Control signal. Essential hosting and security processing is
                separate and may still occur regardless of your analytics
                choice.
              </p>
              <p>
                Most browsers let you review, block, or delete cookies through
                browser settings. You can also configure some devices to limit
                tracking. Blocking or deleting cookies may affect sign-in,
                preferences, security, or other site functions. Browser
                controls do not necessarily remove information already held by
                a service provider.
              </p>
              <p>
                Some browsers send “Do Not Track” signals. There is no
                consistent industry standard for responding to all such
                signals; where applicable law requires recognition of a
                browser-based opt-out signal, we will honor it for the
                processing covered by that law.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "Retention",
          content: (
            <p>
              Cookie lifetimes vary by purpose and provider. Session cookies
              generally expire when you close your browser; persistent cookies
              remain until their stated expiration or until you delete them.
              The browser or device controls described above can help you
              remove stored cookies. Other records held by a service provider
              may be subject to that provider’s retention practices and our
              applicable agreements.
            </p>
          ),
        },
        {
          id: "changes-contact",
          title: "Changes and contact",
          content: (
            <p>
              We may update this policy as our websites, products, or
              technology practices change. We will post updates here and
              revise the date above. Questions about this policy can be sent
              to{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Back%20to%20Protocol%20cookie%20question">
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

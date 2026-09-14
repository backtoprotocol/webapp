import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Accessibility Statement | Back to Protocol",
  description: "Back to Protocol's commitment to a website that is accessible to everyone.",
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Accessibility statement"
      description="Back to Protocol is committed to making our website usable for everyone, including people who use assistive technology. This page describes our approach, standards, and how to reach us with feedback."
      lastUpdated="September 12, 2026"
      sections={[
        {
          id: "our-commitment",
          title: "Our commitment",
          content: (
            <p>
              As a technology company, we believe our own website should reflect good technical practice. We work to
              ensure that people with visual, auditory, motor, or cognitive disabilities can navigate, understand,
              and use backtoprotocol.com, including requesting support and reviewing our services, without
              unnecessary barriers.
            </p>
          ),
        },
        {
          id: "conformance-standard",
          title: "Conformance standard",
          content: (
            <p>
              We use the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, as our target standard. These
              guidelines explain how to make web content more accessible for people with disabilities and more
              usable for everyone. Our goal is to meet or exceed these guidelines across the site, and we treat
              accessibility as an ongoing effort rather than a one-time project.
            </p>
          ),
        },
        {
          id: "measures-taken",
          title: "Measures we have taken",
          content: (
            <>
              <p>To support accessibility, we design and build the site with the following practices in mind:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Semantic HTML structure with proper headings, landmarks, and labeled form fields.</li>
                <li>Sufficient color contrast between text and background across the site.</li>
                <li>Keyboard-navigable menus, links, and interactive elements, including visible focus states.</li>
                <li>Descriptive link text and alternative text for meaningful images.</li>
                <li>Responsive layouts that remain usable when zoomed or viewed on smaller screens.</li>
                <li>Regular review of new pages and components against accessibility best practices before launch.</li>
              </ul>
            </>
          ),
        },
        {
          id: "known-limitations",
          title: "Known limitations",
          content: (
            <p>
              While we aim for full conformance, some parts of the site may not yet fully meet every WCAG 2.1 AA
              success criterion, particularly in third-party embeds, payment widgets, or newly added features that
              are still being refined. We are actively working to identify and correct these issues. If you
              encounter a barrier, please let us know using the contact information below so we can prioritize a
              fix.
            </p>
          ),
        },
        {
          id: "assistive-technology",
          title: "Compatibility with assistive technology",
          content: (
            <p>
              The site is built to work with current versions of major browsers and commonly used assistive
              technology, including screen readers and keyboard-only navigation. Accessibility can be affected by
              factors outside our control, including your browser version, operating system settings, and any
              third-party assistive software you use. If something does not work as expected with your setup, we
              want to hear about it.
            </p>
          ),
        },
        {
          id: "feedback",
          title: "Feedback and contact",
          content: (
            <p>
              We welcome feedback on the accessibility of backtoprotocol.com. If you experience any difficulty
              accessing content, using a form, or completing a task on our site, contact us at{" "}
              <a href="mailto:support@backtoprotocol.com" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support@backtoprotocol.com
              </a>{" "}
              or through our{" "}
              <a href="/support" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support request form
              </a>
              . Please describe the issue and the page where it occurred so we can investigate and respond as
              quickly as possible.
            </p>
          ),
        },
        {
          id: "ongoing-effort",
          title: "An ongoing effort",
          content: (
            <p>
              Accessibility is not a fixed checklist; it is part of how we build and maintain this site. We
              periodically review pages, test with keyboard-only navigation, and update components as standards and
              tools evolve. This statement will be updated to reflect meaningful changes to our accessibility
              practices.
            </p>
          ),
        },
      ]}
    />
  );
}

import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Accessibility | Treehouse by Back to Protocol",
  description:
    "Learn how Back to Protocol approaches accessibility across the Treehouse website and app, and how to contact us for support.",
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      eyebrow="Treehouse · Accessibility"
      title="Accessibility statement"
      description="Back to Protocol aims to make Treehouse and its website clear, usable, and accessible to people with a wide range of abilities and access needs."
      lastUpdated="October 28, 2026"
      sections={[
        {
          id: "our-approach",
          title: "Our approach",
          content: (
            <p>
              Accessibility is part of how we plan, design, and improve
              Treehouse. We consider different ways people read, navigate, and
              interact with the app and website, and work to make essential
              information and actions understandable and usable.
            </p>
          ),
        },
        {
          id: "accessibility-practices",
          title: "Accessibility practices",
          content: (
            <>
              <p>Our design and review work considers practices such as:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Clear page structure, headings, labels, and instructions.</li>
                <li>
                  Keyboard access and visible focus for interactive website
                  controls.
                </li>
                <li>
                  Readable text, sufficient contrast, and layouts that adapt to
                  different screen sizes and magnification.
                </li>
                <li>
                  Meaningful descriptions for images and controls where needed.
                </li>
                <li>
                  Reviewing accessibility as website and app experiences are
                  updated.
                </li>
              </ul>
              <p>
                We use recognized accessibility guidance, including the Web
                Content Accessibility Guidelines (WCAG), to inform this work.
                This statement describes our approach and is not a certification
                of conformance.
              </p>
            </>
          ),
        },
        {
          id: "treehouse-content",
          title: "Treehouse and your content",
          content: (
            <p>
              Treehouse is intended to help organize personal information such
              as IDs, documents, cards, accounts, insurance details, and
              important dates. We aim to present app information and controls
              clearly so people can understand what they are viewing and what an
              action will do.
            </p>
          ),
        },
        {
          id: "feedback",
          title: "Accessibility feedback and assistance",
          content: (
            <p>
              If you have difficulty accessing the website or using Treehouse,
              or need information in another format, contact us at{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Treehouse%20accessibility">
                support@backtoprotocol.com
              </a>
              . Please include the page or app area you were using, what you
              were trying to do, and a way for us to reply. Please do not email
              IDs, account details, or other sensitive personal information.
            </p>
          ),
        },
        {
          id: "ongoing-review",
          title: "Ongoing review",
          content: (
            <p>
              Accessibility needs and technology change over time. We consider
              feedback and review our digital experiences as they are updated.
              We welcome specific suggestions that can help us make Treehouse
              easier to use.
            </p>
          ),
        },
      ]}
    />
  );
}

import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: { absolute: "Accessibility | Back to Protocol" },
  description:
    "Learn how Back to Protocol approaches accessibility across our websites, apps, and software, and how to contact us for support.",
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      eyebrow="Back to Protocol · Accessibility"
      title="Accessibility statement"
      description="We aim to make Back to Protocol websites, apps, and software clear, usable, and accessible to people with a wide range of abilities and access needs."
      lastUpdated="October 29, 2026"
      sections={[
        {
          id: "our-approach",
          title: "Our approach",
          content: (
            <p>
              Accessibility is part of how we plan, design, build, and improve
              our digital products. Back to Protocol creates apps and software,
              including Treehouse, and we consider different ways people read,
              navigate, and interact with our products and websites. We work
              to make information and actions understandable and usable.
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
                  Keyboard access and visible focus for interactive controls
                  where applicable.
                </li>
                <li>
                  Readable text, sufficient contrast, and layouts that adapt to
                  different screen sizes and magnification.
                </li>
                <li>
                  Meaningful descriptions for images and controls where needed.
                </li>
                <li>
                  Reviewing accessibility as our websites, apps, and software
                  experiences are updated.
                </li>
              </ul>
              <p>
                We use recognized accessibility guidance, including the Web
                Content Accessibility Guidelines (WCAG), to inform this work.
                This statement describes our approach and is not a certification
                or guarantee of conformance. The accessibility of a particular
                feature may depend on the device, operating system, assistive
                technology, and third-party services used with it.
              </p>
            </>
          ),
        },
        {
          id: "products",
          title: "Our products",
          content: (
            <p>
              Our products are designed for different purposes. Treehouse, for
              example, helps people organize personal information such as IDs,
              documents, cards, accounts, insurance details, and important
              dates. We aim to present product information and controls clearly
              so people can understand what they are viewing and what an action
              will do. Some product features may rely on third-party platforms
              or operating-system capabilities that we do not control.
            </p>
          ),
        },
        {
          id: "feedback",
          title: "Accessibility feedback and assistance",
          content: (
            <p>
              If you have difficulty accessing a Back to Protocol website, app,
              or software product, or need information in another format,
              contact us at{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Back%20to%20Protocol%20accessibility">
                support@backtoprotocol.com
              </a>
              . Please include the product and page or feature you were using,
              what you were trying to do, and a way for us to reply. Please do
              not email IDs, account details, or other sensitive personal
              information.
            </p>
          ),
        },
        {
          id: "ongoing-review",
          title: "Ongoing review",
          content: (
            <p>
              Accessibility needs and technology change over time. We consider
              feedback and review our digital products as they are updated. We
              welcome specific suggestions that can help make our products
              easier to use.
            </p>
          ),
        },
      ]}
    />
  );
}

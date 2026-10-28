import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Terms of Use | Treehouse by Back to Protocol",
  description:
    "Terms for visiting the Treehouse website and using the Treehouse app from Back to Protocol.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Treehouse · Terms"
      title="Terms of use"
      description="These terms explain the basic rules for accessing the Treehouse website and app. By using Treehouse, you agree to these terms."
      lastUpdated="October 28, 2026"
      sections={[
        {
          id: "acceptance",
          title: "Using Treehouse",
          content: (
            <p>
              These terms apply to your access to and use of the Treehouse
              website and app, provided by Back to Protocol. If you do not agree
              to them, do not use Treehouse. If you use Treehouse on behalf of
              another person, you must have authority to accept these terms for
              them.
            </p>
          ),
        },
        {
          id: "the-app",
          title: "What Treehouse does",
          content: (
            <p>
              Treehouse helps you organize personal information such as IDs,
              documents, scanned copies, cards, accounts, insurance details,
              and important dates. Features may change over time. Treehouse is
              an organizational tool; it does not replace original documents,
              official records, or advice from qualified legal, financial,
              insurance, or medical professionals.
            </p>
          ),
        },
        {
          id: "your-information",
          title: "Your information and responsibilities",
          content: (
            <>
              <p>
                You decide what information to add to Treehouse and are
                responsible for ensuring that you have the right to store and
                use it. Keep original documents and any records required by an
                issuing organization. Review saved information for accuracy and
                keep your device and account access secure.
              </p>
              <p>
                Do not use Treehouse to store or share information unlawfully,
                infringe another person’s rights, or interfere with the service
                or another person’s use of it.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Sharing and cloud backup",
          content: (
            <p>
              Treehouse may provide options to back up or share information.
              These features operate based on your choices and the settings
              available to you. You are responsible for selecting the items and
              recipients when sharing. A recipient may retain or further share
              information they receive. Cloud backup is not a substitute for
              maintaining any original records you are required to keep.
            </p>
          ),
        },
        {
          id: "privacy",
          title: "Privacy",
          content: (
            <p>
              Our{" "}
              <a href="/privacy">Privacy Policy</a>{" "}
              explains how information is handled when you use Treehouse. Please
              review it before adding personal information to the app.
            </p>
          ),
        },
        {
          id: "ownership",
          title: "Treehouse content and ownership",
          content: (
            <p>
              Treehouse, its software, branding, and associated content are
              owned by Back to Protocol or its licensors and are protected by
              applicable intellectual property laws. These terms allow you to
              use the service for its intended purpose; they do not transfer
              ownership of the app or its underlying technology to you. You
              retain your rights to information and documents you provide.
            </p>
          ),
        },
        {
          id: "availability",
          title: "Availability and third-party services",
          content: (
            <p>
              We work to operate and maintain Treehouse, but features may be
              changed, interrupted, or unavailable from time to time.
              Treehouse may rely on third-party platforms or services, which
              are subject to their own terms and policies. We are not
              responsible for services operated by third parties.
            </p>
          ),
        },
        {
          id: "disclaimers",
          title: "Important disclaimers",
          content: (
            <p>
              To the extent permitted by law, Treehouse is provided “as is” and
              “as available.” We do not warrant that the service will be
              uninterrupted, error-free, or suitable for every purpose. You
              remain responsible for keeping copies of important records and
              making decisions based on your own circumstances.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          content: (
            <p>
              To the extent permitted by law, Back to Protocol will not be
              liable for indirect, incidental, special, consequential, or
              punitive damages, or for loss of data, profits, or goodwill,
              arising from use of or inability to use Treehouse. Nothing in
              these terms excludes liability that cannot be excluded under
              applicable law.
            </p>
          ),
        },
        {
          id: "suspension",
          title: "Suspension or termination",
          content: (
            <p>
              You may stop using Treehouse at any time. We may suspend or
              restrict access when reasonably necessary to protect the service
              or its users, address a violation of these terms, or comply with
              law. Where appropriate, we will provide notice and an opportunity
              to address the issue.
            </p>
          ),
        },
        {
          id: "changes-law",
          title: "Changes and governing law",
          content: (
            <p>
              We may update these terms to reflect changes to Treehouse or
              applicable requirements. Updates will be posted here with a
              revised date. These terms are governed by the laws of the State
              of Tennessee, without regard to conflict-of-law principles,
              except where applicable law requires otherwise.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          content: (
            <p>
              For questions about these terms or Treehouse, email{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Treehouse%20terms%20question">
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

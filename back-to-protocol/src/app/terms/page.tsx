import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: { absolute: "Terms of Use | Back to Protocol" },
  description:
    "Terms governing access to Back to Protocol websites, apps, software, and services, including Treehouse.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Back to Protocol · Terms"
      title="Terms of use"
      description="These terms govern your access to Back to Protocol websites, apps, software, and services, including Treehouse. A product may have additional terms for particular features."
      lastUpdated="October 29, 2026"
      sections={[
        {
          id: "agreement",
          title: "Agreement and scope",
          content: (
            <p>
              These terms are an agreement between you and Back to Protocol
              (“Back to Protocol,” “we,” “us,” or “our”). They apply to your
              access to or use of our websites, apps, software, and services
              that link to these terms, including Treehouse (collectively, the
              “Services”). By accessing or using a Service, you agree to these
              terms. If you do not agree, do not access or use that Service.
              Additional terms or notices may apply to particular Services or
              features; if they conflict with these terms, the additional terms
              control for that feature.
            </p>
          ),
        },
        {
          id: "eligibility-accounts",
          title: "Eligibility and accounts",
          content: (
            <>
              <p>
                You must be legally able to agree to these terms. If you use a
                Service for an organization or another person, you represent
                that you have authority to bind them to these terms, and “you”
                includes that organization or person.
              </p>
              <p>
                Some features require an account. You agree to provide
                information that is accurate to the extent required for the
                feature, keep your sign-in credentials and recovery information
                secure, and promptly notify us of suspected unauthorized
                account access. You are responsible for activity under your
                account except to the extent caused by our failure to meet
                obligations that cannot be excluded by law.
              </p>
              <p>
                Age requirements may vary by Service and applicable law.
                Treehouse is not directed to children under 13. A Service may
                impose additional eligibility requirements in its own notices.
              </p>
            </>
          ),
        },
        {
          id: "services",
          title: "Our Services",
          content: (
            <p>
              Back to Protocol designs and builds apps and software. Services
              and features may change, be updated, or be offered differently
              over time. Treehouse is an organizational tool that helps you
              keep personal information such as cards, documents, accounts,
              insurance details, notes, and important dates together. It does
              not replace original documents, official records, or advice from
              qualified legal, financial, insurance, medical, or other
              professionals. You are responsible for independently verifying
              information and decisions that matter to you.
            </p>
          ),
        },
        {
          id: "license",
          title: "Permission to use the Services",
          content: (
            <p>
              Subject to these terms, Back to Protocol grants you a limited,
              personal, non-exclusive, non-transferable, revocable license to
              access and use the applicable Service for its intended purpose.
              You may not sublicense, sell, lease, or commercially exploit a
              Service unless we have agreed in writing or applicable law gives
              you that right. Any app marketplace or platform through which
              you obtain a Service may impose additional terms.
            </p>
          ),
        },
        {
          id: "user-content",
          title: "Your content and responsibilities",
          content: (
            <>
              <p>
                You retain your rights to content you submit to or store in a
                Service (“User Content”). You are responsible for User Content,
                including ensuring that you have the rights and permissions
                needed to store, use, and share it. You decide what to add and
                should keep any original documents or records you are required
                to maintain.
              </p>
              <p>
                You grant Back to Protocol the limited, non-exclusive
                permission to host, process, transmit, display, and otherwise
                use User Content only as reasonably necessary to operate,
                secure, provide, and support the Service and features you
                choose, consistent with our{" "}
                <a href="/privacy">Privacy Policy</a>. This permission ends
                when your content is removed from the Service, except for
                copies retained temporarily in backups or as required or
                permitted by law.
              </p>
              <p>
                Do not upload or use content that you do not have the right to
                use, that violates another person’s rights, or that is
                unlawful. Do not submit passwords, verification codes, or
                sensitive documents through ordinary support email.
              </p>
            </>
          ),
        },
        {
          id: "acceptable-use",
          title: "Prohibited uses",
          content: (
            <>
              <p>You may not, and may not help another person to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Break the law, infringe rights, or use a Service to harm,
                  deceive, or unlawfully surveil another person.
                </li>
                <li>
                  Probe, scan, or test a Service for vulnerabilities, or
                  bypass, disable, or interfere with security or access
                  controls, except where applicable law does not allow this
                  restriction.
                </li>
                <li>
                  Disrupt, overload, reverse engineer, decompile, or attempt to
                  derive source code from a Service, except to the extent a
                  restriction is prohibited by applicable law.
                </li>
                <li>
                  Introduce malware, spam, or other harmful code or content, or
                  access a Service using automated means in a way that
                  interferes with its operation.
                </li>
                <li>
                  Misrepresent your identity, obtain access without
                  authorization, or use a Service in a way that violates these
                  terms or a product-specific policy.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "ownership",
          title: "Our intellectual property",
          content: (
            <p>
              The Services, including their software, designs, text, graphics,
              branding, and other materials, are owned by Back to Protocol or
              its licensors and are protected by intellectual-property laws.
              Except for the limited permission to use a Service described
              above, these terms do not grant you ownership or other rights in
              the Services. You may not use Back to Protocol or product names,
              logos, or branding without our prior written permission, except
              as allowed by law.
            </p>
          ),
        },
        {
          id: "privacy",
          title: "Privacy and personal information",
          content: (
            <p>
              Our <a href="/privacy">Privacy Policy</a> explains how Back to
              Protocol handles personal information. Our{" "}
              <a href="/cookies">Cookie Policy</a> describes cookies and
              similar technologies for websites and web-based services. By
              using a Service, you acknowledge that these notices apply to
              relevant information handling; they do not replace any rights or
              choices provided by applicable law.
            </p>
          ),
        },
        {
          id: "sharing-third-party",
          title: "Sharing, backups, and third-party services",
          content: (
            <p>
              Some Services may let you store, back up, synchronize, or share
              User Content. You are responsible for selecting what to share
              and with whom. A recipient may retain or further share
              information you provide. Services may rely on third-party
              platforms or providers, including sign-in providers and app
              marketplaces. Those services are governed by their own terms and
              privacy notices; Back to Protocol does not control their
              independent services.
            </p>
          ),
        },
        {
          id: "fees",
          title: "Fees and purchases",
          content: (
            <p>
              A Service may be free, paid, or include optional purchases as
              described when offered. Treehouse is currently described as free
              to download and use, with no subscriptions or in-app purchases.
              If that changes, any applicable price and purchase terms will be
              presented before you make a purchase. App marketplaces may
              separately apply their own terms.
            </p>
          ),
        },
        {
          id: "availability",
          title: "Availability, changes, and termination",
          content: (
            <>
              <p>
                We work to maintain the Services, but we do not guarantee that
                every feature will always be available, uninterrupted, secure,
                or error-free. We may update, suspend, or discontinue all or
                part of a Service for operational, security, legal, or product
                reasons. Where required by law, we will provide notice or other
                protections before a material change.
              </p>
              <p>
                You may stop using a Service at any time. We may suspend or
                terminate your access if reasonably necessary to address a
                security risk, comply with law, protect users or the Service,
                or respond to a material violation of these terms. Where
                appropriate, we will provide notice and an opportunity to
                address the issue.
              </p>
              <p>
                For Treehouse account and backup deletion details, see the{" "}
                <a href="/privacy">Privacy Policy</a>. Uninstalling an app may
                not delete an account or remotely stored content.
              </p>
            </>
          ),
        },
        {
          id: "warranties",
          title: "Disclaimers",
          content: (
            <p>
              To the maximum extent permitted by law, the Services are
              provided “as is” and “as available,” without warranties of any
              kind, whether express, implied, or statutory, including implied
              warranties of merchantability, fitness for a particular purpose,
              title, and non-infringement. We do not warrant that a Service
              will meet every requirement or that stored information will
              always be available. Nothing in these terms limits a warranty or
              consumer right that cannot lawfully be excluded.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          content: (
            <p>
              To the maximum extent permitted by law, Back to Protocol and its
              affiliates, personnel, and licensors will not be liable for
              indirect, incidental, special, consequential, exemplary, or
              punitive damages, or for loss of profits, goodwill, use, or data,
              arising out of or related to your use of or inability to use a
              Service. To the maximum extent permitted by law, our aggregate
              liability for claims relating to a Service will not exceed the
              greater of the amount you paid us for that Service in the
              twelve months before the event giving rise to the claim or
              US$100. These limitations do not apply to liability that cannot
              be limited under applicable law.
            </p>
          ),
        },
        {
          id: "indemnity",
          title: "Your responsibility for claims",
          content: (
            <p>
              To the extent permitted by law, you are responsible for claims
              arising from your unlawful use of a Service or your material
              violation of these terms, including User Content that infringes
              another person’s rights. Nothing in this section requires you to
              indemnify Back to Protocol for claims caused by our own
              negligence, misconduct, or breach where applicable law prohibits
              that requirement.
            </p>
          ),
        },
        {
          id: "changes-law",
          title: "Changes to these terms and governing law",
          content: (
            <>
              <p>
                We may update these terms to reflect changes to our Services
                or legal requirements. We will post the revised terms and
                update the date above. If a change materially affects your
                rights, we will provide additional notice where required.
                Continued use after updated terms take effect means you accept
                them to the extent permitted by law. If you do not agree to an
                update, stop using the affected Service.
              </p>
              <p>
                These terms are governed by the laws of the State of Tennessee,
                without regard to conflict-of-law principles, except where
                applicable law requires otherwise. Any dispute-resolution
                procedure or forum requirement will apply only to the extent
                permitted by applicable law.
              </p>
            </>
          ),
        },
        {
          id: "general",
          title: "General terms",
          content: (
            <p>
              If a provision of these terms is found unenforceable, the
              remaining provisions remain in effect to the extent permitted by
              law. Our failure to enforce a provision is not a waiver. You may
              not assign these terms without our consent; we may assign them
              as part of a merger, reorganization, or transfer of our
              business, subject to applicable law. These terms and any
              applicable product-specific terms are the entire agreement
              regarding the relevant Service and replace prior agreements on
              that subject.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact Back to Protocol",
          content: (
            <p>
              For questions about these terms or a Back to Protocol Service,
              email{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Back%20to%20Protocol%20terms%20question">
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

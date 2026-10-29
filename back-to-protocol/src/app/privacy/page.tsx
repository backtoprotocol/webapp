import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: { absolute: "Privacy Policy | Back to Protocol" },
  description:
    "Learn how Back to Protocol handles personal information across our company, products, software, website, and support channels.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Back to Protocol · Privacy"
      title="Privacy policy"
      description="This policy explains how Back to Protocol handles personal information when you visit our website, use Treehouse or another Back to Protocol product, or communicate with us."
      lastUpdated="October 29, 2026"
      sections={[
        {
          id: "who-we-are",
          title: "Who we are and what this policy covers",
          content: (
            <>
              <p>
                Back to Protocol (“Back to Protocol,” “we,” “us,” or “our”) is
                a technology company that designs and builds apps and software.
                We are responsible for personal information handled in
                connection with our company, products, and services, except
                where another notice or a third party’s own privacy policy
                applies.
              </p>
              <p>
                This policy applies to our public websites, Treehouse, other
                Back to Protocol products and software that link to this
                policy, and communications you send to us. It describes
                information handling in general; a product may provide
                additional, feature-specific notices. If a separate notice
                conflicts with this policy for a particular feature, the
                feature-specific notice controls for that feature.
              </p>
              <p>
                This policy does not cover third-party websites, platforms, or
                services that we do not operate. Their privacy practices are
                governed by their own notices.
              </p>
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Personal information we collect",
          content: (
            <>
              <p>
                The information we handle depends on which product or feature
                you use and what you choose to provide. It may include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Contact and account information:</strong> information
                  such as your name, email address, account identifiers, or
                  sign-in provider information when you create or use an
                  account, contact us, or use a product feature.
                </li>
                <li>
                  <strong>Content you provide or store:</strong> information
                  you choose to add to a product, such as documents, images,
                  scanned copies, cards, account details, notes, insurance
                  information, custom fields, and dates. Some of this content
                  may be sensitive or reveal sensitive information. You decide
                  what to add and should use care when storing or sharing it.
                </li>
                <li>
                  <strong>Support and other communications:</strong> the
                  information you include in messages, forms, or other
                  communications, including your name, reply email, selected
                  topic, and message content. Our Treehouse support form asks
                  for these details and prepares an email in your email
                  application. The website does not submit or store the form
                  fields. If you choose to send the email, your email provider
                  and ours may process and retain it under their own practices.
                </li>
                <li>
                  <strong>Device, usage, and diagnostic information:</strong>{" "}
                  technical information that may be generated when a website,
                  app, or software is requested or used, such as IP address,
                  device and browser characteristics, operating system,
                  timestamps, service events, and error or diagnostic data.
                  The information available depends on the product and its
                  configuration. If you opt in to Cloudflare Web Analytics on
                  this website, its beacon sends page-view and performance
                  measurements to Cloudflare. Your choice does not disable
                  technical processing needed to deliver and secure the site.
                </li>
                <li>
                  <strong>Information from platforms you choose:</strong>{" "}
                  limited account or authentication information made available
                  by a sign-in provider or platform you choose to use, subject
                  to that provider’s settings and privacy notice.
                </li>
              </ul>
              <p>
                We do not ask you to send passwords, verification codes,
                payment-card numbers, or private document contents in an
                ordinary support email. Please do not include sensitive
                information in a support request unless we have specifically
                provided a secure method and explained what to submit.
              </p>
            </>
          ),
        },
        {
          id: "sources",
          title: "How information reaches us",
          content: (
            <>
              <p>We may obtain personal information:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Directly from you when you use a product or contact us.</li>
                <li>
                  From your device or account when needed to provide a feature
                  you request, such as sign-in, synchronization, backup, or
                  sharing.
                </li>
                <li>
                  From a platform or provider you choose to connect to a
                  product, in accordance with your settings and permissions.
                </li>
                <li>
                  Automatically through service operation, security, and
                  diagnostic processes, as described for the relevant product
                  and subject to your applicable choices.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "How and why we use personal information",
          content: (
            <>
              <p>
                We use personal information for the purposes below, as
                appropriate to the product, feature, and relationship:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  To provide, operate, maintain, and support products and
                  features you choose to use.
                </li>
                <li>
                  To create and secure accounts, authenticate users, and
                  provide requested backup, synchronization, or sharing
                  functionality.
                </li>
                <li>
                  To respond to questions, handle support requests, and
                  communicate about a product or request.
                </li>
                <li>
                  To diagnose errors, maintain reliability, understand
                  performance, and develop or improve our products and software.
                </li>
                <li>
                  To detect, investigate, and help prevent fraud, abuse,
                  security incidents, and activity that violates our terms or
                  applicable law.
                </li>
                <li>
                  To comply with legal obligations, establish or exercise
                  legal rights, resolve disputes, and enforce agreements.
                </li>
              </ul>
              <p>
                We do not use the contents of your saved Treehouse items for a
                purpose unrelated to providing or protecting the features you
                choose, unless we explain that use separately or the law
                permits or requires it.
              </p>
            </>
          ),
        },
        {
          id: "legal-bases",
          title: "Legal bases where applicable",
          content: (
            <p>
              If the laws that apply to you require a legal basis for
              processing, we rely, as appropriate, on performing a contract or
              taking steps you request before entering one; our legitimate
              interests in operating, securing, and improving our products and
              communicating with users, balanced against your rights; your
              consent where we request it; and compliance with legal
              obligations. Where we rely on consent, you may withdraw it
              without affecting processing that took place before withdrawal.
              The applicable basis depends on the information and purpose.
            </p>
          ),
        },
        {
          id: "treehouse-encryption",
          title: "Treehouse content, encryption, and account security",
          content: (
            <>
              <p>
                Treehouse encrypts documents and photos on your device before
                they are uploaded for cloud backup. Encryption-key handling
                depends on the sign-in method:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Email sign-in:</strong> encryption keys are derived
                  from your password and are not available to Back to Protocol.
                  Keep your recovery key safe; it is needed to restore your
                  information if you forget your password.
                </li>
                <li>
                  <strong>Google or Apple sign-in:</strong> an encryption key
                  is stored in your private cloud account to make signing in on
                  a new device easier. Treehouse operators with database
                  administrative access may technically be able to access that
                  key.
                </li>
              </ul>
              <p>
                These statements describe the Treehouse sign-in and encryption
                options currently documented for the product. Other products
                or features may use different security designs and will be
                described in their applicable notices.
              </p>
              <p>
                We use safeguards appropriate to the nature of the information
                and service. No method of storage, transmission, or security
                control can be guaranteed to be completely secure. You are
                responsible for protecting your device, sign-in credentials,
                and recovery information.
              </p>
              <p>
                If we become aware of a security incident affecting personal
                information, we will investigate and provide notices to
                affected individuals or authorities when required by
                applicable law.
              </p>
            </>
          ),
        },
        {
          id: "how-we-share",
          title: "How we disclose personal information",
          content: (
            <>
              <p>
                We do not sell personal information. We do not use personal
                information for cross-context behavioral advertising. We may
                disclose or make information available in these circumstances:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Service providers:</strong> to vendors that provide
                  services on our behalf, such as hosting, cloud storage,
                  authentication, customer communications, security, or
                  technical operations. They may process information only as
                  needed to provide their services to us and subject to
                  applicable restrictions.
                </li>
                <li>
                  <strong>Platforms you select:</strong> to an identity
                  provider, app marketplace, or other third party when you
                  choose a feature that involves that provider. The provider’s
                  own privacy policy also applies to its handling of
                  information.
                </li>
                <li>
                  <strong>At your direction:</strong> when you choose to share
                  an item or otherwise direct us to send information to another
                  person or service.
                </li>
                <li>
                  <strong>Legal, safety, and rights:</strong> when we
                  reasonably believe disclosure is required by law, legal
                  process, or a valid government request, or is necessary to
                  protect the rights, safety, property, or security of users,
                  the public, or Back to Protocol.
                </li>
                <li>
                  <strong>Business changes:</strong> in connection with a
                  proposed or completed merger, acquisition, financing,
                  reorganization, bankruptcy, or sale or transfer of some or
                  all of our business, subject to applicable law.
                </li>
                <li>
                  <strong>With notice or consent:</strong> in another way we
                  describe when we collect the information or when you
                  otherwise direct or consent to the disclosure.
                </li>
              </ul>
              <p>
                We do not disclose the contents of your saved items to other
                users unless you choose to share them or use a feature that
                sends them. A recipient may save, copy, or further disclose
                information you share with them.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "Data retention and deletion",
          content: (
            <>
              <p>
                We keep personal information only for as long as reasonably
                necessary for the purposes described in this policy, including
                providing requested services, maintaining business and
                security records, resolving disputes, and meeting legal
                obligations. Retention periods depend on the type of
                information, how it is used, and applicable requirements.
              </p>
              <p>
                For Treehouse, choosing <strong>Delete account</strong> in the
                app’s Settings permanently deletes your account and encrypted
                cloud backup. This action cannot be undone. Signing out removes
                the local copy from your device but keeps the cloud backup.
                Uninstalling the app removes local data but does not delete
                your account or cloud backup. Certain records may remain for a
                limited period in backups or where retention is required or
                permitted by law.
              </p>
              <p>
                You can also contact us to request deletion or ask about
                information associated with you. Deletion may be limited by
                legal obligations, security needs, disputes, or information
                that cannot reasonably be separated from other records.
              </p>
            </>
          ),
        },
        {
          id: "your-rights",
          title: "Your privacy rights and choices",
          content: (
            <>
              <p>
                Depending on your location and subject to applicable
                exceptions, you may have the right to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Know or access the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of personal information.</li>
                <li>
                  Receive a portable copy of certain information you provided.
                </li>
                <li>
                  Opt out of certain processing, including sale, targeted
                  advertising, or profiling that produces legal or similarly
                  significant effects, where these rights apply.
                </li>
                <li>
                  Object to or request restriction of certain processing, or
                  withdraw consent where processing is based on consent.
                </li>
                <li>
                  Appeal a decision we make about a privacy-rights request,
                  where applicable law provides an appeal.
                </li>
              </ul>
              <p>
                To exercise a right, email{" "}
                <a href="mailto:support@backtoprotocol.com?subject=Privacy%20request">
                  support@backtoprotocol.com
                </a>{" "}
                with “Privacy request” in the subject and tell us how we can
                help. We may ask for information reasonably necessary to verify
                your identity and understand the request. We will respond
                within the time required by applicable law. You may use an
                authorized agent where the law allows; we may require proof of
                the agent’s authority and verify your identity.
              </p>
              <p>
                You may also have the right to complain to your local data
                protection or privacy regulator. We will not unlawfully
                discriminate against you for exercising a privacy right.
              </p>
              <p>
                We do not sell personal information or use it for
                cross-context behavioral advertising. If our practices change,
                we will update this policy and provide any legally required
                choice or opt-out mechanism before the relevant processing
                begins.
              </p>
            </>
          ),
        },
        {
          id: "international",
          title: "International processing",
          content: (
            <p>
              Depending on the product, provider, and your location,
              information may be processed in the United States or other
              countries whose privacy laws may differ from those where you
              live. Where required, we use appropriate safeguards for
              international transfers and provide information about those
              safeguards upon request.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and similar technologies",
          content: (
            <>
              <p>
                On this website, optional Cloudflare Web Analytics measures
                page visits and performance only after you select “Allow
                optional analytics.” The analytics beacon is not loaded if
                you choose “Use essential only.” Your selection is kept in a
                first-party browser cookie for up to 180 days and can be
                changed at any time using the Privacy choices link in the
                website footer. We honor a browser’s Global Privacy Control
                signal by keeping optional analytics off.
              </p>
              <p>
                If you opt in, page-view and performance measurements are
                sent to Cloudflare. Review{" "}
                <a href="https://www.cloudflare.com/privacypolicy/">
                  Cloudflare’s Privacy Policy
                </a>{" "}
                for information about its handling of data. Your analytics
                choice does not prevent necessary hosting, security, and
                network processing when you visit the site.
              </p>
              <p>
                Necessary technical data may still be processed to deliver,
                secure, and operate the website. See our{" "}
                <a href="/cookies">Cookie Policy</a> for more information.
              </p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children’s privacy",
          content: (
            <p>
              Treehouse is not directed to children under 13, and we do not
              knowingly seek to collect personal information from children
              under 13. Other Back to Protocol products may have their own age
              requirements, described in their applicable terms or notices. If
              you believe a child has provided personal information to us,
              contact us so we can review the request and take appropriate
              action.
            </p>
          ),
        },
        {
          id: "third-party",
          title: "Third-party services and links",
          content: (
            <p>
              Our products may connect with or link to services operated by
              other organizations, including sign-in providers and app
              marketplaces. We do not control those organizations’ privacy
              practices. Review their privacy notices and settings before
              connecting an account or using their services.
            </p>
          ),
        },
        {
          id: "changes-contact",
          title: "Changes to this policy and contact",
          content: (
            <>
              <p>
                We may revise this policy as our company, products, or legal
                requirements change. We will post the revised policy on this
                page and update the “Last updated” date. If a change
                materially affects how a product handles information, we will
                provide additional notice where required.
              </p>
              <p>
                For privacy questions or requests, contact Back to Protocol at{" "}
                <a href="mailto:support@backtoprotocol.com?subject=Privacy%20question">
                  support@backtoprotocol.com
                </a>
                . Please do not include passwords, verification codes, or
                sensitive documents in your email.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

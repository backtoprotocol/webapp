import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Privacy Policy | Back to Protocol",
  description: "How Back to Protocol collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="This policy explains what information Back to Protocol collects, how we use it, and the choices you have when you use our website and services."
      lastUpdated="September 12, 2026"
      sections={[
        {
          id: "overview",
          title: "Overview",
          content: (
            <>
              <p>
                Back to Protocol (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides websites, technology
                support, and business IT services to individuals and small businesses. This policy applies to
                information collected through backtoprotocol.com, our support request forms, and any related
                communications, including email, phone, and remote support sessions.
              </p>
              <p>
                By using our site or services, you agree to the collection and use of information as described in
                this policy. If you do not agree with these terms, please do not use the site.
              </p>
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Information we collect",
          content: (
            <>
              <p>We collect information in the following ways:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <span className="font-semibold text-[#17211b]">Information you provide directly:</span> your name,
                  email address, phone number, and a description of the issue when you submit a support request,
                  contact us, or subscribe to updates.
                </li>
                <li>
                  <span className="font-semibold text-[#17211b]">Service and account details:</span> device
                  information, account or system details, and screenshots or logs you choose to share so we can
                  diagnose and resolve technical issues.
                </li>
                <li>
                  <span className="font-semibold text-[#17211b]">Automatically collected information:</span> IP
                  address, browser type, device type, pages visited, and general usage data collected through
                  standard web server logs and analytics tools.
                </li>
                <li>
                  <span className="font-semibold text-[#17211b]">Payment information:</span> when you purchase a
                  service or membership, payment is processed by a third-party payment provider. We do not store
                  full card numbers on our own servers.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          title: "How we use your information",
          content: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to support requests, quotes, and general inquiries.</li>
                <li>Diagnose, troubleshoot, and resolve technical issues on your devices, accounts, or systems.</li>
                <li>Deliver website, IT, and support services you have requested or purchased.</li>
                <li>Send service updates, appointment confirmations, invoices, and requested communications.</li>
                <li>Improve our website, service quality, and support response times.</li>
                <li>Detect, investigate, and prevent fraud, abuse, or security incidents.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and tracking technologies",
          content: (
            <>
              <p>
                Our website uses cookies and similar technologies to keep the site functioning correctly, remember
                your preferences, and understand how visitors use the site so we can improve it. This may include
                basic analytics that report aggregate usage patterns without identifying you personally.
              </p>
              <p>
                You can control or disable cookies through your browser settings. Disabling cookies may limit some
                site functionality, such as staying signed in or retaining form progress.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "How we share information",
          content: (
            <>
              <p>We share information only in the following circumstances:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <span className="font-semibold text-[#17211b]">Service providers:</span> vendors who help us
                  operate the business, such as hosting providers, payment processors, scheduling tools, and email
                  delivery services. These providers are only permitted to use your information to perform services
                  on our behalf.
                </li>
                <li>
                  <span className="font-semibold text-[#17211b]">Legal requirements:</span> when required to comply
                  with a subpoena, court order, or other legal process, or to protect the rights, property, or safety
                  of Back to Protocol, our clients, or others.
                </li>
                <li>
                  <span className="font-semibold text-[#17211b]">Business transfers:</span> if Back to Protocol is
                  involved in a merger, acquisition, or sale of assets, client information may be transferred as part
                  of that transaction, subject to this policy.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "data-retention",
          title: "Data retention",
          content: (
            <p>
              We retain personal information for as long as necessary to provide services, maintain business
              records, meet legal and tax obligations, and resolve disputes. Support tickets, invoices, and related
              records are typically retained for the duration of an active client relationship and for a reasonable
              period afterward. You may request earlier deletion as described below.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights and choices",
          content: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Request a copy of the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request deletion of your personal information, subject to legal and contractual retention needs.</li>
                <li>Opt out of marketing communications at any time by using the unsubscribe link or contacting us directly.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:support@backtoprotocol.com" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                  support@backtoprotocol.com
                </a>
                . We will respond within a reasonable time frame and may need to verify your identity before
                processing certain requests.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Data security",
          content: (
            <p>
              We use reasonable administrative, technical, and physical safeguards designed to protect the
              information we collect, including access controls, encrypted transmission where applicable, and
              limited internal access to client data. No method of transmission or storage is completely secure, and
              we cannot guarantee absolute security. If we become aware of a security incident affecting your
              information, we will notify you as required by applicable law.
            </p>
          ),
        },
        {
          id: "childrens-privacy",
          title: "Children's privacy",
          content: (
            <p>
              Our services are intended for individuals and businesses, not children. We do not knowingly collect
              personal information from children under 13. If you believe a child has provided us with personal
              information, please contact us so we can delete it.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          content: (
            <p>
              We may update this policy from time to time to reflect changes in our practices, technology, legal
              requirements, or other factors. The &quot;Last updated&quot; date at the top of this page reflects the
              most recent revision. Continued use of the site after changes take effect constitutes acceptance of
              the updated policy.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          content: (
            <p>
              If you have questions about this privacy policy or how we handle your information, contact us at{" "}
              <a href="mailto:support@backtoprotocol.com" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support@backtoprotocol.com
              </a>{" "}
              or through our{" "}
              <a href="/support" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support request form
              </a>
              . Back to Protocol operates remotely with local appointments available in the Hendersonville, TN area.
            </p>
          ),
        },
      ]}
    />
  );
}

import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Terms of Use | Back to Protocol",
  description: "The terms that govern your use of Back to Protocol's website and services.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of use"
      description="These terms govern your use of the Back to Protocol website and the websites, technology support, and business IT services we provide."
      lastUpdated="September 12, 2026"
      sections={[
        {
          id: "acceptance",
          title: "Acceptance of terms",
          content: (
            <p>
              By accessing backtoprotocol.com or engaging Back to Protocol for websites, technology support, or
              business IT services, you agree to be bound by these terms of use. If you do not agree to these terms,
              please do not use our website or services. We may update these terms from time to time, and continued
              use of the site or services after changes take effect constitutes acceptance of the revised terms.
            </p>
          ),
        },
        {
          id: "description-of-services",
          title: "Description of services",
          content: (
            <>
              <p>Back to Protocol provides the following categories of service:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Website design, development, hosting setup, and ongoing website maintenance.</li>
                <li>Remote and on-site technology support for computers, networks, devices, and accounts.</li>
                <li>
                  Business IT management, including email, domains, Microsoft 365 or Google Workspace administration,
                  networking, and security guidance.
                </li>
                <li>Protocol+ support memberships, which provide priority access and monthly support allowances.</li>
              </ul>
              <p>
                Specific project scope, pricing, and deliverables are confirmed in writing (email or a written quote)
                before billable work begins.
              </p>
            </>
          ),
        },
        {
          id: "use-of-website",
          title: "Use of the website",
          content: (
            <>
              <p>You agree to use this website only for lawful purposes. You may not:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Attempt to gain unauthorized access to any part of the site, related systems, or networks.</li>
                <li>Interfere with or disrupt the site&apos;s functionality, servers, or security features.</li>
                <li>Reproduce, resell, or redistribute site content without our written permission.</li>
                <li>Submit false, misleading, or fraudulent information through any form on the site.</li>
              </ul>
            </>
          ),
        },
        {
          id: "accounts-and-client-information",
          title: "Accounts and client information",
          content: (
            <p>
              When you request support or engage us for a project, you agree to provide accurate and complete
              information, including relevant account access, device details, or credentials required to perform the
              requested work. You are responsible for maintaining the security of any accounts, systems, or devices
              you own, and for authorizing access only for the specific work requested. We will not use access
              granted to us for any purpose beyond the agreed scope of work.
            </p>
          ),
        },
        {
          id: "payments-and-billing",
          title: "Payments and billing",
          content: (
            <>
              <p>
                Pricing for services is provided in advance through a quote, published rate, or membership plan.
                Unless otherwise agreed in writing:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Hourly support is billed in the increments described at the time of the request.</li>
                <li>Project work (such as websites) requires a deposit before work begins, with the balance due at completion or per an agreed milestone schedule.</li>
                <li>Protocol+ memberships renew automatically on a monthly basis until canceled and do not carry over unused support time.</li>
                <li>Late payments may result in paused work or suspended support until the account is brought current.</li>
              </ul>
            </>
          ),
        },
        {
          id: "service-scope-and-limitations",
          title: "Service scope and limitations",
          content: (
            <p>
              Our services are limited to the technology support, website, and IT management work described at the
              time of booking or in a written quote. We do not guarantee that every issue can be resolved remotely,
              that third-party hardware or software will function without defects, or that a given timeline will be
              met when the cause of an issue is outside our control (including third-party outages, hardware
              failure, or actions taken by other vendors). Protocol+ membership benefits are described on the
              Protocol+ page and do not include unlimited labor, emergency response, or guaranteed same-day service.
            </p>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          content: (
            <p>
              All content on this website, including text, graphics, logos, and design elements, is the property of
              Back to Protocol or its licensors and is protected by applicable intellectual property laws. For
              website projects, ownership of final deliverables (such as custom code and design files) transfers to
              the client upon full payment, unless otherwise specified in a project agreement. Third-party
              components, themes, plugins, and licensed software remain subject to their original license terms.
            </p>
          ),
        },
        {
          id: "third-party-links",
          title: "Third-party links and services",
          content: (
            <p>
              Our site and services may reference or link to third-party products, platforms, or websites (for
              example, hosting providers, payment processors, or software and hardware vendors we recommend as
              part of a project). We do not control and are not responsible for the content, policies, or
              practices of any third party. Use of third-party products or services is subject to that
              provider&apos;s own terms.
            </p>
          ),
        },
        {
          id: "disclaimers",
          title: "Disclaimers and limitation of liability",
          content: (
            <>
              <p>
                Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis
                without warranties of any kind, whether express or implied, including but not limited to
                merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>
                To the fullest extent permitted by law, Back to Protocol is not liable for any indirect, incidental,
                special, or consequential damages, including lost data, lost revenue, or business interruption,
                arising from your use of our website or services. Our total liability for any claim related to a
                service is limited to the amount you paid for that specific service in the preceding three months.
              </p>
            </>
          ),
        },
        {
          id: "indemnification",
          title: "Indemnification",
          content: (
            <p>
              You agree to indemnify and hold harmless Back to Protocol and its owners, contractors, and
              representatives from any claims, damages, losses, or expenses (including reasonable legal fees) arising
              from your misuse of the website, breach of these terms, or violation of any law or third-party right.
            </p>
          ),
        },
        {
          id: "termination",
          title: "Termination",
          content: (
            <p>
              We may suspend or terminate access to our website or services if we reasonably believe these terms have
              been violated, if payment is significantly overdue, or if continuing service would be unsafe or
              unlawful. You may cancel an ongoing service or membership at any time by contacting us; cancellation
              takes effect at the end of the current billing period unless otherwise agreed.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          content: (
            <p>
              These terms are governed by the laws of the State of Tennessee, without regard to its conflict of law
              principles. Any dispute arising from these terms or our services will be resolved in the state or
              federal courts located in Tennessee, and you consent to the jurisdiction of those courts.
            </p>
          ),
        },
        {
          id: "changes-to-terms",
          title: "Changes to these terms",
          content: (
            <p>
              We may revise these terms periodically to reflect changes in our services, business practices, or
              legal requirements. The &quot;Last updated&quot; date at the top of this page indicates the most recent
              revision. Material changes will be reflected on this page, and continued use of our site or services
              after changes take effect constitutes your acceptance of the updated terms.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          content: (
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:support@backtoprotocol.com" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support@backtoprotocol.com
              </a>{" "}
              or submitted through our{" "}
              <a href="/support" className="font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
                support request form
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}

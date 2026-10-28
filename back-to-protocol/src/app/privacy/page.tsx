import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Privacy Policy | Treehouse by Back to Protocol",
  description:
    "How Back to Protocol handles information when you visit the Treehouse website or use the Treehouse app.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Treehouse · Privacy"
      title="Privacy policy"
      description="This policy explains how Back to Protocol handles information connected with the Treehouse website and app, and the choices available to you."
      lastUpdated="October 28, 2026"
      sections={[
        {
          id: "scope",
          title: "Who we are and what this policy covers",
          content: (
            <p>
              Back to Protocol develops Treehouse. In this policy, “Back to
              Protocol,” “we,” and “us” refer to the company, and “Treehouse”
              refers to our app and website. This policy covers information
              processed when you visit the website, contact us, or use
              Treehouse. Additional notices may apply to particular features
              or services.
            </p>
          ),
        },
        {
          id: "information",
          title: "Information you choose to provide",
          content: (
            <>
              <p>
                The information involved depends on how you use Treehouse. It
                may include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Contact details and the content of messages you send to our
                  team.
                </li>
                <li>
                  Details you choose to add to the app, such as IDs, documents,
                  scanned copies, cards, accounts, insurance information, and
                  important dates.
                </li>
                <li>
                  Information needed to provide an app feature you choose to
                  use, such as backup or sharing.
                </li>
                <li>
                  Basic technical information that may be recorded when you
                  visit the website, such as browser, device, and request
                  information needed to operate and protect the service.
                </li>
              </ul>
              <p>
                Do not send sensitive records by email unless we have specifically
                provided a secure method for doing so.
              </p>
            </>
          ),
        },
        {
          id: "use",
          title: "How information is used",
          content: (
            <>
              <p>We use information for purposes related to operating Treehouse, including to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide the features and functions you choose to use.</li>
                <li>Respond to questions and provide customer support.</li>
                <li>Maintain, troubleshoot, and improve the app and website.</li>
                <li>Protect the services and investigate misuse or security concerns.</li>
                <li>Meet legal requirements and enforce applicable terms.</li>
              </ul>
            </>
          ),
        },
        {
          id: "storage-security",
          title: "Storage and security",
          content: (
            <>
              <p>
                Treehouse encrypts documents and photos on your device before
                they are uploaded for cloud backup. How encryption keys are
                handled depends on the sign-in method you choose:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Email sign-in:</strong> encryption keys are derived
                  from your password and are not available to Back to Protocol.
                  Keep your recovery key safe; it is needed to restore your
                  information if you forget your password.
                </li>
                <li>
                  <strong>Google or Apple sign-in:</strong> an encryption key is
                  stored in your private cloud account to make signing in on a
                  new device easier. Treehouse operators with database
                  administrative access may technically be able to access that
                  key.
                </li>
              </ul>
              <p>
                Protect access to your device and sign-in account. No digital
                service can promise absolute security; we work to protect
                information using safeguards appropriate to the service.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "When information may be shared",
          content: (
            <>
              <p>
                We do not sell personal information. Information may be
                processed or disclosed in limited circumstances:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>At your direction:</strong> when you choose to share
                  an item or use a feature that sends information to another
                  person or service.
                </li>
                <li>
                  <strong>Service providers:</strong> with providers that help
                  operate or support Treehouse, subject to appropriate
                  restrictions.
                </li>
                <li>
                  <strong>Legal and safety needs:</strong> when disclosure is
                  required by law or reasonably necessary to protect people,
                  rights, or the service.
                </li>
                <li>
                  <strong>Business changes:</strong> as part of a merger,
                  financing, reorganization, or transfer, subject to applicable
                  privacy requirements.
                </li>
              </ul>
              <p>
                Information you share with another person may be saved or
                further shared by that recipient. Consider what you share and
                with whom.
              </p>
            </>
          ),
        },
        {
          id: "retention-deletion",
          title: "Retention and deletion",
          content: (
            <>
              <p>
                We retain information for as long as needed to provide the
                relevant feature, maintain appropriate records, meet legal
                obligations, and resolve disputes. You can manage information
                stored in Treehouse using available app controls.
              </p>
              <p>
                Choosing <strong>Delete account</strong> in the app’s Settings
                permanently deletes your account and encrypted cloud backup.
                This action cannot be undone. Signing out removes the local
                copy from your device but keeps the cloud backup. Uninstalling
                the app removes local data but does not delete your account or
                cloud backup.
              </p>
              <p>
                For help with a privacy request, contact us using the details
                below.
              </p>
            </>
          ),
        },
        {
          id: "choices-rights",
          title: "Your choices and privacy rights",
          content: (
            <p>
              Depending on where you live, you may have rights to request access
              to, correction of, or deletion of certain personal information,
              subject to legal exceptions. You may also control information you
              enter, back up, or share through available Treehouse settings. To
              make a privacy request, email{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Treehouse%20privacy%20request">
                support@backtoprotocol.com
              </a>
              . We may need to verify your request before acting on it.
            </p>
          ),
        },
        {
          id: "children",
          title: "Children’s privacy",
          content: (
            <p>
              Treehouse is not directed to children under 13, and we do not
              knowingly seek to collect personal information from children
              under 13. A parent or guardian who believes a child has provided
              information to us may contact us to request assistance.
            </p>
          ),
        },
        {
          id: "changes-contact",
          title: "Changes and contact",
          content: (
            <p>
              We may update this policy as Treehouse or applicable requirements
              change. The date at the top of this page shows when it was last
              revised. Questions or requests can be sent to{" "}
              <a href="mailto:support@backtoprotocol.com?subject=Treehouse%20privacy%20question">
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

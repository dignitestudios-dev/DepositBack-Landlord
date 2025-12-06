import React, { useState } from "react";

const TermsandConditions = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-[600] mb-6">Terms & Conditions</h3>
      <div className="text-sm leading-relaxed space-y-4 max-h-[450px] overflow-y-auto pr-2 pl-3 pr-3">
        <p>
          Welcome to Deposits Back, an entity of Coort Inc (“Company”, “Coort
          Inc”, “We”, “Us”, or “Our”). These Terms and Conditions (“Terms”)
          establish the governing framework for your access to, interaction
          with, and use of all features, functionalities, services, and
          offerings provided by us or through our website, software platforms,
          and any other related tools, resources, or services we make available
          (collectively referred to as the “Platform”). By accessing or using
          the Platform, engaging with us in any capacity, or availing yourself
          of our services, you (“User”, “Client”, or “You”) agree to be bound by
          these Terms and to engage with us in accordance with them. Users of
          the Platform may act as landlords, tenants, or both, depending on
          their role in a rental transaction. Certain sections of these Terms
          apply specifically to landlords or tenants, as clearly indicated.
          Where no distinction is made, the provisions apply to all Users. These
          Terms govern your relationship with Coort Inc, including the use of
          our Platform, the terms of engagement for services provided by us, and
          all related interactions. By using the Platform or engaging our
          services, you confirm that you are of legal age and have the authority
          to enter into a binding agreement and that you have read, understood,
          and agreed to these Terms and any policies or documents incorporated
          by reference. If you do not agree to these Terms, you must discontinue
          your use of the Platform and refrain from engaging further with us. We
          may, at our sole discretion, modify, amend, or replace these Terms at
          any time to reflect changes in our services, legal requirements, or
          business needs. It is your responsibility to review these Terms
          periodically for updates. Your continued use of the Platform or
          engagement with us following any modifications constitutes your
          acceptance of the updated Terms. We are committed to providing you
          with a seamless, transparent, and valuable experience on our Platform
          and through our services. Should you have any questions or concerns
          about these Terms, please contact us at info@depositsback.com.
        </p>
        <h3 className="text-2xl font-[600] mb-6">PLATFORM ENVIRONMENT.</h3>
        <p>
          The Platform Depositsback.com (Deposits Back) provides a structured
          and transparent environment for landlords and tenants to interact,
          track rental obligations, and safeguard financial transactions. Our
          services include security deposit management, document storage,
          real-time communication tools, and compliance assistance. Users can
          securely store and manage lease agreements, inspection reports, and
          financial records, ensuring accessibility and accuracy throughout the
          rental period. The Platform’s automated notification system ensures
          that critical deadlines, such as lease renewals and inspection
          requirements, are met in a timely manner.
        </p>
        <h3 className="text-2xl font-[600] mb-6">
          USER ELIGIBILITY AND ACCOUNT REGISTRATION.
        </h3>
        <p>
          To access and use the Platform, users must meet specific eligibility
          criteria. The Platform is intended for individuals who are at least 17
          years of age. By registering for an account, users confirm that they
          meet this age requirement and have the legal capacity to enter into a
          binding agreement. The Platform is available to users in jurisdictions
          where its services comply with applicable laws and regulations. We
          reserve the right to restrict or deny access to individuals or
          entities that do not meet these requirements. To utilize the
          Platform’s services, users must create an account and provide accurate
          and complete information during the registration process. The required
          information includes, but is not limited to:
        </p>
        <ul className="mt-2 ml-5 list-disc text-sm text-gray-700 space-y-1">
          <li className="mx-3">Full Name</li>
          <li className="mx-3">Email Address</li>
          <li className="mx-3">Phone Number</li>
          <li className="mx-3">Residential Address</li>
          <li className="mx-3">Financial Information (as applicable)</li>
          <li className="mx-3">Last Four Digits of Social Security Number</li>
          <li className="mx-3">Valid Government-Issued Photo Identification</li>
        </ul>
        <p>
          By registering for an account, users agree to provide truthful and
          up-to-date information. Any attempt to submit false or misleading
          details may result in the suspension or termination of the account.
          The Company reserves the right to request additional documentation or
          verification to ensure compliance with legal and security
          requirements. Users are solely responsible for maintaining the
          confidentiality of their account credentials, including usernames,
          passwords, and any authentication methods used to access the Platform.
          Unauthorized use of an account, whether by another individual or
          entity, is strictly prohibited. If a user suspects any unauthorized
          activity or security breach, they must notify the Company immediately.
          The Company shall not be liable for any loss or damage resulting from
          unauthorized access to an account due to a user’s failure to maintain
          proper security measures. Users are encouraged to implement strong
          passwords and multi-factor authentication where available to enhance
          account security. The Company reserves the right to suspend or
          terminate an account if a user violates these Terms, engages in
          fraudulent activity, or fails to comply with applicable laws.
          Additionally, repeated failure to provide accurate information or
          comply with verification requests may result in account restrictions.
          Upon termination, users will lose access to their account and all
          associated data stored within the Platform. The Company may, at its
          discretion, retain certain records as required by law or for
          compliance purposes. Users acknowledge that termination of an account
          does not absolve them of any outstanding financial obligations related
          to services previously rendered.
        </p>
        <p>
          By creating an account, users acknowledge and agree to abide by these
          eligibility and registration requirements. Failure to comply with
          these Terms may result in restricted access, legal action, or
          permanent removal from the Platform.
        </p>
        <h3 className="text-2xl font-[600] mb-6">
          USER CONDUCT AND OBLIGATIONS.
        </h3>
        <p>
          Users are expected to engage with the Platform in a responsible,
          ethical, and lawful manner. The Platform is designed to facilitate
          secure transactions, communication, and document management between
          landlords and tenants. Users must conduct themselves professionally
          and respectfully when interacting with other users, Company
          representatives, and any third-party service providers integrated into
          the Platform. To maintain the integrity and security of the Platform,
          users are strictly prohibited from engaging in the following
          activities:
        </p>
        <ul>
          <li>
            Harassment and Abuse: Users may not threaten, harass, intimidate, or
            use abusive language toward other users, Company representatives, or
            any third parties.
          </li>
          <li>
            False or Misleading Information: Providing inaccurate, fraudulent,
            or misleading details during account registration or in any
            interactions on the Platform is strictly prohibited.
          </li>
          <li>
            Unauthorized Access and Security Violations: Attempting to gain
            unauthorized access to the Platform, another user’s account, or
            Company databases is a violation of these Terms and may result in
            legal action.
          </li>
          <li>
            Tampering with Financial Transactions: Users may not manipulate,
            alter, or attempt to circumvent any payment processing, deposit
            management, or financial tracking features provided by the Platform.
          </li>
          <li>
            Uploading Harmful Content: Users are prohibited from uploading or
            distributing malware, viruses, or any harmful software that could
            compromise the Platform’s security.
          </li>
          <li>
            Violation of Laws and Regulations: Users must comply with all
            applicable federal, state, and local rental laws. Any attempt to use
            the Platform for fraudulent, illegal, or unauthorized purposes is a
            violation of these Terms.
          </li>
        </ul>
        <p>By using the Platform, users agree to:</p>
        <ul>
          <li>
            Maintain Accurate Information: Users must ensure that their personal
            and financial details remain accurate and up to date. Failure to do
            so may result in restricted access or account suspension.
          </li>
          <li>
            Respect Privacy and Confidentiality: Users must respect the privacy
            of other users and not share, distribute, or misuse personal
            information obtained through the Platform.
          </li>
          <li>
            Follow Platform Guidelines: Users are required to adhere to all
            operational guidelines provided by the Company, including proper use
            of communication tools, financial tracking, and document management
            features.
          </li>
          <li>
            Comply with Payment and Transaction Policies: Users agree to process
            all transactions through approved payment channels and must not
            engage in fraudulent or unauthorized payment activities.
          </li>
        </ul>
        <p>
          Failure to adhere to these conduct and obligation standards may result
          in:
        </p>
        <ul>
          <li>
            Warnings: Users may receive written warnings regarding minor or
            first-time violations.
          </li>
          <li>
            Suspension: If a user engages in repeated violations, their account
            may be temporarily restricted or suspended.
          </li>
          <li>
            Termination: Persistent misconduct or severe violations will result
            in permanent account termination and potential legal action.
          </li>
        </ul>
        <h3 className="text-2xl font-[600] mb-6">
          PAYMENT TERMS AND REFUND POLICY.
        </h3>
        <p>
          The Platform operates on a subscription-based and transaction-based
          model, where fees vary depending on the user’s role and services
          accessed. Tenants are not subject to upfront setup fees but are
          required to pay a 1% holding fee for security deposit processing.
          Landlords are charged based on the number of properties managed
          through the Platform, with pricing details provided at the time of
          registration. Additional fees may apply for premium features, expanded
          storage, or enhanced property management tools. All payments are
          processed through third-party payment providers such as Stripe, Apple
          Pay, and Google Play. Users acknowledge that payment processing is
          governed by the respective third-party providers’ terms and policies,
          and the Company is not responsible for any transaction errors, delays,
          or failures beyond its control.
        </p>
        <p>
          Landlords are billed on a monthly or annual basis, depending on the
          selected service plan. Invoices are generated automatically and made
          available through the Platform. Users are responsible for ensuring
          that their payment methods remain valid and up to date to avoid
          service interruptions. The Company reserves the right to suspend or
          terminate access to services for non-payment. Any changes to pricing
          or subscription fees will be communicated to users in advance.
          Continued use of the Platform after such changes take effect
          constitutes acceptance of the new payment terms.
        </p>
        <p>
          The Company maintains a transparent and structured refund policy to
          accommodate both tenants and landlords:
        </p>
        <ul>
          <li>
            Tenants: May cancel services at any time and receive a prorated
            refund for unused services.
          </li>
          <li>
            Landlords: Must submit a 30-day termination notice, and their
            cancellation will be processed within this period. No refunds will
            be issued for the remaining duration of the billing cycle unless
            otherwise specified.
          </li>
        </ul>
        <p>
          Refunds will be processed within 10 business days from the date of
          cancellation approval and will be credited to the original payment
          method. Any disputes related to refund requests must be submitted in
          writing to the Company’s customer support team. Users agree to resolve
          any payment disputes directly with the Company before initiating a
          chargeback with their financial institution. Unauthorized chargebacks
          may result in account suspension, additional fees, or legal action to
          recover unpaid balances. The Company reserves the right to contest
          chargebacks with supporting documentation.
        </p>
        <h3 className="text-2xl font-[600] mb-6">
          INTELLECTUAL PROPERTY RIGHTS.
        </h3>
        <p>
          All intellectual property rights, including but not limited to
          trademarks, copyrights, patents, trade secrets, proprietary software,
          platform architecture, databases, user interfaces, design elements,
          content, and branding materials, are the exclusive property of Coort
          Inc. and Coort LLC (collectively, the “Company”). Use of the Platform
          does not grant users any ownership interest or rights to the Company’s
          intellectual property, except for the limited, non-exclusive,
          non-transferable, and revocable license granted under these Terms.
          Users may not copy, reproduce, modify, distribute, sell, sublicense,
          or reverse-engineer any aspect of the Platform, software, or content
          without the express written consent of the Company. Any unauthorized
          use of the Company’s intellectual property constitutes a violation of
          these Terms and may result in legal action. All Company logos, names,
          service marks, and trademarks displayed on the Platform are protected
          under applicable intellectual property laws. Users may not use,
          reproduce, or modify these trademarks without prior written
          authorization. Any unauthorized use that creates confusion or
          misrepresents an affiliation with the Company is strictly prohibited.
          The Platform does not allow users to upload or create their own
          content. However, by submitting documents, transaction data, or
          communications within the Platform, users grant the Company a limited
          license to store, process, and display such content as necessary to
          provide services and ensure compliance with applicable laws. The
          Company does not claim ownership over user-submitted materials but
          reserves the right to use anonymized data for analytics, service
          improvements, and compliance tracking. The Company actively enforces
          its intellectual property rights and may take legal action against any
          unauthorized use, reproduction, or misappropriation of its proprietary
          content or technology. If a user believes that any content or material
          on the Platform infringes upon their intellectual property rights,
          they must submit a written notice to the Company detailing the alleged
          infringement. The Company will investigate and take appropriate action
          as required by law.
        </p>
        <h3 className="text-2xl font-[600] mb-6">THIRD-PARTY SERVICES.</h3>
        <p>
          The Platform integrates with third-party services to facilitate secure
          transactions, communication, and operational functionality. These
          third-party services include, but are not limited to:
        </p>
        <ul>
          <li>Stripe – Payment processing and financial transactions</li>
          <li>Twilio – Messaging and notification services</li>
          <li>
            Apple App Store & Google Play – Mobile application distribution and
            updates
          </li>
        </ul>
        <p>
          By using the Platform, users acknowledge and agree that their
          interactions with these third-party providers are subject to the
          respective terms, conditions, and privacy policies of those providers.
          The Company does not own, control, or assume liability for the
          performance, security, or compliance of third-party services. The
          Platform may contain links to third-party websites, government
          resources, or external informational content. These links are provided
          for user convenience and do not constitute an endorsement or
          verification by the Company. Users accessing these third-party sites
          do so at their own risk, and the Company is not responsible for the
          accuracy, security, or policies of external websites. Certain features
          of the Platform rely on third-party software libraries or APIs to
          enhance service functionality. Where applicable, users agree to comply
          with any licensing requirements or restrictions associated with
          third-party software used within the Platform. The Company does not
          provide warranties for third-party software and is not liable for
          compatibility issues or service interruptions resulting from external
          dependencies. The Company is not responsible for any errors, failures,
          security breaches, or disruptions caused by third-party service
          providers. Any disputes or claims regarding third-party transactions,
          unauthorized charges, or service malfunctions must be addressed
          directly with the respective provider. The Company reserves the right
          to modify or replace third-party integrations at its discretion and
          will notify users of any significant changes impacting service
          availability.
        </p>
        <h3 className="text-2xl font-[600] mb-6">DATA PRIVACY.</h3>
        <p>
          Privacy Policy governs the collection, use, storage, and security of
          personal data provided by users on the Platform. By using the
          Platform, users acknowledge and agree that the Privacy Policy is
          incorporated into these Terms by reference and forms an integral part
          of their agreement with the Company. The Company collects and
          processes personal, financial, and transactional data to provide
          services, improve user experience, and ensure compliance with
          applicable laws. The specific types of data collected, how they are
          used, and the legal basis for processing such data are detailed in our
          Privacy Policy. The Platform integrates with third-party service
          providers, including payment processors and messaging services. Any
          sharing of user data with these providers is conducted in accordance
          with our Privacy Policy and applicable privacy laws. Users are
          encouraged to review the privacy policies of any third-party services
          they engage with through the Platform. Users have certain rights
          regarding their personal data, including access, correction, deletion,
          and restriction of processing, as outlined in our Privacy Policy. The
          Company employs industry-standard security measures to protect user
          information, but users must also take precautions to safeguard their
          account credentials and sensitive data. The Company may update its
          Privacy Policy from time to time to reflect changes in legal
          requirements or business practices. Continued use of the Platform
          after any updates constitutes acceptance of the revised Privacy
          Policy.
        </p>
        <h3 className="text-2xl font-[600] mb-6">
          SERVICE LIMITATIONS AND DOWNTIME.
        </h3>
        <p>
          While the Company strives to provide a reliable and accessible
          Platform, users acknowledge that uninterrupted access cannot be
          guaranteed. The availability of the Platform may be affected by
          scheduled maintenance, unforeseen technical issues, network failures,
          third-party service interruptions, security updates, or force majeure
          events. To ensure the continued security, functionality, and
          performance of the Platform, the Company may perform scheduled
          maintenance and software updates. In cases where maintenance may
          result in temporary service downtime, users will receive advance
          notice whenever possible. Users are responsible for keeping their
          software and devices updated to maintain compatibility with the latest
          version of the Platform. Certain aspects of the Platform rely on
          third-party services, including payment processors and messaging
          platforms. The Company does not control the availability or
          performance of these third-party services and is not liable for any
          downtime, delays, or disruptions caused by external service providers.
          Users experiencing issues related to third-party integrations should
          refer to the respective provider’s service status or support channels.
          During periods of planned or unplanned downtime, users are responsible
          for taking appropriate measures to ensure continuity in their rental
          or property management activities. This includes backing up critical
          documents, maintaining alternative communication channels, and
          monitoring notifications for service restoration updates. The Company
          is not liable for any losses, damages, or disruptions resulting from
          Platform downtime, service interruptions, or accessibility issues,
          whether due to maintenance, security measures, or third-party
          failures. Users acknowledge that their reliance on the Platform is
          subject to reasonable limitations, and the Company reserves the right
          to modify, suspend, or discontinue any part of the Platform without
          liability.
        </p>
        <h3 className="text-2xl font-[600] mb-6">CANCELLATION POLICY.</h3>
        <p>
          Tenants may cancel their use of the Platform at any time without
          incurring additional fees. Upon cancellation, any prepaid services
          will be prorated, and the tenant will receive a refund for the unused
          portion of the service period. The 1% security deposit holding fee is
          non-refundable once processing has been completed. Landlords who wish
          to cancel their subscription must provide a 30-day written notice
          through the Platform or by contacting customer support. The
          cancellation will be processed at the end of the 30-day notice period,
          during which the landlord will retain full access to the Platform. No
          refunds will be issued for unused time within the current billing
          cycle, unless otherwise specified in the service agreement. Upon
          cancellation, users will lose access to their accounts and stored
          data, including rental agreements, security deposit tracking, and
          communication history. Users are encouraged to download and back up
          any important documents before initiating cancellation. The Company is
          not responsible for recovering data after an account has been closed.
          If a user wishes to reactivate their account after cancellation, they
          may be required to complete a new registration process and may be
          subject to any updated terms, conditions, and pricing in effect at
          that time. The Company does not guarantee that previous data or
          settings will be restored upon reactivation.
        </p>
        <h3 className="text-2xl font-[600] mb-6">DISCLAIMER</h3>
        <p>
          The Platform is designed to facilitate communication, document
          management, and financial transactions between landlords and tenants.
          However, the Company does not provide legal, financial, tax, or real
          estate advice. Any guidance, resources, or AI-generated responses
          offered through the Platform are for informational purposes only and
          should not be relied upon as a substitute for professional advice from
          a qualified attorney, financial advisor, or real estate professional.
          Users are solely responsible for ensuring that their rental agreements
          and transactions comply with applicable laws and regulations. While we
          strive to ensure the continuous and uninterrupted operation of the
          Platform, we do not guarantee that the Platform will always be
          available, free of errors, or compatible with all devices and
          operating systems. Service interruptions, technical malfunctions, or
          scheduled maintenance may occur, and we are not liable for any losses,
          damages, or inconvenience caused by such disruptions. The Company does
          not verify, endorse, or guarantee the actions, reliability, or
          intentions of any landlord or tenant using the Platform. Users are
          solely responsible for vetting potential rental arrangements,
          verifying documentation, and assessing the trustworthiness of other
          parties. The Company is not responsible for disputes, fraud, or
          misconduct arising between landlords and tenants. The Platform
          integrates with third-party payment processors, communication tools,
          and external resources. The Company does not control, endorse, or
          assume responsibility for the actions or failures of any third-party
          service providers. Users acknowledge that interactions with these
          services are subject to the third party’s own terms and policies, and
          the Company is not liable for any disputes, losses, or damages arising
          from their use. By using the Platform, users acknowledge and accept
          all associated risks, including potential misuse of data, errors in
          rental agreements, disputes with other users, and service limitations.
          The Company encourages all users to exercise caution, conduct due
          diligence, and seek professional advice before entering into any
          rental transactions.
        </p>
        <h3 className="text-2xl font-[600] mb-6">LIMITATION OF LIABILITY.</h3>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, COORT INC. AND COORT LLC
          (COLLECTIVELY, THE “COMPANY”) AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
          AGENTS, AFFILIATES, LICENSORS, AND SERVICE PROVIDERS SHALL NOT BE
          LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO:
        </p>
        <ul>
          <li>
            USE OR INABILITY TO USE THE PLATFORM, INCLUDING SERVICE
            INTERRUPTIONS, TECHNICAL MALFUNCTIONS, OR LOSS OF ACCESS.
          </li>
          <li>
            FINANCIAL TRANSACTIONS, INCLUDING BUT NOT LIMITED TO ERRORS IN
            PAYMENT PROCESSING, DISPUTES OVER SECURITY DEPOSITS, OR UNAUTHORIZED
            CHARGES.
          </li>
          <li>
            USER MISCONDUCT, INCLUDING FRAUDULENT ACTIVITIES, MISREPRESENTATION,
            OR DISPUTES BETWEEN LANDLORDS AND TENANTS.
          </li>
          <li>
            DATA LOSS OR SECURITY BREACHES, INCLUDING UNAUTHORIZED ACCESS TO
            ACCOUNTS, HACKING, OR DATA THEFT.
          </li>
          <li>
            THIRD-PARTY SERVICES, INCLUDING FAILURES, ERRORS, OR INTERRUPTIONS
            CAUSED BY INTEGRATED PAYMENT PROCESSORS, MESSAGING PLATFORMS, OR
            EXTERNAL SERVICE PROVIDERS.
          </li>
        </ul>
        <p>
          UNDER NO CIRCUMSTANCES SHALL THE COMPANY’S TOTAL AGGREGATE LIABILITY
          TO ANY USER EXCEED THE GREATER OF (I) THE TOTAL AMOUNT PAID BY THE
          USER TO THE COMPANY FOR SERVICES IN THE PRECEDING TWELVE (12) MONTHS
          OR (II) ONE HUNDRED DOLLARS ($100.00), WHICHEVER IS LESS. THIS
          LIMITATION APPLIES REGARDLESS OF THE FORM OF ACTION, WHETHER IN
          CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE. THE
          COMPANY DOES NOT MEDIATE, ARBITRATE, OR INTERVENE IN DISPUTES BETWEEN
          LANDLORDS AND TENANTS. USERS ACKNOWLEDGE THAT THE COMPANY IS NOT A
          PARTY TO ANY LEASE AGREEMENTS OR FINANCIAL TRANSACTIONS BEYOND
          FACILITATING SECURE COMMUNICATION AND RECORD-KEEPING. ANY LEGAL OR
          FINANCIAL CLAIMS RELATED TO RENTAL DISPUTES, LEASE VIOLATIONS,
          SECURITY DEPOSIT DISPUTES, OR PAYMENT DEFAULTS MUST BE RESOLVED
          DIRECTLY BETWEEN THE INVOLVED PARTIES. THE COMPANY DISCLAIMS ALL
          LIABILITY ARISING FROM SUCH DISPUTES. THE PLATFORM INTEGRATES WITH
          THIRD-PARTY SERVICES, INCLUDING STRIPE (PAYMENT PROCESSING), TWILIO
          (MESSAGING), AND APPLE/GOOGLE (APP DISTRIBUTION). THE COMPANY DOES NOT
          OWN, CONTROL, OR ASSUME RESPONSIBILITY FOR THE PERFORMANCE, SECURITY,
          OR COMPLIANCE OF THESE THIRD-PARTY SERVICES. USERS ACKNOWLEDGE THAT
          INTERACTIONS WITH THESE SERVICES ARE GOVERNED BY THEIR RESPECTIVE
          TERMS, CONDITIONS, AND POLICIES, AND THE COMPANY IS NOT LIABLE FOR ANY
          LOSSES, DISPUTES, OR SERVICE FAILURES CAUSED BY THIRD-PARTY PROVIDERS.
          BY USING THE PLATFORM, USERS EXPRESSLY ACKNOWLEDGE THAT THEY ASSUME
          ALL RISKS ASSOCIATED WITH:
        </p>
        <ul>
          <li>
            THE ACCURACY AND LEGALITY OF RENTAL AGREEMENTS UPLOADED OR
            SHAREDTHROUGH THE PLATFORM.
          </li>
          <li>
            THE SECURITY AND INTEGRITY OF THEIR PERSONAL AND FINANCIAL DATA.
          </li>
          <li>
            THE RELIABILITY AND CONDUCT OF OTHER USERS, INCLUDING LANDLORDS AND
            TENANTS. THE COMPANY STRONGLY ENCOURAGES USERS TO CONDUCT THEIR OWN
          </li>
        </ul>
        <p>
          DUE DILIGENCE,CONSULT WITH LEGAL PROFESSIONALS, AND TAKE NECESSARY
          PRECAUTIONS BEFORE ENGAGING IN RENTAL TRANSACTIONS.
        </p>
        <p>
          CERTAIN JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          CERTAIN WARRANTIES OR LIABILITIES. IF APPLICABLE LAW PROHIBITS ANY
          PART OF THIS LIMITATION OF LIABILITY SECTION, THEN THE COMPANY’S
          LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
          USERS WAIVE ANY AND ALL RIGHTS TO BRING CLAIMS AGAINST THE COMPANY FOR
          ANY INCIDENTAL, INDIRECT, CONSEQUENTIAL, OR SPECIAL DAMAGES NOT
          EXPRESSLY PERMITTED UNDER APPLICABLE LAW.
        </p>
        <h3 className="text-2xl font-[600] mb-6">INDEMNIFICATION</h3>
        <p>
          By using the Platform, you (“User,” which includes both landlords and
          tenants) agree to indemnify, defend, and hold harmless Coort Inc. and
          Coort LLC (collectively, the “Company”), along with its affiliates,
          officers, directors, employees, agents, licensors, and service
          providers, from and against any and all claims, liabilities, damages,
          losses, costs, expenses, and fees (including reasonable attorneys’
          fees) arising out of or related to:
        </p>
        <ul>
          <li>
            Your Use of the Platform – Any misuse, misrepresentation, violation
            of laws, or breach of these Terms in connection with your use of the
            Platform.
          </li>
          <li>
            Rental Disputes and Financial Transactions – Any claims, disputes,
            or losses related to lease agreements, security deposit management,
            rent payments, eviction proceedings, or contract violations between
            landlords and tenants.
          </li>
          <li>
            Violation of Third-Party Rights – Any claim that your use of the
            Platform infringes upon or misappropriates the intellectual property
            rights, privacy rights, or contractual rights of any third party.
          </li>
          <li>
            Failure to Comply with Laws – Any violation of federal, state, or
            local rental laws, fair housing regulations, tenant protection
            statutes, or financial disclosure requirements.
          </li>
          <li>
            Breach of Security or Unauthorized Access – Any unauthorized use of
            your account, security breach, or failure to safeguard your login
            credentials that results in harm to the Company, other users, or
            third-party service providers.
          </li>
        </ul>
        <p>
          The Company reserves the right, at its sole discretion, to assume the
          exclusive defense and control of any matter subject to indemnification
          by you. In such cases, you agree to fully cooperate with the Company’s
          defense strategy and not settle any claim without the Company’s prior
          written consent. The Company retains the right to choose its legal
          counsel and determine how to resolve indemnified claims. Users
          acknowledge that certain Platform functions, including payment
          processing and communication tools, are provided through third-party
          services (e.g., Stripe, Twilio, Apple, and Google). If a claim is
          brought against the Company by any third-party provider due to a
          User’s violation of their respective terms, the User agrees to
          indemnify and hold harmless the Company from all related losses,
          damages, and legal expenses. This indemnification provision shall
          survive termination of your account and your use of the Platform. The
          obligations outlined in this section remain binding even after
          discontinuation of services, account deactivation, or withdrawal from
          the Platform.
        </p>
        <h3 className="text-2xl font-[600] mb-6">TERMINATION OF SERVICES.</h3>
        <p>
          The Company reserves the sole and absolute right to suspend, restrict,
          or terminate access to the Platform for any User (including both
          landlords and tenants) at any time, with or without prior notice, for
          any reason, including but not limited to:
        </p>
        <ul>
          <li>
            Violation of These Terms – Any breach of these Terms and Conditions,
            including failure to comply with payment obligations, prohibited
            conduct, or misuse of the Platform.
          </li>
          <li>
            Unlawful or Fraudulent Activity – Engaging in illegal, fraudulent,
            or deceptive activities, including falsifying information, engaging
            in unauthorized transactions, or attempting to circumvent Platform
            policies.
          </li>

          <li>
            Threats or Harassment – Any behavior that constitutes harassment,
            abuse, threats, or intimidation toward other users, Company
            representatives, or third-party service providers.
          </li>

          <li>
            Security or Privacy Violations – Attempting to hack, manipulate, or
            gain unauthorized access to the Platform, another user’s account, or
            Company systems.
          </li>
          <li>
            Failure to Pay Fees – Non-payment or chargebacks related to landlord
            subscription fees, service charges, or other financial obligations
            due to the Company.
          </li>
          <li>
            Excessive Complaints or Disputes – Repeated disputes, complaints, or
            actions that negatively impact the Platform, Company operations, or
            other users.
          </li>
          <li>
            Regulatory or Legal Compliance Issues – If required by law,
            regulation, or government order, or if the Company determines that
            continued service would violate applicable legal, financial, or
            regulatory obligations.
          </li>
        </ul>
        <p>Upon termination of a User’s account, the following will occur:</p>
        <ul>
          <li>
            Immediate Loss of Access – The User will no longer be able to access
            the Platform, including any stored data, messages, or documents.
          </li>
          <li>
            No Obligation to Retain Data – The Company is not responsible for
            retaining, storing, or providing access to any user-generated data,
            documents, or transaction history after termination. Users are
            responsible for backing up important files before termination.
          </li>
          <li>
            No Refunds for Landlords – If a landlord’s account is terminated due
            to misuse, non-payment, or violation of these Terms, no refunds will
            be issued for any remaining subscription period or prepaid services.
          </li>
          <li>
            Final Settlement of Outstanding Balances – Any unpaid fees or
            financial obligations must be settled immediately upon termination.
            The Company reserves the right to pursue collection efforts or legal
            action if necessary.
          </li>
        </ul>
        <p>
          Users whose accounts have been suspended or terminated may submit a
          written appeal to the Company, outlining the circumstances and
          providing any relevant documentation. The Company has sole discretion
          to reinstate accounts and is not obliged to provide a reason for any
          termination decision. The Company reserves the right to discontinue or
          modify the Platform at any time, for any reason, including business
          decisions, legal requirements, or technical limitations. If the
          Platform is permanently discontinued, affected users will be notified
          in advance, and any applicable refund policies for prepaid services
          will be determined at the Company’s discretion.
        </p>
        <h3 className="text-2xl font-[600] mb-6">DISPUTE RESOLUTION.</h3>
        <p>
          If the parties are unable to resolve the dispute through direct
          negotiations, they agree to endeavor to settle the dispute through
          mediation administered by a neutral mediator before resorting to
          litigation or any other dispute resolution procedure. The parties will
          jointly appoint an agreeable mediator and will share equally in the
          costs of such mediation. If mediation proves unsuccessful, either
          party may initiate binding arbitration. Such arbitration shall be
          administered by a recognized arbitral body mutually agreed upon by the
          parties. The judgment rendered by the arbitrator may be entered in any
          court having jurisdiction thereof. Each party shall bear its own costs
          in the arbitration and shall share equally the costs of the
          arbitrator. Notwithstanding the above clauses, [Insert Company Name]
          reserves the right to seek injunctive relief or file for damages in
          any court of competent jurisdiction in cases where [Insert Company
          Name] believes that its intellectual property rights have been
          violated or where it deems necessary to protect its business
          interests.
        </p>
        <h3 className="text-2xl font-[600] mb-6">GOVERNING LAW.</h3>
        <p>
          These Terms, including all agreements and policies incorporated by
          reference, shall be governed by, and construed in accordance with, the
          laws of the State of Delaware, without giving effect to any principles
          of conflicts of laws thereof that would lead to the application of the
          laws of another jurisdiction. The laws of the State of Delaware shall
          govern all matters arising out of or relating to these Terms,
          including, without limitation, its validity, interpretation,
          construction, performance, and enforcement. Both parties agree that
          any legal action or proceeding arising out of or in connection to the
          obligations, rights, and remedies of parties under these Terms shall
          be brought exclusively in the courts of Dallas County, Texas. Each
          party consents and submits to the exclusive jurisdiction of these
          courts in any such action or proceeding and waives any objection to
          venue or inconvenient forum. You and [Insert Company Name] agree that
          any proceedings to resolve or litigate any dispute will be conducted
          on an individual basis and not as a class action or other
          representative action, whether within a class-wide arbitration, by a
          class action, or otherwise. Both parties expressly waive any ability
          to maintain any class action in any forum.
        </p>
        <h3 className="text-2xl font-[600] mb-6">AMENDMENTS.</h3>
        <p>
          We reserve the right to modify, update, or change these Terms at any
          time and without prior notice. Any modifications will be effective
          immediately upon posting on our Platform. It is your responsibility to
          review these Terms periodically to stay informed of any updates or
          changes. By continuing to access our website and use our services
          after the modifications have been made, you agree to be bound by the
          revised Terms. · Changes to Terms: We may modify these Terms to
          reflect changes in our business practices, legal requirements, or
          improvements to our services. We will make reasonable efforts to
          provide notice of material changes to these Terms. Such notice may be
          provided through our website, by email, or by other means we deem
          appropriate. It is your responsibility to review the updated Terms. ·
          Continued Use: By continuing to access our website and use our
          services after the modifications have been made, you indicate your
          acceptance of the modified Terms. If you do not agree with the
          modified Terms, you should discontinue using our Platform and
          services. · Effect on Prior Agreements: Any modifications to these
          Terms will apply prospectively and will not affect any rights or
          obligations that arose prior to the effective date of the
          modifications. If you have entered into any separate agreements with
          us, the terms of those agreements will prevail in the event of any
          inconsistency with these Terms, unless expressly stated otherwise. ·
          Right to Terminate: We reserve the right to terminate, suspend, or
          restrict your access to our website and services, in whole or in part,
          at our sole discretion and without liability, if you fail to comply
          with these Terms or for any other reason we deem necessary. Please
          note that any modifications to these Terms will not affect our
          commitment to protecting your privacy and maintaining the
          confidentiality and security of your personal information. Our privacy
          practices are governed by our Privacy Policy.
        </p>
        <h3 className="text-2xl font-[600] mb-6">WAIVER.</h3>
        <p>
          The failure or delay of [Insert Company Name] in exercising any right,
          remedy, power, or privilege under these Terms shall not constitute a
          waiver thereof. Similarly, any single or partial exercise of any
          right, remedy, power, or privilege hereunder shall not preclude
          further exercise of the same or of any other right, remedy, power, or
          privilege. Any waiver by [Insert Company Name] of a breach of any
          provision of these Terms shall only be effective if it is in writing
          and signed by an authorized representative of [Insert Company Name]. A
          waiver of any term or provision shall not be construed as a waiver of
          any subsequent breach or default, whether of a similar nature or
          otherwise. No waiver by [Insert Company Name] of any term or condition
          set out in these Terms shall be deemed a further or continuing waiver
          of such term or condition or a waiver of any other term or condition,
          and any failure of [Insert Company Name] to assert a right or
          provision under these Terms shall not constitute a waiver of such
          right or provision.
        </p>
        <h3 className="text-2xl font-[600] mb-6">HEADINGS.</h3>
        <p>
          The headings used in these Terms are for convenience and reference
          purposes only. They do not limit, interpret, or define the scope or
          intent of the provisions contained herein. The headings are not
          intended to be legally binding or to affect the meaning or
          interpretation of these Terms. · Interpretation: The provisions
          contained in these Terms shall be interpreted in accordance with their
          plain meaning and intent, regardless of any headings or titles. ·
          Organization and Structure: The headings used throughout these Terms
          are provided to aid in navigating and understanding the content. They
          are organized in a logical manner and reflect the general subject
          matter of the respective sections. · Non-Exclusive: The headings used
          in these Terms are not an exhaustive representation of the topics
          covered. Other terms and concepts may be included in each section,
          regardless of whether they are explicitly stated in the headings. · No
          Legal Significance: The headings are not intended to have any legal
          significance or to modify or alter the rights and obligations of the
          parties under these Terms. They are simply a structural element to
          enhance readability. Please note that the headings provision is
          included for organizational purposes and does not impact the
          substantive rights and obligations set forth in these Terms.
        </p>
        <h3 className="text-2xl font-[600] mb-6">SEVERABILITY.</h3>
        <p>
          In the event that any provision or part of these Terms is determined
          to be invalid, illegal, or unenforceable by a court of competent
          jurisdiction, the remainder of these Terms shall remain in full force
          and effect. The invalid, illegal, or unenforceable provision shall be
          modified to the extent necessary to render it valid, legal, and
          enforceable while preserving its intent. If modification is not
          possible, the affected provision or part thereof shall be deemed
          severed from these Terms, but all other provisions and parts of these
          Terms shall continue in full force and effect. The invalidity,
          illegality, or unenforceability of any provision shall not affect the
          validity, legality, or enforceability of any other provision or part
          of these Terms, which shall remain in full force and effect as though
          such invalid, illegal, or unenforceable provision had never been
          included. These Terms shall be construed as if each provision and part
          thereof were drafted independently, and any presumption or rule of
          construction against construing ambiguities in favor of the drafting
          party shall not apply to the interpretation or construction of these
          Terms.
        </p>
        <h3 className="text-2xl font-[600] mb-6">ENTIRE AGREEMENT.</h3>
        <p>
          These Terms, including any additional policies or agreements
          incorporated by reference, constitute the entire agreement and
          understanding between [Insert Company Name] and you, superseding all
          prior or contemporaneous communications, proposals, understandings,
          agreements, or representations, whether oral or written, between the
          parties regarding the subject matter herein. You acknowledge that you
          have not relied upon any representation, promise, or warranty made by
          [Insert Company Name], except as expressly set forth in these Terms.
          Any modifications, amendments, or supplements to these Terms must be
          made in writing and signed by an authorized representative of [Insert
          Company Name]. No oral modifications or agreements shall be valid. Any
          provision that, by its nature, should survive termination or
          expiration, shall survive termination or expiration, including but not
          limited to provisions governing intellectual property, limitation of
          liability, indemnification, dispute resolution, and governing law. In
          the event of any conflict or inconsistency between the provisions of
          these Terms and any other agreements or policies, the provisions of
          these Terms shall prevail.
        </p>
        <h3 className="text-2xl font-[600] mb-6">CONTACT US.</h3>
        <p>
          If you have any questions, concerns, or feedback regarding these
          Terms, our Platform, or any of our products or services, please feel
          free to contact us through any of the following channels:
        </p>
        <p>· Email: info@depositsback.com</p>
        <p>
          To assist us in addressing your concerns effectively, please ensure that your communication includes your name, contact information, and a clear description of your question or issue. We may update the contact information provided herein from time to time. It is your responsibility to check this provision for the most current contact information.
Please note that any information provided through our contact channels is for general informational purposes only and does not constitute legal, financial, or professional advice. For specific legal or financial concerns, consult with a qualified professional.
We may retain records of your inquiries and our responses for our records and as required by applicable laws and regulations. 

        </p>
      </div>
    </div>
  );
};

export default TermsandConditions;

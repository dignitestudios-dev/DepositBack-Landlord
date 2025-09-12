import React, { useState } from 'react'

const TermsandConditions = () => {
const [selectedSetting, setSelectedSetting] = useState(null);
    
  return (
    <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">
              Terms & Conditions
            </h3>
            <div className="text-sm leading-relaxed space-y-4 max-h-[450px] overflow-y-auto pr-2 pl-3 pr-3">
              <p>
                <h1 className="text-[18px] font-[600]">
                  1. Acceptance of Terms
                </h1>
                <br />
                By accessing or using our mobile application (the "App"), you
                agree to be bound by these Terms of Service. If you do not agree
                to these Terms, please do not use the App.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">2. User Conduct</h1>
                <br />
                Use the App for any illegal or unauthorized purpose. Interfere
                with the security or functionality of the App. Attempt to gain
                unauthorized access to the App or its systems. Use the App in a
                way that could harm, disable, overburden, or impair the App or
                interfere with other users' enjoyment of the App.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">
                  3. Intellectual Property
                </h1>
                <br />
                All content and materials on the App, including but not limited
                to text, graphics, logos, images, and software, are the property
                or its licensors and are protected by copyright and other
                intellectual property laws.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">
                  4. Disclaimer of Warranties
                </h1>
                <br />
                Use the app at your own risk...
              </p>
            </div>
          </div>
  )
}

export default TermsandConditions;
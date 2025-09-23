import React, { useState } from 'react';
import '../styles/FooterCopyright.css';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const FooterCopyright = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <div className="footer-copyright">
        <div className="footer-copyright-content">
          <div className="copyright-left">
            <span className="copyright-text">
              ALL RIGHTS RESERVED © 2025 PATTERNS MANUFACTURING
            </span>
          </div>
          <div className="footer-right">
            <span onClick={() => setIsPrivacyOpen(true)} className="footer-link-small">
              Privacy Policy
            </span>
            <span onClick={() => setIsTermsOpen(true)} className="footer-link-small">
              Terms of Service
            </span>
            <span className="powered-by-text">Powered by GAY AGENCY</span>
          </div>
        </div>
      </div>
      {isTermsOpen && <TermsOfService onClose={() => setIsTermsOpen(false)} />}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}
    </>
  );
};

export default FooterCopyright;

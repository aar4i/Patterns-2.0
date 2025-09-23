import React, { useEffect } from 'react';
import '../styles/Modal.css';

const PrivacyPolicy = ({ onClose }) => {
  useEffect(() => {
    // Блокируем прокрутку при открытии модального окна
    document.body.classList.add('modal-open');
    
    // Разблокируем прокрутку при закрытии
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleClose = () => {
    document.body.classList.remove('modal-open');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>&times;</button>
        
        <h2>Datenschutzerklärung</h2>
        <p>Stand: Juni 2025</p>
        
        <p>Wir freuen uns über Ihr Interesse an unserem Unternehmen. Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten auf unserer Website.</p>
        
        <div className="section-divider"></div>
        
        <h3>1. Verantwortlicher</h3>
        <div className="contact-info">
          <p><strong>Patterns</strong></p>
          <p>Margarita Karikh</p>
          <p>Itterstrasse 43, 40589 Düsseldorf</p>
          <p>+49 152 25899470</p>
          <p>contact@patterns-agency.com</p>
          <p>St-ID 34 689 520 730</p>
        </div>
        
        <div className="section-divider"></div>
        
        <h3>2. Erhebung und Speicherung personenbezogener Daten</h3>
        <p>Wir verarbeiten personenbezogene Daten, wenn Sie:</p>
        <ul>
          <li>unser Kontakt- oder Bestellformular nutzen</li>
          <li>uns per E-Mail kontaktieren</li>
          <li>unsere Website besuchen (automatische Serverdaten, Cookies etc.)</li>
        </ul>
        
        <p>Erhobene Daten können sein:</p>
        <ul>
          <li>Vor- und Nachname</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer</li>
          <li>Liefer- oder Rechnungsadresse</li>
          <li>Bestelldetails</li>
          <li>IP-Adresse (bei Besuch der Website)</li>
        </ul>
        
        <div className="section-divider"></div>
        
        <h3>3. Zweck der Verarbeitung</h3>
        <p>Wir verarbeiten Ihre Daten zu folgenden Zwecken:</p>
        <ul>
          <li>zur Abwicklung Ihrer Bestellung</li>
          <li>zur Beantwortung von Anfragen</li>
          <li>zur Erfüllung gesetzlicher Pflichten (z. B. Aufbewahrungspflichten)</li>
          <li>ggf. für die technische Bereitstellung und Sicherheit der Website</li>
        </ul>
        
        <div className="section-divider"></div>
        
        <h3>4. Rechtsgrundlage der Verarbeitung</h3>
        <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Pflicht). Bei Einwilligung (z. B. Newsletter) auf Basis von Art. 6 Abs. 1 lit. a DSGVO.</p>
        
        <div className="section-divider"></div>
        
        <h3>5. Weitergabe von Daten</h3>
        <p>Eine Weitergabe Ihrer Daten erfolgt nicht, außer:</p>
        <ul>
          <li>an technische Dienstleister (z. B. Squarespace, E-Mail-Anbieter), mit denen ein Auftragsverarbeitungsvertrag besteht</li>
          <li>an Logistikdienstleister, falls eine Lieferung erfolgt</li>
          <li>wenn gesetzlich vorgeschrieben</li>
        </ul>
        
        <div className="section-divider"></div>
        
        <h3>6. Cookies & Tracking</h3>
        <p>Unsere Website kann Cookies einsetzen, um Funktionalitäten (z. B. Formulare, Sicherheitsfeatures) sicherzustellen.</p>
        <p>Wenn Sie zustimmen, können Drittanbieter-Cookies (z. B. Google Analytics) verwendet werden.</p>
        <p>Ein entsprechender Cookie-Banner wird beim ersten Besuch eingeblendet.</p>
        
        <div className="section-divider"></div>
        
        <h3>7. Speicherdauer</h3>
        <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.</p>
        
        <div className="section-divider"></div>
        
        <h3>8. Ihre Rechte</h3>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>Bitte wenden Sie sich hierzu an: <strong>contact@patterns-agency.com</strong></p>
        
        <div className="section-divider"></div>
        
        <h3>9. Kontakt Datenschutz</h3>
        <p>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:</p>
        <div className="contact-info">
          <p><strong>contact@patterns-agency.com</strong></p>
        </div>
        
        <div className="section-divider"></div>
        
        <h3>10. Hosting & Website-Plattform</h3>
        <p>Unsere Website wird über Squarespace (Squarespace Inc., USA) bereitgestellt.</p>
        <p>Es besteht ein Auftragsverarbeitungsvertrag (Data Processing Addendum) mit Squarespace.</p>
        <p>Daten können in die USA übertragen werden – in Einklang mit der DSGVO und den EU-Standardvertragsklauseln.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 
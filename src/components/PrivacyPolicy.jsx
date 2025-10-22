import React, { useEffect } from 'react';
import '../styles/Modal.css';

const PrivacyPolicy = ({ onClose }) => {
  useEffect(() => {
    // Сохраняем текущую позицию скролла
    const scrollY = window.scrollY;
    
    // Блокируем прокрутку при открытии модального окна
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Разблокируем прокрутку при закрытии
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleClose = () => {
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
        
        <div className="section-divider"></div>
        
        <h3>3. Kontaktformular und E-Mail-Kontakt</h3>
        <p>Wenn Sie unser Kontaktformular nutzen oder uns per E-Mail kontaktieren, verarbeiten wir folgende Daten:</p>
        <ul>
          <li>Name</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer (falls angegeben)</li>
          <li>Nachrichteninhalt</li>
        </ul>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. lit. f DSGVO (berechtigtes Interesse an der Kommunikation mit Interessenten)</p>
        <p><strong>Speicherdauer:</strong> Die Daten werden gelöscht, sobald sie für die Zwecke ihrer Verarbeitung nicht mehr erforderlich sind oder Sie um Löschung bitten.</p>
        
        <div className="section-divider"></div>
        
        <h3>4. Server-Log-Dateien</h3>
        <p>Bei jedem Besuch unserer Website erfasst unser System automatisch Daten und Informationen vom System des aufrufenden Rechners:</p>
        <ul>
          <li>IP-Adresse</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Referrer-URL</li>
        </ul>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Gewährleistung der Systemsicherheit)</p>
        <p><strong>Speicherdauer:</strong> Die Daten werden nach 7 Tagen automatisch gelöscht.</p>
        
        <div className="section-divider"></div>
        
        <h3>5. Ihre Rechte</h3>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
        
        <div className="section-divider"></div>
        
        <h3>6. Weitergabe von Daten</h3>
        <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte erfolgt nur:</p>
        <ul>
          <li>wenn Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
          <li>dies zur Erfüllung eines Vertrags erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
          <li>eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
        </ul>
        
        <div className="section-divider"></div>
        
        <h3>7. Änderungen dieser Datenschutzerklärung</h3>
        <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
import React, { useEffect } from 'react';
import '../styles/Modal.css';

const TermsOfService = ({ onClose }) => {
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
        
        <h2>AGB – Allgemeine Geschäftsbedingungen</h2>
        <p>Patterns Manufacturing</p>
        
        <div className="section-divider"></div>
        
        <h3>1. Geltungsbereich</h3>
        <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Patterns Manufacturing, Inhaber: Margarita Karikh, und dem Kunden über die Bestellung von Textilveredelungsdienstleistungen (z. B. Druck, Stick) über unsere Website.</p>
        
        <div className="section-divider"></div>
        
        <h3>2. Angebot und Vertragsschluss</h3>
        <p>Durch das Absenden eines Bestellformulars gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt zustande, sobald wir die Bestellung schriftlich oder per E-Mail bestätigen.</p>
        
        <div className="section-divider"></div>
        
        <h3>3. Preise und Zahlung</h3>
        <p>Alle Preise verstehen sich in Euro zzgl. der gesetzlichen Mehrwertsteuer (sofern anwendbar). Die Zahlung erfolgt per Vorkasse, Banküberweisung oder auf Rechnung – je nach Vereinbarung.</p>
        
        <div className="section-divider"></div>
        
        <h3>4. Lieferzeit und Versand</h3>
        <p>Die Lieferzeiten werden individuell je nach Auftragsumfang vereinbart. Etwaige Versandkosten werden vor Abschluss des Vertrags mitgeteilt.</p>
        
        <div className="section-divider"></div>
        
        <h3>5. Eigentumsvorbehalt</h3>
        <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
        
        <div className="section-divider"></div>
        
        <h3>6. Gewährleistung</h3>
        <p>Es gelten die gesetzlichen Gewährleistungsrechte. Bei individuell veredelten Artikeln ist eine Rückgabe nur bei Mängeln oder Fehlern möglich.</p>
        
        <div className="section-divider"></div>
        
        <h3>7. Haftung</h3>
        <p>Wir haften nur bei Vorsatz und grober Fahrlässigkeit. Für Schäden, die durch unsachgemäßen Gebrauch oder äußere Einflüsse entstehen, übernehmen wir keine Haftung.</p>
        
        <div className="section-divider"></div>
        
        <h3>8. Datenschutz</h3>
        <p>Es gilt unsere Datenschutzerklärung. Die Datenverarbeitung erfolgt ausschließlich zur Abwicklung des Auftrags.</p>
        
        <div className="section-divider"></div>
        
        <h3>9. Gerichtsstand und anwendbares Recht</h3>
        <p>Es gilt deutsches Recht. Gerichtsstand ist unser Geschäftssitz, sofern der Kunde Unternehmer ist.</p>
        
        <div className="section-divider"></div>
        
        <h3>10. Kontakt</h3>
        <div className="contact-info">
          <p><strong>Patterns Manufacturing</strong></p>
          <p>Margarita Karikh</p>
          <p>Itterstrasse 43, 40589 Düsseldorf</p>
          <p>+49 152 25899470</p>
          <p><strong>contact@patterns-agency.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 
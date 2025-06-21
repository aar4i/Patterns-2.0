import React from 'react';
import '../styles/TermsOfService.css';

const TermsOfService = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>AGB – Allgemeine Geschäftsbedingungen Patterns</h2>
        <p><strong>1. Geltungsbereich</strong></p>
        <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Motivo Agency, Inhaber: [Margarita Karikh, und dem Kunden über die Bestellung von Textilveredelungsdienstleistungen (z. B. Druck, Stick) über unsere Website.</p>
        
        <p><strong>2. Angebot und Vertragsschluss</strong></p>
        <p>Durch das Absenden eines Bestellformulars gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt zustande, sobald wir die Bestellung schriftlich oder per E-Mail bestätigen.</p>
        
        <p><strong>3. Preise und Zahlung</strong></p>
        <p>Alle Preise verstehen sich in Euro zzgl. der gesetzlichen Mehrwertsteuer (sofern anwendbar). Die Zahlung erfolgt per Vorkasse, Banküberweisung oder auf Rechnung – je nach Vereinbarung.</p>
        
        <p><strong>4. Lieferzeit und Versand</strong></p>
        <p>Die Lieferzeiten werden individuell je nach Auftragsumfang vereinbart. Etwaige Versandkosten werden vor Abschluss des Vertrags mitgeteilt.</p>
        
        <p><strong>5. Eigentumsvorbehalt</strong></p>
        <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
        
        <p><strong>6. Gewährleistung</strong></p>
        <p>Es gelten die gesetzlichen Gewährleistungsrechte. Bei individuell veredelten Artikeln ist eine Rückgabe nur bei Mängeln oder Fehlern möglich.</p>
        
        <p><strong>7. Haftung</strong></p>
        <p>Wir haften nur bei Vorsatz und grober Fahrlässigkeit. Für Schäden, die durch unsachgemäßen Gebrauch oder äußere Einflüsse entstehen, übernehmen wir keine Haftung.</p>
        
        <p><strong>8. Datenschutz</strong></p>
        <p>Es gilt unsere Datenschutzerklärung. Die Datenverarbeitung erfolgt ausschließlich zur Abwicklung des Auftrags.</p>
        
        <p><strong>9. Gerichtsstand und anwendbares Recht</strong></p>
        <p>Es gilt deutsches Recht. Gerichtsstand ist unser Geschäftssitz, sofern der Kunde Unternehmer ist.</p>
      </div>
    </div>
  );
};

export default TermsOfService; 
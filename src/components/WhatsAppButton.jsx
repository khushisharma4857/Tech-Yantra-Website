import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WHATSAPP_URL =
  "https://wa.me/918607492753?text=Hi%20Tech%20Yantra,%20I'm%20interested%20in%20your%20services.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      // The link contains only an icon, so without this a screen reader
      // announces just "link" with no indication of what it does.
      aria-label="Chat with Tech Yantra on WhatsApp (opens in a new tab)"
    >
      <FaWhatsapp size={30} aria-hidden="true" focusable="false" />
    </a>
  );
}

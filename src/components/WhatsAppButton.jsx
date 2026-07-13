import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappButton.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918607492753?text=Hi%20Tech%20Yantra,%20I'm%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
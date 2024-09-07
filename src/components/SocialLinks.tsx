import Link from 'next/link';

import { ExternalLink, Mail, Phone } from 'lucide-react';

export default function Socials() {
  return (
    <section className="social-links-section">
      <Link
        href="https://www.linkedin.com/in/sunnybharadwaj/"
        className="social-link"
      >
        <ExternalLink size={18} />
        LinkedIn
      </Link>
      <Link href="https://github.com/sunnybharadwajp" className="social-link">
        <ExternalLink size={18} />
        GitHub
      </Link>
      <Link href="tel:+917842810070" className="social-link">
        <Phone size={18} />
        +917842810070
      </Link>
      <Link href="mailto:sunnybharadwajp@gmail.com" className="social-link">
        <Mail size={18} />
        sunnybharadwajp@gmail.com
      </Link>
    </section>
  );
}

'use client';

import { ExternalLink, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Socials() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:sunnybharadwajp@gmail.com';
  };

  return (
    <section className="social-links-section">
      <Link
        href="https://www.linkedin.com/in/sunnybharadwaj/"
        className="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink size={18} />
        LinkedIn
      </Link>
      <Link
        href="https://github.com/sunnybharadwajp"
        className="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink size={18} />
        GitHub
      </Link>
      <Link href="tel:+917842810070" className="social-link">
        <Phone size={18} />
        +917842810070
      </Link>
      <a
        href="mailto:sunnybharadwajp@gmail.com"
        className="social-link"
        onClick={handleEmailClick}
      >
        <Mail size={18} />
        sunnybharadwajp@gmail.com
      </a>
    </section>
  );
}

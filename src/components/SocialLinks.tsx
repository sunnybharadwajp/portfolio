import Link from 'next/link';

import { ExternalLink, Mail, Phone } from 'lucide-react';

export default function Socials() {
  return (
    <>
      <section className="flex gap-5 items-center justify-center">
        <Link href="mailto:sunnybharadwajp@gmail.com" className="social-link">
          <Mail size={18} />
          sunnybharadwajp@gmail.com
        </Link>
        <Link href="tel:+917842810070" className="social-link">
          <Phone size={18} />
          +917842810070
        </Link>
        <Link href="https://twitter.com/" className="social-link">
          <ExternalLink size={18} />
          LinkedIn
        </Link>
      </section>
    </>
  );
}

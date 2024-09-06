import { Mail, Phone } from 'lucide-react';
import Socials from '@/components/SocialLinks';

export default function Home() {
  return (
    <div className="home-page page-wrapper">
      <p className="text-3xl">👁️‍🗨️</p>
      <p>Hi! I'm Sunny</p>
      <p>
        I build web applications, make music and ponder about the significance
        of reality. At the moment, I independently take freelance projects and
        build full-stack tools for all platforms. I had previously run Chakra, a
        design agency and web development consultancy for SMEs, primarily
        Startups.{' '}
      </p>
      <div className="site-links">
        <a className="large-text-button" href="/work">
          learn about my work
        </a>
        <a className="large-text-button" href="/projects">
          checkout my projects
        </a>
        <a className="large-text-button" href="/blog">
          read my blog
        </a>
        <a className="large-text-button" href="/services">
          hire me
        </a>
        <a className="large-text-button" href="#get-in-touch">
          get in touch
        </a>
      </div>
      <div id="get-in-touch" className="contact">
        <a className="flex gap-2" href="mailto:sunnybharadwajp@gmail.com">
          <Mail />
          sunnybharadwajp@gmail.com
        </a>
        <a className="flex gap-2" href="tel:+919876543210">
          <Phone />
          +91 98765 43210
        </a>
        <Socials />
      </div>
    </div>
  );
}

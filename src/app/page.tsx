import { Mail, Phone } from 'lucide-react';
import Socials from '@/components/SocialLinks';

export default function Home() {
  return (
    <div className="home-page page">
      <div className="content-wrapper">
        <p>Hi! I'm Bharadwaj.</p>
        <p>
          I build software, make art and often ponder on the significance of
          reality. I had previously run Chakra, a design agency and web
          development consultancy for SMEs, primarily Startups. At the moment, I
          work on freelance projects, building full-stack tools for all
          platforms.
        </p>
        <Socials />
      </div>
    </div>
  );
}

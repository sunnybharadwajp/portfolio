import { Mail, Phone } from 'lucide-react';
import Socials from '@/components/SocialLinks';

export default function Home() {
  return (
    <div className="home-page page">
      <div className="content-wrapper sm:max-w-2xl">
        <p className="large font-bold">Hi! I&apos;m Bharadwaj.</p>
        <p>
          I build software, make art and often ponder on the significance of
          reality itself. I had previously run Chakra, a design agency and web
          development consultancy for SMEs, primarily Startups. At the moment, I
          take up freelance projects and build full-stack tools for all
          platforms independently.
        </p>
        <Socials />
      </div>
    </div>
  );
}

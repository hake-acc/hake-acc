import content from "@/data/content.json";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Chen",
  jobTitle: "Creative Developer & Software Engineer",
  url: "https://alexchen.dev",
  sameAs: [
    "https://github.com/alexchen",
    "https://twitter.com/alexchen",
    "https://linkedin.com/in/alexchen",
  ],
  knowsAbout: ["Web Development", "React", "Next.js", "WebGL", "TypeScript", "UI/UX Design"],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data — Next.js hoists this to <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />
      <main id="main-content">
        <Hero data={content.hero} contact={content.contact} />
        <About data={content.about} />
        <SectionDivider color="#6AA9FF" />
        <Projects data={content.projects} />
        <SectionDivider color="#8B7CF6" />
        <Skills data={content.skills} />
        <SectionDivider color="#F4B860" />
        <Experience data={content.experience} />
        <SectionDivider color="#6AA9FF" />
        <Services data={content.services} />
        <SectionDivider color="#8B7CF6" />
        <Testimonials data={content.testimonials} />
        <SectionDivider color="#F4B860" />
        <ContactForm data={content.contact} />
      </main>
      <Footer />
    </>
  );
}

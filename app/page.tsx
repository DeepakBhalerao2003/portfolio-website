
import { createClient } from "@/utils/supabase/server";

import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutMe } from "../components/AboutMe";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectSection } from "../components/ProjectSection";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="min-h-screen w-full font-serif">
      <Navbar />
      <HeroSection />
      <AboutMe />
      <SkillsSection />
      <ProjectSection />
      <Contact />
      <Footer />
    </div>
  );
}

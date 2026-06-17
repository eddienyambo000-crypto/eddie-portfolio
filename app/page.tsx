import { supabase } from "@/lib/supabase";
import {
  fallbackProfile, fallbackProjects, fallbackServices, fallbackSkills, fallbackTestimonials,
} from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import {
  Problem, Outcome, Services, Projects, WantBand, Process, CaseStudy, Testimonials, About, Offer, Contact, Footer,
} from "@/components/sections";

export const revalidate = 60; // ISR: content edits in /admin show within 60s

async function getData() {
  try {
    const [p, pr, sv, sk, te] = await Promise.all([
      supabase.from("pf_profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("pf_projects").select("*").eq("published", true).order("sort"),
      supabase.from("pf_services").select("*").order("sort"),
      supabase.from("pf_skills").select("*").order("sort"),
      supabase.from("pf_testimonials").select("*").eq("published", true).order("sort"),
    ]);
    const profile = p.data
      ? {
          ...fallbackProfile,
          ...p.data,
          photo_url: p.data.photo_url || fallbackProfile.photo_url,
          stats: Array.isArray(p.data.stats) && p.data.stats.length ? p.data.stats : fallbackProfile.stats,
        }
      : fallbackProfile;
    return {
      profile,
      projects: pr.data?.length ? pr.data : fallbackProjects,
      services: sv.data?.length ? sv.data : fallbackServices,
      skills: sk.data?.length ? sk.data : fallbackSkills,
      testimonials: te.data?.length ? te.data : fallbackTestimonials,
    };
  } catch {
    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      services: fallbackServices,
      skills: fallbackSkills,
      testimonials: fallbackTestimonials,
    };
  }
}

export default async function Home() {
  const d = await getData();
  return (
    <>
      <Nav />
      <Hero profile={d.profile} />
      <Marquee />
      <Problem />
      <Outcome profile={d.profile} />
      <Services services={d.services} />
      <Projects projects={d.projects} />
      <WantBand />
      <Process />
      <CaseStudy />
      <Testimonials testimonials={d.testimonials} />
      <About profile={d.profile} skills={d.skills} />
      <Offer />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

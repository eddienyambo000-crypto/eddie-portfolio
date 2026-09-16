import { cmsReady, supabase } from "@/lib/supabase";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackServices,
  fallbackSkills,
  fallbackTestimonials,
  type Profile,
  type Project,
  type Service,
  type Skill,
  type Testimonial,
} from "@/lib/site";

export type SiteContent = {
  profile: Profile;
  projects: Project[];
  services: Service[];
  skills: Skill[];
  testimonials: Testimonial[];
};

const seed: SiteContent = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  services: fallbackServices,
  skills: fallbackSkills,
  testimonials: fallbackTestimonials,
};

/**
 * One fetch for every page.
 *
 * Any table that is empty, errors, or is missing a column falls back to the
 * seed, so a half-filled CMS never produces a half-empty page. Called from
 * server components with `revalidate = 60` on the route.
 */
export async function getContent(): Promise<SiteContent> {
  if (!cmsReady) return seed;

  try {
    const [p, pr, sv, sk, te] = await Promise.all([
      supabase.from("pf_profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("pf_projects").select("*").eq("published", true).order("sort"),
      supabase.from("pf_services").select("*").order("sort"),
      supabase.from("pf_skills").select("*").order("sort"),
      supabase.from("pf_testimonials").select("*").eq("published", true).order("sort"),
    ]);

    const profile: Profile = p.data
      ? {
          ...fallbackProfile,
          ...p.data,
          photo_url: p.data.photo_url || fallbackProfile.photo_url,
          stats:
            Array.isArray(p.data.stats) && p.data.stats.length
              ? p.data.stats
              : fallbackProfile.stats,
        }
      : fallbackProfile;

    return {
      profile,
      projects: pr.data?.length ? (pr.data as Project[]) : seed.projects,
      services: sv.data?.length ? (sv.data as Service[]) : seed.services,
      skills: sk.data?.length ? (sk.data as Skill[]) : seed.skills,
      testimonials: te.data?.length ? (te.data as Testimonial[]) : seed.testimonials,
    };
  } catch {
    return seed;
  }
}

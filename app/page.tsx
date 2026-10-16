import { getContent } from "@/lib/content";
import { IndexHome } from "@/components/IndexHome";

export const revalidate = 60;

/**
 * The index is the whole homepage. No scrolling marketing spine — each of the
 * four rows leads to the page that argues its own case.
 */
export default async function Home() {
  const d = await getContent();
  return <IndexHome profile={d.profile} />;
}

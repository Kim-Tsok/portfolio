
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getProjects = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data;
  },
  ["projects-cache"],
  { revalidate: 60, tags: ["projects"] }
);

export const getSkills = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.from("skills").select("*");

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }

    return data;
  },
  ["skills-cache"],
  { revalidate: 60, tags: ["skills"] }
);

export const getServices = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }

    return data;
  },
  ["services-cache"],
  { revalidate: 60, tags: ["services"] }
);

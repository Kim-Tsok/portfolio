import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(projects || [])
  } catch (error) {
    console.error("API error:", error)
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data || [])
  } catch (error) {
    console.error("Error fetching services:", error)
    return Response.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

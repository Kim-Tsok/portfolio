import { createClient } from "@/lib/supabase/server"

export default async function SkillsSection() {
  const supabase = await createClient()

  const { data: skills } = await supabase.from("skills").select("*").order("category", { ascending: true })

  if (!skills || skills.length === 0) {
    return null
  }

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <section className="bg-[#eadfd8]/80 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16">Skills & Expertise</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="bg-[#eadfd8] rounded-2xl p-8 border-2 border-[#ab8164]">
              <h3 className="text-xl font-bold text-[#634836] mb-6">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex flex-col items-start">
                    <span className="bg-[#ab8164] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {skill.name}
                    </span>
                    <span className="text-xs text-[#bfa18e] mt-1">{skill.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

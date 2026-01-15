
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Showcase from "@/components/showcase"
import Services from "@/components/services"
import Contact from "@/components/contact"
import { getProjects, getSkills, getServices } from "@/lib/data"

export default async function Home() {
  const [projects, skills, services] = await Promise.all([getProjects(), getSkills(), getServices()])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About skills={skills} />
      <Showcase projects={projects} />
      <Services services={services} />
      <Contact />
    </main>
  )
}

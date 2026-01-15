"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "services">("projects")
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])


  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image_url: "",
    tech_stack: "",
    link: "",
    github_url: "",
    custom_links: [] as { label: string; url: string }[],
  })

  // Skill form state
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Frontend",
  })

  // Services form state
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "",
    order_index: 0,
  })

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/admin/login")
        return
      }

      const isUserAdmin = user.user_metadata?.is_admin === true
      setUser(user)
      setIsAdmin(isUserAdmin)
      setLoading(false)

      if (isUserAdmin) {
        fetchProjects()
        fetchSkills()
        fetchServices()
      }
    }

    checkAuth()
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*")
    if (data) setProjects(data)
  }

  const fetchSkills = async () => {
    const { data } = await supabase.from("skills").select("*")
    if (data) setSkills(data)
  }

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("order_index", { ascending: true })
    if (data) setServices(data)
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    const techArray = projectForm.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const { error } = await supabase.from("projects").insert({
      title: projectForm.title,
      description: projectForm.description,
      image_url: projectForm.image_url || null,
      tech_stack: techArray,
      link: projectForm.link || null,
      github_url: projectForm.github_url || null,
      custom_links: projectForm.custom_links,
    })

    if (!error) {
      setProjectForm({
        title: "",
        description: "",
        image_url: "",
        tech_stack: "",
        link: "",
        github_url: "",
        custom_links: [],
      })
      fetchProjects()
      toast.success("Project added")
    } else {
      toast.error(error.message)
    }
  }

  const handleDeleteProject = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id)
    fetchProjects()
  }


  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: skillForm.name, category: skillForm.category }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add skill")
      }

      setSkillForm({ name: "", category: "Frontend" })
      fetchSkills()
      toast.success("Skill added successfully")
    } catch (error: any) {
      console.error("Error adding skill:", error)
      toast.error(error.message || "Failed to add skill")
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      await supabase.from("skills").delete().eq("id", id)
      fetchSkills()
      toast.success("Skill deleted")
    } catch (error) {
      toast.error("Failed to delete skill")
    }
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from("services").insert({
      title: serviceForm.title,
      description: serviceForm.description,
      icon: serviceForm.icon || null,
      order_index: serviceForm.order_index,
    })

    if (!error) {
      setServiceForm({ title: "", description: "", icon: "", order_index: 0 })
      fetchServices()
      toast.success("Service added successfully")
    } else {
      toast.error(error.message)
    }
  }

  const handleDeleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id)
    fetchServices()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Go Back Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects, skills, and services</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant={activeTab === "projects" ? "default" : "outline"} onClick={() => setActiveTab("projects")}>
            Projects
          </Button>
          <Button variant={activeTab === "skills" ? "default" : "outline"} onClick={() => setActiveTab("skills")}>
            Skills
          </Button>
          <Button variant={activeTab === "services" ? "default" : "outline"} onClick={() => setActiveTab("services")}>
            Services
          </Button>
        </div>

        {activeTab === "projects" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full border rounded p-2"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input
                      value={projectForm.image_url}
                      onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tech Stack (comma-separated)</label>
                    <Input
                      value={projectForm.tech_stack}
                      onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                      placeholder="React, Next.js, TypeScript"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Project Link (Demo)</label>
                    <Input
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      type="url"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <Input
                      value={projectForm.github_url}
                      onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                      type="url"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <label className="block text-sm font-medium mb-2">Custom Button Links</label>
                    {projectForm.custom_links.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Button Label (e.g. Docs)"
                          value={link.label}
                          onChange={(e) => {
                            const newLinks = [...projectForm.custom_links]
                            newLinks[index].label = e.target.value
                            setProjectForm({ ...projectForm, custom_links: newLinks })
                          }}
                        />
                        <Input
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...projectForm.custom_links]
                            newLinks[index].url = e.target.value
                            setProjectForm({ ...projectForm, custom_links: newLinks })
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newLinks = projectForm.custom_links.filter((_, i) => i !== index)
                            setProjectForm({ ...projectForm, custom_links: newLinks })
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setProjectForm({
                          ...projectForm,
                          custom_links: [...projectForm.custom_links, { label: "", url: "" }],
                        })
                      }
                    >
                      + Add Custom Link
                    </Button>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Projects List</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          {project.tech_stack && (
                            <div className="flex gap-2 mt-2">
                              {project.tech_stack.map((tech: string) => (
                                <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Skill</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium mb-1">Skill Name</label>
                    <Input
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g., React, TypeScript"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Tools">Tools</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Skill
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Skills List</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{skill.name}</h3>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Service</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Service Title</label>
                    <Input
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="e.g., Web Design"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full border rounded p-2"
                      rows={3}
                      placeholder="Describe your service..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon (emoji or text)</label>
                    <Input
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                      placeholder="e.g., 🎨"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Order</label>
                    <Input
                      type="number"
                      value={serviceForm.order_index}
                      onChange={(e) => setServiceForm({ ...serviceForm, order_index: Number.parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Service
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Services List</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {service.icon && <span className="text-xl">{service.icon}</span>}
                            <h3 className="font-semibold">{service.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Order: {service.order_index}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

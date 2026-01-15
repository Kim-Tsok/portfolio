"use client"


import { motion } from "framer-motion"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

interface ServicesProps {
  services: Service[]
}

export default function Services({ services = [] }: ServicesProps) {
  return (
    <section className="bg-[#eadfd8] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-black mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Services
          </h2>
          <p className="text-[#634836] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-poppins)" }}>
            Specialized solutions to bring your digital vision to life
          </p>
        </motion.div>

        {(!services || services.length === 0) ? (
          <p className="text-center text-[#bfa18e]">No services added yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-[#ab8164]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  {service.icon && (
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#ab8164] to-[#634836] text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  )}

                  <h3
                    className="text-xl font-bold text-[#3d2e24] mb-3"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#634836]/80 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

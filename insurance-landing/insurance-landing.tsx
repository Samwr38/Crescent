"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function InsuranceLanding() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    edad: "",
    retiro: "",
    ingresos: "",
    impuestos: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [countersAnimated])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      errors.nombre = "Por favor ingresa tu nombre completo"
    }

    if (!formData.telefono.trim()) {
      errors.telefono = "Por favor ingresa un teléfono válido"
    } else if (!/^[\d\s\-+$$$$]{10,}$/.test(formData.telefono)) {
      errors.telefono = "Por favor ingresa un teléfono válido (mínimo 10 dígitos)"
    }

    if (!formData.email.trim()) {
      errors.email = "Por favor ingresa un email válido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Por favor ingresa un email válido"
    }

    if (!formData.edad) {
      errors.edad = "Por favor selecciona tu rango de edad"
    }

    if (!formData.retiro) {
      errors.retiro = "Por favor selecciona cuándo planeas retirarte"
    }

    if (!formData.ingresos) {
      errors.ingresos = "Por favor selecciona tu rango de ingresos"
    }

    if (!formData.impuestos) {
      errors.impuestos = "Por favor selecciona una opción"
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        alert("¡Gracias por tu interés! Te contactaremos en las próximas 24 horas con tu cotización personalizada.")
        setFormData({
          nombre: "",
          telefono: "",
          email: "",
          edad: "",
          retiro: "",
          ingresos: "",
          impuestos: "",
        })
        setIsSubmitting(false)
      }, 1000)
    }
  }

  const scrollToForm = () => {
    const formElement = document.getElementById("leadForm")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
    const [count, setCount] = useState(0)
    const numericTarget = Number.parseInt(target.replace(/[^\d]/g, ""))

    useEffect(() => {
      if (countersAnimated) {
        let current = 0
        const increment = numericTarget / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= numericTarget) {
            setCount(numericTarget)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, 20)

        return () => clearInterval(timer)
      }
    }, [countersAnimated, numericTarget])

    const formatCount = (num: number) => {
      if (target.includes("K") || target.includes("B")) {
        if (target.includes("B")) {
          return `$${(num / 1000).toFixed(1)}B`
        }
        return `${(num / 1000).toFixed(0)}K+`
      }
      if (target.includes("%")) {
        return `${num}%`
      }
      if (target.includes("h")) {
        return `${num}h`
      }
      return num.toLocaleString() + suffix
    }

    return (
      <span className="text-5xl font-bold bg-gradient-to-r from-[#C9A15A] to-[#2D4765] bg-clip-text text-transparent">
        {formatCount(count)}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg animate-in slide-in-from-top duration-600">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#C9A15A] to-[#2D4765] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2D4765]">SEGUROS E INVERSIONES</h1>
              <p className="text-sm text-[#727376]">Protegiendo tu futuro financiero</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#C9A15A] to-[#2D4765] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg+xmlns=%22http://www.w3.org/2000/svg%22+viewBox=%220+0+100+100%22%3E%3Cdefs%3E%3Cpattern+id=%22grain%22+patternUnits=%22userSpaceOnUse%22+width=%22100%22+height=%22100%22%3E%3Ccircle+cx=%2225%22+cy=%2225%22+r=%221%22+fill=%22rgba(255,255,255,0.05)%22/%3E%3Ccircle+cx=%2275%22+cy=%2275%22+r=%221%22+fill=%22rgba(255,255,255,0.05)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect+width=%22100%22+height=%22100%22+fill=%22url(%23grain)%22/%3E%3C/svg%3E')] animate-pulse"></div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-white space-y-6 animate-in slide-in-from-left duration-1000">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-[#C9A15A] bg-clip-text text-transparent">
                Tu vida vale más de lo que imaginas. Asegúrala hoy.
              </h1>
              <p className="text-xl lg:text-2xl opacity-90">
                Planes flexibles con base en tu presupuesto, sin exámenes médicos y con asesoría personalizada.
              </p>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[#C9A15A]">¿Por qué elegirnos?</h3>
                <ul className="space-y-3">
                  {[
                    "Protección financiera para tu familia ante cualquier imprevisto",
                    "Opciones con ahorro a mediano y largo plazo",
                    "Crecimiento Exponencial de tu ahorro",
                    "Puedes empezar desde $1,500 mensuales",
                    "Atención personalizada y humana, sin letras chiquitas",
                    "Sin compromisos: solo una cotización gratuita y sin presiones",
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 animate-in slide-in-from-left duration-600"
                      style={{ animationDelay: `${200 + index * 100}ms` }}
                    >
                      <span className="text-green-400 text-xl">✅</span>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form Card */}
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-in slide-in-from-right duration-1000">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-[#2D4765] mb-2">Obtén tu Cotización Gratuita</h2>
                  <p className="text-[#727376]">
                    Completa el formulario y recibe una propuesta personalizada en menos de 24 horas
                  </p>
                </div>

                <form id="leadForm" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nombre" className="text-[#2D4765] font-semibold">
                      Nombre completo *
                    </Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                      className={`mt-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${formErrors.nombre ? "border-red-500" : ""}`}
                      placeholder="Tu nombre completo"
                    />
                    {formErrors.nombre && <p className="text-red-500 text-sm mt-1">{formErrors.nombre}</p>}
                  </div>

                  <div>
                    <Label htmlFor="telefono" className="text-[#2D4765] font-semibold">
                      Teléfono *
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                      className={`mt-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${formErrors.telefono ? "border-red-500" : ""}`}
                      placeholder="Tu número de teléfono"
                    />
                    {formErrors.telefono && <p className="text-red-500 text-sm mt-1">{formErrors.telefono}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#2D4765] font-semibold">
                      Correo electrónico *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`mt-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${formErrors.email ? "border-red-500" : ""}`}
                      placeholder="tu@email.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <Label className="text-[#2D4765] font-semibold">Edad *</Label>
                    <Select
                      value={formData.edad}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, edad: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${formErrors.edad ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Selecciona tu rango de edad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18-25 años</SelectItem>
                        <SelectItem value="26-35">26-35 años</SelectItem>
                        <SelectItem value="36-45">36-45 años</SelectItem>
                        <SelectItem value="46-55">46-55 años</SelectItem>
                        <SelectItem value="56+">56+ años</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.edad && <p className="text-red-500 text-sm mt-1">{formErrors.edad}</p>}
                  </div>

                  <div>
                    <Label className="text-[#2D4765] font-semibold">¿Cuándo planeas retirarte? *</Label>
                    <Select
                      value={formData.retiro}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, retiro: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${formErrors.retiro ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Selecciona la edad de retiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 años</SelectItem>
                        <SelectItem value="55">55 años</SelectItem>
                        <SelectItem value="60">60 años</SelectItem>
                        <SelectItem value="65">65 años</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.retiro && <p className="text-red-500 text-sm mt-1">{formErrors.retiro}</p>}
                  </div>

                  <div>
                    <Label className="text-[#2D4765] font-semibold">¿Cuáles son tus ingresos mensuales? *</Label>
                    <Select
                      value={formData.ingresos}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, ingresos: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${formErrors.ingresos ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Selecciona tu rango de ingresos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menos-15000">Menos de $15,000</SelectItem>
                        <SelectItem value="15000-30000">$15,000 - $30,000</SelectItem>
                        <SelectItem value="30000-50000">$30,000 - $50,000</SelectItem>
                        <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                        <SelectItem value="mas-100000">Más de $100,000</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.ingresos && <p className="text-red-500 text-sm mt-1">{formErrors.ingresos}</p>}
                  </div>

                  <div>
                    <Label className="text-[#2D4765] font-semibold">¿Te interesa deducir impuestos? *</Label>
                    <Select
                      value={formData.impuestos}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, impuestos: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${formErrors.impuestos ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="no-seguro">No estoy seguro</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.impuestos && <p className="text-red-500 text-sm mt-1">{formErrors.impuestos}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#C9A15A] to-[#2D4765] hover:from-[#2D4765] hover:to-[#C9A15A] text-white font-bold py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "✅ ¡INFORMACIÓN ENVIADA!" : "🚀 OBTENER MI COTIZACIÓN GRATIS"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#2D4765] mb-16 relative">
            Beneficios Únicos para Ti
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#C9A15A] to-[#2D4765] rounded-full mt-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Protección Total",
                description:
                  "Cobertura integral que protege a tu familia ante cualquier eventualidad, brindando tranquilidad financiera cuando más la necesitas.",
              },
              {
                icon: "💰",
                title: "Crecimiento Garantizado",
                description:
                  "Tu dinero trabaja para ti con rendimientos competitivos y crecimiento exponencial a largo plazo.",
              },
              {
                icon: "⚡",
                title: "Proceso Rápido",
                description: "Sin exámenes médicos complicados. Obtén tu póliza de manera ágil y sencilla.",
              },
              {
                icon: "🎯",
                title: "Planes Flexibles",
                description: "Diseñamos el plan perfecto para tu presupuesto y necesidades específicas.",
              },
              {
                icon: "📈",
                title: "Deducciones Fiscales",
                description: "Optimiza tu situación fiscal con productos que te permiten deducir impuestos legalmente.",
              },
              {
                icon: "🤝",
                title: "Asesoría Personalizada",
                description: "Acompañamiento humano y profesional en cada paso, sin letras chiquitas ni sorpresas.",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl bg-white border-0 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C9A15A]/10 to-[#2D4765]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C9A15A] to-[#2D4765] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#2D4765] mb-4">{benefit.title}</h3>
                    <p className="text-[#727376] leading-relaxed">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2D4765] mb-16">Miles de Familias Confían en Nosotros</h2>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { target: "15000+", label: "Familias Protegidas" },
              { target: "2.5B", label: "En Coberturas" },
              { target: "98%", label: "Satisfacción" },
              { target: "24h", label: "Respuesta Promedio" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <AnimatedCounter target={stat.target} />
                </div>
                <p className="text-[#727376] font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-[#2D4765] mb-8">Trabajamos con las Mejores Aseguradoras</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {["GNP", "Prudential", "BX+", "Seguros Monterrey", "Skandia", "Quálitas", "Bupa"].map((insurer, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="font-bold text-[#2D4765]">{insurer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#C9A15A] to-[#2D4765] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg+xmlns=%22http://www.w3.org/2000/svg%22+viewBox=%220+0+100+100%22%3E%3Ccircle+cx=%2250%22+cy=%2250%22+r=%2230%22+fill=%22rgba(255,255,255,0.1)%22/%3E%3C/svg%3E')] animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">¡No Esperes Más!</h2>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Tu futuro financiero comienza hoy. Obtén tu cotización gratuita y sin compromiso.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-white text-[#2D4765] hover:bg-[#C9A15A] hover:text-white font-bold px-12 py-4 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            QUIERO MI COTIZACIÓN AHORA
          </Button>
        </div>
      </section>
    </div>
  )
}

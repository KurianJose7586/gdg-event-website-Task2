"use client"

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Code,
  Lightbulb,
  ArrowUp,
  Moon,
  Sun,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Menu,
  X,
  MessageCircle,
  Send,
  Coffee,
  Mic,
  Laptop,
  Utensils,
  Presentation,
  Award,
  Bot, // Added Bot Icon
} from "lucide-react"

// --- Dynamically import the Map component ---
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

// --- Data for sections (moved outside the component for better readability) ---

const highlightsData = [
  {
    icon: Lightbulb,
    title: "Innovation Workshops",
    description: "Hands-on workshops covering the latest in AI, cloud computing, and mobile development.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Networking Sessions",
    description: "Connect with industry professionals, fellow students, and potential collaborators.",
    color: "secondary",
  },
  {
    icon: Presentation,
    title: "Project Showcase",
    description: "Present your projects and get feedback from Google Developer Experts and mentors.",
    color: "accent",
  },
]

const scheduleData = [
  {
    time: "9:00 AM",
    title: "Registration & Welcome Coffee",
    description: "Check-in and networking breakfast",
    icon: Coffee,
  },
  {
    time: "10:00 AM",
    title: "Opening Keynote",
    description: "The Future of Development with Google Technologies",
    icon: Mic,
  },
  {
    time: "11:30 AM",
    title: "Workshop Track A",
    description: "Building with Firebase and Cloud Functions",
    icon: Laptop,
  },
  {
    time: "1:00 PM",
    title: "Lunch & Networking",
    description: "Connect with fellow developers over lunch",
    icon: Utensils,
  },
  {
    time: "2:30 PM",
    title: "Workshop Track B",
    description: "AI/ML with TensorFlow and Vertex AI",
    icon: Laptop,
  },
  {
    time: "4:00 PM",
    title: "Project Showcase",
    description: "Present your projects to the community",
    icon: Presentation,
  },
  {
    time: "5:30 PM",
    title: "Closing & Prizes",
    description: "Wrap-up and prize distribution",
    icon: Award,
  },
]

const socialLinks = [
  { icon: Twitter, color: "hover:text-blue-400", label: "Twitter", url: "#" },
  { icon: Linkedin, color: "hover:text-blue-600", label: "LinkedIn", url: "#" },
  { icon: Instagram, color: "hover:text-pink-500", label: "Instagram", url: "#" },
  { icon: Youtube, color: "hover:text-red-500", label: "YouTube", url: "#" },
]

// Parallax Dot Component
function ParallaxDot({ i }: { i: number }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 - (i * 15)]);

  return (
    <motion.div
      style={{
        y,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        backgroundColor: ["#4285F4", "#0F9D58", "#F4B400", "#DB4437"][i % 4],
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${10 + Math.random() * 5}s`,
      }}
      className="absolute w-2 h-2 rounded-full animate-float opacity-0"
    />
  );
}

export default function GDGEventPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const [easterEggCount, setEasterEggCount] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Hi, I'm the GDG Helper Bot 🤖! How can I help you today?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isBotTyping, setIsBotTyping] = useState(false) // State for typing indicator

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === "g" && easterEggCount === 0) setEasterEggCount(1)
      else if (key === "d" && easterEggCount === 1) setEasterEggCount(2)
      else if (key === "g" && easterEggCount === 2) {
        setEasterEggCount(0)
        triggerEasterEgg()
      } else {
        setEasterEggCount(0)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [easterEggCount])

  const triggerEasterEgg = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const handleChatSubmit = (e: React.FormEvent, quickMessage?: string) => {
    e.preventDefault()
    const userMessage = quickMessage || chatInput.trim()
    if (!userMessage) return

    setChatMessages((prev) => [...prev, { type: "user", message: userMessage }])
    setChatInput("")
    setIsBotTyping(true)

    setTimeout(() => {
      let botResponse = "I can help with the schedule, registration, or location. What would you like to know?"
      if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        botResponse = "Hey there! Ready for an awesome day of tech?"
      } else if (userMessage.toLowerCase().includes("schedule")) {
        botResponse = "The schedule is packed! It runs from 9 AM to 6 PM. I'll scroll you there."
        setTimeout(() => scrollToSection("schedule"), 1000)
      } else if (userMessage.toLowerCase().includes("register")) {
        botResponse = "Great! Let's get you registered. Scrolling to the form now."
        setTimeout(() => scrollToSection("register"), 1000)
      }
      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
      setIsBotTyping(false)
    }, 1500)
  }
  
  const quickActions = [
    { label: "📅 Event Schedule", message: "Tell me about the schedule" },
    { label: "📝 How do I register?", message: "How do I register?" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <ParallaxDot key={i} i={i} />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button onClick={() => scrollToSection("home")} className="flex items-center">
            {/* LOGO SIZE INCREASED HERE */}
            <Image src="/gdg-logo.png" alt="GDG Galgotias University Logo" width={350} height={70} className="h-16 w-auto object-contain" />
          </button>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection("highlights")} className="hover:text-primary transition-colors">Highlights</button>
            <button onClick={() => scrollToSection("schedule")} className="hover:text-primary transition-colors">Schedule</button>
            <button onClick={() => scrollToSection("register")} className="hover:text-primary transition-colors">Register</button>
            <button onClick={() => scrollToSection("location")} className="hover:text-primary transition-colors">Location</button>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 p-4 border-t bg-background/95">
            <div className="flex flex-col space-y-2">
              <button onClick={() => scrollToSection("about")} className="text-left py-2 hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection("highlights")} className="text-left py-2 hover:text-primary transition-colors">Highlights</button>
              <button onClick={() => scrollToSection("schedule")} className="text-left py-2 hover:text-primary transition-colors">Schedule</button>
              <button onClick={() => scrollToSection("register")} className="text-left py-2 hover:text-primary transition-colors">Register</button>
              <button onClick={() => scrollToSection("location")} className="text-left py-2 hover:text-primary transition-colors">Location</button>
            </div>
          </nav>
        )}
      </header>
      
      <main>
        <section id="home" className="relative z-10 text-center pt-32 pb-20 md:pt-40 md:pb-28 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-primary font-semibold tracking-wide mb-2">The GDG GU Presents</p>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-balance">
              <span className="bg-gradient-google text-gradient">Innovate, Build, Connect!</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join us for an incredible day of learning, networking, and building amazing projects with fellow developers.
            </p>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-10">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 md:p-4 min-w-[64px] md:min-w-[80px] shadow-lg">
                    <div className="text-2xl md:text-3xl font-bold">{value.toString().padStart(2, "0")}</div>
                  </div>
                  <div className="text-xs md:text-sm mt-2 capitalize text-muted-foreground">{unit}</div>
                </div>
              ))}
            </div>
            <Button size="lg" className="bg-gradient-google hover:opacity-90 text-white px-8 py-3 text-lg" onClick={() => scrollToSection("register")}>
              Register Now!
            </Button>
          </div>
        </section>

        <section id="about" className="relative z-10 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-google rounded-full opacity-10 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Image src="/gdg-logo-cut.png" alt="GDG Logo" width={120} height={120} className="w-28 h-28 object-contain mx-auto mb-4" />
                      <div className="flex space-x-2 justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">About <span className="text-primary">GDG GU</span><div className="w-20 h-1 bg-secondary mt-2"></div></h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Google Developer Groups (GDG) Galgotias University is a student community passionate about technology, learning, and innovation. We organize workshops, hackathons, and events to help students explore{" "}
                  <span className="font-semibold text-primary">AI</span>,{" "}
                  <span className="font-semibold text-secondary">Web</span>,{" "}
                  <span className="font-semibold text-accent">Cloud</span>, and beyond.
                </p>
                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <p className="text-lg font-semibold text-accent-foreground">"Learn. Build. Grow. Together at GDG GU!"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="highlights" className="relative z-10 py-20 md:py-28 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Event Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {highlightsData.map((item) => (
                <Card key={item.title} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-transparent hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-${item.color}/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}>
                      <item.icon className={`w-8 h-8 text-${item.color}`} />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="relative z-10 py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Event Schedule</h2>
            <div className="relative">
              <div className="absolute left-4 top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
              <div className="space-y-12">
                {scheduleData.map((item) => (
                  <div key={item.title} className="relative flex items-start">
                    <div className="absolute left-4 top-1 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="pl-12">
                      <Badge variant="secondary" className="mb-2">
                        <Clock className="w-3 h-3 mr-1.5" />{item.time}
                      </Badge>
                      <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="register" className="relative z-10 py-20 md:py-28 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Register Now</h2>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Join the GDG GU Event</CardTitle>
                <CardDescription>Fill out the form below to secure your spot!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegistration} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Enter your full name" required /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="Enter your email" required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="organization">College/Organization</Label><Input id="organization" placeholder="Enter your college" required /></div>
                  <div className="space-y-2"><Label htmlFor="interest">Interest Area</Label><Select required><SelectTrigger><SelectValue placeholder="Select your primary interest" /></SelectTrigger><SelectContent><SelectItem value="web">Web Development</SelectItem><SelectItem value="mobile">Mobile Development</SelectItem><SelectItem value="ai">AI/Machine Learning</SelectItem><SelectItem value="cloud">Cloud Computing</SelectItem></SelectContent></Select></div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-google hover:opacity-90 text-white">Register for Event</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="location" className="relative z-10 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Event Location</h2>
            <Card>
              <CardContent className="p-0 grid md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Galgotias University</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" /><span>Plot No. 2, Sector 17-A, Yamuna Expressway, Greater Noida, Uttar Pradesh 203201</span></div>
                    <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-secondary flex-shrink-0" /><span>March 15, 2024</span></div>
                    <div className="flex items-center space-x-3"><Clock className="w-5 h-5 text-accent flex-shrink-0" /><span>9:00 AM - 6:00 PM</span></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Map />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="social" className="relative z-10 py-20 md:py-28 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Connected</h2>
            <p className="text-lg text-muted-foreground mb-8">Follow us for updates and join our community!</p>
            <div className="flex justify-center space-x-2">
              {socialLinks.map(({ icon: Icon, color, label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className={`rounded-full w-12 h-12 ${color} transition-colors duration-300`}>
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-12 px-4 border-t bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
              <Image src="/gdg-logo.png" alt="GDG Galgotias University Logo" width={300} height={60} className="h-16 w-auto object-contain" />
          </div>
          <p className="text-muted-foreground mb-4">Google Developer Group - Galgotias University</p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GDG GU. All rights reserved. | Made with ❤️ for the developer community</p>
          <p className="text-xs text-muted-foreground mt-2">Tip: Type "gdg" for a surprise! 🎉</p>
        </div>
      </footer>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (<div key={i} className="absolute w-2 h-2 animate-confetti" style={{left: `${Math.random() * 100}%`, backgroundColor: ["#4285F4", "#0F9D58", "#F4B400", "#DB4437"][i % 4], animationDelay: `${Math.random() * 3}s`}}/>))}
        </div>
      )}

      {showBackToTop && (
        <Button onClick={scrollToTop} className="fixed bottom-24 right-8 z-40 rounded-full shadow-lg" size="icon">
          <ArrowUp className="w-5 h-5" />
          <span className="sr-only">Back to top</span>
        </Button>
      )}

      <div className="fixed bottom-8 right-8 z-50">
        {chatOpen && (
          <Card className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] shadow-2xl border bg-background/95 backdrop-blur-md flex flex-col rounded-xl transition-all duration-300">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-3">
                  <div className="relative">
                    <Bot className="w-6 h-6 text-primary" />
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
                  </div>
                  GDG Helper Bot
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="h-8 w-8 rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex items-end gap-2.5 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.type === 'bot' && <Bot className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === "user" ? "bg-primary text-primary-foreground rounded-br-lg" : "bg-muted text-foreground rounded-bl-lg"}`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                {isBotTyping && (
                  <div className="flex items-end gap-2.5 justify-start">
                    <Bot className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    <div className="p-3 rounded-2xl bg-muted rounded-bl-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t p-3 bg-background/50">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {quickActions.map((action) => (
                    <Button key={action.label} variant="outline" size="sm" onClick={(e) => handleChatSubmit(e, action.message)} className="text-xs h-auto py-1.5 justify-start text-left whitespace-normal">
                      {action.label}
                    </Button>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
                  <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask anything..." className="text-sm flex-1 rounded-full px-4" />
                  <Button type="submit" size="icon" className="w-9 h-9 rounded-full" disabled={!chatInput.trim() || isBotTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <div className="text-center text-xs text-muted-foreground/80 pt-2">
                  Powered by{" "}
                  <a href="https://twinly-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    TwinlyAI
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Button onClick={() => setChatOpen(!chatOpen)} className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg animate-chat-pulse hover:animate-none" title="Ask me anything!">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Copy, ChevronDown, Pickaxe, Shield, Sword, Coins, ArrowRight, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Home() {
  const [copyText, setCopyText] = useState("Copy")
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("mining")
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated background with mining elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mining particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      rotation: number
      rotationSpeed: number
      type: "ore" | "pixel" | "spark"
    }[] = []

    // Create initial particles
    const createParticles = () => {
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 20000), 50)

      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() < 0.3 ? "ore" : Math.random() < 0.7 ? "pixel" : "spark"

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: type === "ore" ? Math.random() * 8 + 4 : type === "pixel" ? 4 : Math.random() * 2 + 1,
          color:
            type === "ore"
              ? ["#f97316", "#ea580c", "#c2410c", "#9a3412"][Math.floor(Math.random() * 4)]
              : type === "pixel"
                ? ["#713f12", "#854d0e", "#a16207", "#ca8a04"][Math.floor(Math.random() * 4)]
                : ["#fbbf24", "#f59e0b", "#fde68a"][Math.floor(Math.random() * 3)],
          speed: (Math.random() * 0.5 + 0.2) * (type === "spark" ? 2 : 1),
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type,
        })
      }
    }

    createParticles()

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(101, 67, 33, 0.1)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += 25) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += 25) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.save()

        // Move particle
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed
        particle.rotation += particle.rotationSpeed

        // Wrap around screen
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size

        // Draw based on type
        if (particle.type === "ore") {
          // Draw ore chunk
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)

          ctx.fillStyle = particle.color
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)

          // Add pixel details
          ctx.fillStyle = "rgba(0,0,0,0.3)"
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size / 2, particle.size / 2)
          ctx.fillRect(0, 0, particle.size / 2, particle.size / 2)

          // Add highlight
          ctx.fillStyle = "rgba(255,255,255,0.3)"
          ctx.fillRect(-particle.size / 4, -particle.size / 4, particle.size / 4, particle.size / 4)
        } else if (particle.type === "pixel") {
          // Draw pixel
          ctx.fillStyle = particle.color
          ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size)
        } else {
          // Draw spark
          ctx.fillStyle = particle.color
          ctx.globalAlpha = Math.random() * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText("COMING SOON!")
    setCopyText("Copied!")
    setTimeout(() => setCopyText("Copy"), 2000)
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-black relative overflow-hidden">
      {/* Animated background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Loading overlay */}
      <div
        className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-1000 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative w-32 h-32 animate-pulse">
          <Image src="/images/forge-logo.png" alt="FORGE Logo" fill className="object-contain" />
        </div>
      </div>

      <Navbar />

      {/* Hero Section - Two Column Layout */}
      <div
        ref={heroRef}
        className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative z-10 min-h-screen"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 text-left md:pr-8">
            <div className="relative w-40 h-40 mx-auto md:mx-0 mb-8 animate-float">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
              <Image src="/images/forge-logo.png" alt="FORGE Logo" fill className="object-contain" priority />
            </div>

            <h1 className="text-4xl md:text-6xl text-gray-300 hero-text glitch-text">
              <span className="block animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <span className="text-orange-500 glow-text">FORGE</span>
              </span>
              <span className="block animate-fade-in" style={{ animationDelay: "0.6s" }}>
                Your
              </span>
              <span className="block animate-fade-in" style={{ animationDelay: "0.9s" }}>
                Digital Mining
              </span>
              <span className="block animate-fade-in" style={{ animationDelay: "1.2s" }}>
                Empire
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-amber-200 mt-8 mb-12 animate-fade-in max-w-xl"
              style={{ animationDelay: "1.3s" }}
            >
              A tokenized Web3 world built on Solana. Mine with $FORGE.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-2xl overflow-hidden">
              {/* Enhanced multi-layered glow effect - much larger than the image */}
              <div className="absolute -inset-24 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent rounded-3xl blur-3xl animate-pulse-slow"></div>
              <div className="absolute -inset-16 bg-gradient-radial from-orange-500/25 to-transparent rounded-3xl blur-2xl"></div>
              <div className="absolute -inset-8 bg-gradient-to-br from-orange-500/30 via-orange-500/15 to-transparent rounded-3xl blur-xl"></div>

              <div className="relative rounded-lg overflow-hidden shadow-[0_0_35px_rgba(249,115,22,0.6)]">
                <Image
                  src="/images/enhanced2.png"
                  alt="FORGE Game Interface"
                  width={1000}
                  height={750}
                  className="w-full h-auto object-cover z-10 relative"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Contract Address */}
        <div className="w-full flex flex-col items-center justify-center my-8">
          <div className="cyber-terminal-inline mx-auto animate-fade-in" style={{ animationDelay: "1.5s" }}>
            <div className="flex items-center justify-center gap-4 px-6 py-3 bg-black/70 border-2 border-amber-800 rounded-sm">
              <span className="text-amber-200 text-sm">$FORGE Contract:</span>
              <span className="text-orange-400 text-sm font-mono">COMING SOON!</span>
              <button onClick={handleCopy} className="text-xs text-amber-200 hover:text-orange-400 flex items-center">
                <Copy size={14} className="mr-1" /> {copyText}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in mt-6"
            style={{ animationDelay: "1.8s" }}
          >
            <Link href="https://x.com/forgeonsolana" target="_blank" className="cyber-button">
              <span className="cyber-button-text">Follow on X</span>
              <span className="cyber-button-glitch"></span>
            </Link>

            <Link href="/map" className="cyber-button cyber-button-secondary">
              <span className="cyber-button-text">Enter the Mines</span>
              <span className="cyber-button-glitch"></span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit animate-bounce">
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="text-amber-500 hover:text-orange-400 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 animate-float-slow pointer-events-none opacity-30">
          <Image src="/images/forge-logo.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-1/4 right-10 w-12 h-12 animate-float-slow-reverse pointer-events-none opacity-20">
          <Image src="/images/forge-logo.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* About Section - New Card Layout */}
      <div ref={aboutRef} className="py-16 px-4 relative z-10" id="about">
        <div className="container mx-auto max-w-6xl">
          <div className="cyber-terminal mb-12">
            <div className="cyber-terminal-header">
              <span className="cyber-terminal-title">SYSTEM://FORGE/about.exe</span>
              <div className="cyber-terminal-controls">
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
              </div>
            </div>
            <div className="cyber-terminal-content">
              <h2 className="section-title animate-fade-in" style={{ animationDelay: "0.2s" }}>
                What is <span className="text-orange-500 glow-text">FORGE</span>?
              </h2>

              <p
                className="section-text text-center max-w-3xl mx-auto mb-12 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                A strategic Web3 mining game where your tokens represent your mining empire. Stake resources, raid
                competitors, and expand your operations in a persistent digital world powered by Solana blockchain
                technology.
              </p>
            </div>
          </div>

          {/* Feature tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("mining")}
                className={`tab-button ${activeTab === "mining" ? "tab-active" : ""}`}
              >
                <Pickaxe size={16} className="mr-2" />
                Mining
              </button>
              <button
                onClick={() => setActiveTab("raiding")}
                className={`tab-button ${activeTab === "raiding" ? "tab-active" : ""}`}
              >
                <Sword size={16} className="mr-2" />
                Raiding
              </button>
              <button
                onClick={() => setActiveTab("economy")}
                className={`tab-button ${activeTab === "economy" ? "tab-active" : ""}`}
              >
                <Coins size={16} className="mr-2" />
                Economy
              </button>
              <button
                onClick={() => setActiveTab("defense")}
                className={`tab-button ${activeTab === "defense" ? "tab-active" : ""}`}
              >
                <Shield size={16} className="mr-2" />
                Defense
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "mining" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="cyber-panel hover-scale col-span-1 md:col-span-2">
                    <h3 className="section-subtitle">Mining Operations</h3>
                    <p className="section-text">
                      Establish mining operations across the map to extract valuable resources from different regions.
                      Stake $FORGE to claim territories and collect resources each round.
                    </p>
                    <div className="world-map-container hover-glow h-48 md:h-64">
                      <Image
                        src="/images/map1.png"
                        alt="FORGE World Map"
                        width={800}
                        height={500}
                        className="world-map-image"
                        priority
                      />
                      <div className="world-map-overlay"></div>

                      {/* Animated mine markers */}
                      <div className="mine-marker mine-marker-orange" style={{ top: "20%", left: "30%" }}></div>
                      <div className="mine-marker mine-marker-green" style={{ top: "40%", left: "60%" }}></div>
                      <div className="mine-marker mine-marker-purple" style={{ top: "70%", left: "25%" }}></div>
                      <div className="mine-marker mine-marker-blue" style={{ top: "35%", left: "75%" }}></div>
                    </div>
                  </div>
                  <div className="cyber-panel hover-scale">
                    <h3 className="section-subtitle">Mining Benefits</h3>
                    <ul className="feature-list">
                      <li className="feature-list-item">Passive resource generation</li>
                      <li className="feature-list-item">Territory control and expansion</li>
                      <li className="feature-list-item">Resource diversity based on location</li>
                      <li className="feature-list-item">Upgrade paths for efficiency</li>
                      <li className="feature-list-item">Strategic positioning advantages</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "raiding" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="cyber-panel hover-scale">
                    <h3 className="section-subtitle">Raiding Benefits</h3>
                    <ul className="feature-list">
                      <li className="feature-list-item">Steal unclaimed resources</li>
                      <li className="feature-list-item">Weaken competitor operations</li>
                      <li className="feature-list-item">Form strategic alliances</li>
                      <li className="feature-list-item">Earn raiding reputation</li>
                      <li className="feature-list-item">Unlock special equipment</li>
                    </ul>
                  </div>
                  <div className="cyber-panel hover-scale col-span-1 md:col-span-2">
                    <h3 className="section-subtitle">Raiding System</h3>
                    <p className="section-text">
                      Launch strategic raids against other players' mines to steal unclaimed resources. Plan attacks
                      based on intelligence and form alliances for protection against common enemies.
                    </p>
                    <div className="raid-visualization">
                      <div className="raid-progress">
                        <div className="raid-icon">⚔️</div>
                        <div className="raid-bar"></div>
                        <div className="raid-target">🏔️</div>
                      </div>
                      <div className="raid-stats">
                        <div className="raid-stat">
                          <span className="raid-stat-label">Success Rate</span>
                          <span className="raid-stat-value">68%</span>
                        </div>
                        <div className="raid-stat">
                          <span className="raid-stat-label">Potential Yield</span>
                          <span className="raid-stat-value">2,450 units</span>
                        </div>
                        <div className="raid-stat">
                          <span className="raid-stat-label">Risk Level</span>
                          <span className="raid-stat-value">Medium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "economy" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="cyber-panel hover-scale col-span-1 md:col-span-2">
                    <h3 className="section-subtitle">Resource Market</h3>
                    <p className="section-text">
                      Trade mined resources with other players in the open marketplace. Set prices for resources and
                      convert resources to $FORGE tokens through the decentralized exchange.
                    </p>
                    <div className="market-visualization">
                      <div className="market-chart">
                        <div className="market-chart-grid"></div>
                        <div className="market-chart-line iron"></div>
                        <div className="market-chart-line copper"></div>
                        <div className="market-chart-line gold"></div>
                        <div className="market-chart-legend">
                          <div className="market-legend-item">
                            <div className="market-legend-color iron"></div>
                            <span>Iron</span>
                          </div>
                          <div className="market-legend-item">
                            <div className="market-legend-color copper"></div>
                            <span>Copper</span>
                          </div>
                          <div className="market-legend-item">
                            <div className="market-legend-color gold"></div>
                            <span>Gold</span>
                          </div>
                        </div>
                      </div>
                      <div className="market-stats">
                        <div className="market-stat">
                          <span className="market-stat-label">Iron Ore</span>
                          <span className="market-stat-value">↑ 12.4 $FORGE</span>
                        </div>
                        <div className="market-stat">
                          <span className="market-stat-label">Copper</span>
                          <span className="market-stat-value">↓ 8.2 $FORGE</span>
                        </div>
                        <div className="market-stat">
                          <span className="market-stat-label">Gold</span>
                          <span className="market-stat-value">↑ 45.6 $FORGE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cyber-panel hover-scale">
                    <h3 className="section-subtitle">Economy Features</h3>
                    <ul className="feature-list">
                      <li className="feature-list-item">Resource trading marketplace</li>
                      <li className="feature-list-item">Price fluctuations based on supply</li>
                      <li className="feature-list-item">Resource to $FORGE conversion</li>
                      <li className="feature-list-item">Trade contracts and futures</li>
                      <li className="feature-list-item">Resource crafting and refinement</li>
                    </ul>
                    <div className="mt-4 p-3 bg-amber-900/20 border border-amber-800/50">
                      <h4 className="text-orange-400 text-sm mb-2">Market Tip</h4>
                      <p className="text-xs text-amber-200/80">
                        Monitor price trends to buy low and sell high. Rare resources from contested territories fetch
                        premium prices. Consider futures contracts for stable income.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "defense" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="cyber-panel hover-scale">
                    <h3 className="section-subtitle">Mining Guild Benefits</h3>
                    <ul className="feature-list">
                      <li className="feature-list-item">Defensive structures and traps</li>
                      <li className="feature-list-item">Alliance protection networks</li>
                      <li className="feature-list-item">Early warning systems</li>
                      <li className="feature-list-item">Resource hiding mechanisms</li>
                      <li className="feature-list-item">Counter-raid capabilities</li>
                    </ul>
                    <div className="mt-4 p-3 bg-amber-900/20 border border-amber-800/50">
                      <h4 className="text-orange-400 text-sm mb-2">Mining Guild Guide</h4>
                      <p className="text-xs text-amber-200/80">
                        Form alliances with nearby miners to create a defensive perimeter. Coordinate resource
                        collection times to minimize exposure to raiders. Invest in shared defensive infrastructure for
                        maximum efficiency.
                      </p>
                    </div>
                  </div>
                  <div className="cyber-panel hover-scale col-span-1 md:col-span-2">
                    <h3 className="section-subtitle">Mining Guilds</h3>
                    <p className="section-text">
                      Form mining guilds with other players to pool resources and coordinate strategies. Pool resources
                      for operations and share in mining rewards while providing mutual defense.
                    </p>
                    <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/50 text-center">
                      <p className="text-amber-200 text-sm">
                        Form mining guilds with other players to create defensive networks and share resources.
                        Coordinate strategies to maximize efficiency and protect your mining operations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="feature-box hover-scale">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">No Gas</div>
              <div className="feature-text">Client-side simulation means zero gas fees for gameplay</div>
            </div>

            <div className="feature-box hover-scale">
              <div className="feature-icon">🔒</div>
              <div className="feature-title">True Ownership</div>
              <div className="feature-text">Your $FORGE tokens represent real on-chain assets</div>
            </div>

            <div className="feature-box hover-scale">
              <div className="feature-icon">🧠</div>
              <div className="feature-title">Strategy Meets On-Chain</div>
              <div className="feature-text">Tactical gameplay with blockchain permanence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Utility Section - Hexagonal Layout */}
      <div
        ref={tokenRef}
        className="py-16 px-4 relative z-10"
        id="token"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(180, 83, 9, 0.2) 0%, transparent 70%)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="cyber-terminal mb-12">
            <div className="cyber-terminal-header">
              <span className="cyber-terminal-title">SYSTEM://FORGE/token.exe</span>
              <div className="cyber-terminal-controls">
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
              </div>
            </div>
            <div className="cyber-terminal-content">
              <h2 className="section-title animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <span className="text-orange-500 glow-text">$FORGE</span> Token Utility
              </h2>

              <p
                className="section-text text-center max-w-3xl mx-auto mb-8 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                The $FORGE token is the lifeblood of the FORGE ecosystem, powering every aspect of gameplay and
                governance.
              </p>
            </div>
          </div>

          {/* Token visualization - Center */}
          <div className="token-visualization mb-16">
            <div className="token-circle">
              <div className="token-inner">
                <Image src="/images/forge-logo.png" alt="FORGE Token" width={80} height={80} className="token-image" />
              </div>
              <div className="token-orbit">
                <div className="token-satellite"></div>
                <div className="token-satellite"></div>
                <div className="token-satellite"></div>
              </div>
            </div>
          </div>

          {/* Hexagonal grid layout */}
          <div className="hex-grid">
            <div className="hex-row">
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">⛏️</div>
                  <div className="token-utility-title">Mining</div>
                  <div className="token-utility-subtitle">Resource Power</div>
                  <div className="token-utility-text">
                    Your $FORGE tokens represent mining strength. More tokens = higher yields.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">🏔️</div>
                  <div className="token-utility-title">Territory</div>
                  <div className="token-utility-subtitle">Mine Size</div>
                  <div className="token-utility-text">
                    Tokens determine how many mines you can claim and defend in the world.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
            </div>
            <div className="hex-row">
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">🏛️</div>
                  <div className="token-utility-title">Governance</div>
                  <div className="token-utility-subtitle">Voting Rights</div>
                  <div className="token-utility-text">
                    Shape the future of FORGE by voting on game mechanics and features.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">🔄</div>
                  <div className="token-utility-title">Rounds</div>
                  <div className="token-utility-subtitle">Seasons of Mining</div>
                  <div className="token-utility-text">
                    Participate in time-limited mining seasons with unique rewards.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
            </div>
            <div className="hex-row">
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">🛡️</div>
                  <div className="token-utility-title">Defense</div>
                  <div className="token-utility-subtitle">Protection Power</div>
                  <div className="token-utility-text">
                    Stake tokens to strengthen your mine's defenses against raiders.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
              <div className="hex-item">
                <div className="token-utility-box hover-scale">
                  <div className="token-utility-icon">🔨</div>
                  <div className="token-utility-title">Crafting</div>
                  <div className="token-utility-subtitle">Equipment Creation</div>
                  <div className="token-utility-text">
                    Use tokens to craft special equipment and upgrades for your mines.
                  </div>
                  <div className="token-utility-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Features Section - Timeline Layout */}
      <div ref={featuresRef} className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="cyber-terminal mb-12">
            <div className="cyber-terminal-header">
              <span className="cyber-terminal-title">SYSTEM://FORGE/roadmap.exe</span>
              <div className="cyber-terminal-controls">
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
                <span className="cyber-terminal-control"></span>
              </div>
            </div>
            <div className="cyber-terminal-content">
              <h2 className="section-title animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Development Roadmap
              </h2>
            </div>
          </div>

          {/* Timeline layout */}
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content cyber-panel hover-scale">
                <div className="timeline-date">Q2 2025</div>
                <h3 className="section-subtitle">Genesis Launch</h3>
                <p className="section-text">
                  Initial game release with basic mining and staking mechanics. Players can claim mines, stake tokens,
                  and begin building their mining empire.
                </p>
                <div className="timeline-features">
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Basic mining mechanics</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Token staking system</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>World map exploration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content cyber-panel hover-scale">
                <div className="timeline-date">Q3 2025</div>
                <h3 className="section-subtitle">PvP Update</h3>
                <p className="section-text">
                  Introduction of raiding mechanics and defensive upgrades. Players can attack other mines and defend
                  their own with strategic upgrades.
                </p>
                <div className="timeline-features">
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Raiding system</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Defensive structures</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Alliance formation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content cyber-panel hover-scale">
                <div className="timeline-date">Q4 2025</div>
                <h3 className="section-subtitle">Marketplace</h3>
                <p className="section-text">
                  On-chain marketplace for trading resources and equipment. Players can buy, sell, and trade resources
                  with other players.
                </p>
                <div className="timeline-features">
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Resource trading</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Equipment marketplace</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Price discovery mechanisms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content cyber-panel hover-scale">
                <div className="timeline-date">Q1 2026</div>
                <h3 className="section-subtitle">Guilds & Alliances</h3>
                <p className="section-text">
                  Cooperative gameplay with shared resources and territory control. Form guilds with other players for
                  mutual benefits.
                </p>
                <div className="timeline-features">
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Guild formation</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Shared resource pools</span>
                  </div>
                  <div className="timeline-feature">
                    <ChevronRight size={16} className="text-orange-500" />
                    <span>Territory wars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/map" className="cyber-button-large">
              <span className="cyber-button-text">Enter the Mines</span>
              <span className="cyber-button-glitch"></span>
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-amber-800/50 py-6 px-6 relative z-10 bg-gradient-to-b from-transparent to-amber-950/30">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 animate-pulse-slow">
              <Image src="/images/forge-logo.png" alt="FORGE Logo" fill className="object-contain" />
            </div>
            <span className="text-orange-500 font-pixel text-sm tracking-wider glow-text-sm">FORGE</span>
          </div>
          <div className="flex gap-8">
            <Link href="/#about" className="text-amber-200 hover:text-orange-400 text-sm">
              About
            </Link>
            <Link href="/#token" className="text-amber-200 hover:text-orange-400 text-sm">
              Token
            </Link>
            <Link href="/map" className="text-amber-200 hover:text-orange-400 text-sm">
              Map
            </Link>
            <Link href="/colosseum" className="text-amber-200 hover:text-orange-400 text-sm">
              Colosseum
            </Link>
            <Link href="https://x.com/forgeonsolana" className="text-amber-200 hover:text-orange-400 text-sm">
              Follow
            </Link>
          </div>
          <p className="text-amber-500/70 text-xs">© 2025 FORGE. All rights reserved. Built on Solana.</p>
        </div>
      </footer>
    </main>
  )
}

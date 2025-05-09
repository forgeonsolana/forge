import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { Pickaxe, Coins, Shield, Sword } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 pb-16 px-4 container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl text-orange-500 mb-8">About FORGE</h1>

        <div className="space-y-8">
          <section className="bg-black/60 border border-gray-800 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-24 h-24 relative">
                <Image src="/images/new-logo.png" alt="FORGE Logo" fill className="object-contain" />
              </div>
              <h2 className="text-2xl text-amber-200">What is FORGE?</h2>
            </div>
            <p className="text-gray-300 mb-4">
              FORGE is a Web3 mining simulation game built on the Solana blockchain. Players stake $FORGE tokens to
              claim and operate mines, extract resources, and build their mining empire.
            </p>
            <p className="text-gray-300">
              The game combines strategy, resource management, and PvP elements in a fully on-chain experience where
              your decisions have real economic impact.
            </p>
          </section>

          <section className="bg-black/60 border border-gray-800 p-6">
            <h2 className="text-2xl text-amber-200 mb-4">Game Mechanics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Pickaxe className="text-orange-500" size={20} />
                  <h3 className="text-xl text-amber-200">Mining</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Stake $FORGE tokens to claim mines and passively generate resources over time. Different mines yield
                  different resource types and quantities.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Sword className="text-orange-500" size={20} />
                  <h3 className="text-xl text-amber-200">Raiding</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Attack other players' mines to steal a percentage of their unclaimed resources. Successful raids
                  require strategy and timing.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-orange-500" size={20} />
                  <h3 className="text-xl text-amber-200">Defense</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Upgrade your mines with defensive structures to protect against raiders. Claim your resources
                  regularly to minimize potential losses.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="text-orange-500" size={20} />
                  <h3 className="text-xl text-amber-200">Economy</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Trade resources on the marketplace, craft items, and earn $FORGE tokens through gameplay. All economic
                  activity happens on-chain.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-black/60 border border-gray-800 p-6">
            <h2 className="text-2xl text-amber-200 mb-4">Roadmap</h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 text-orange-400 font-bold">Q2 2025</div>
                <div className="flex-1">
                  <h3 className="text-amber-200 mb-1">Genesis Launch</h3>
                  <p className="text-gray-300 text-sm">Initial game release with basic mining and staking mechanics.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-24 text-orange-400 font-bold">Q3 2025</div>
                <div className="flex-1">
                  <h3 className="text-amber-200 mb-1">PvP Update</h3>
                  <p className="text-gray-300 text-sm">Introduction of raiding mechanics and defensive upgrades.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-24 text-orange-400 font-bold">Q4 2025</div>
                <div className="flex-1">
                  <h3 className="text-amber-200 mb-1">Marketplace</h3>
                  <p className="text-gray-300 text-sm">On-chain marketplace for trading resources and equipment.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-24 text-orange-400 font-bold">Q1 2026</div>
                <div className="flex-1">
                  <h3 className="text-amber-200 mb-1">Guilds & Alliances</h3>
                  <p className="text-gray-300 text-sm">
                    Cooperative gameplay with shared resources and territory control.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link
              href="/map"
              className="inline-block px-8 py-3 bg-orange-600 text-black border-2 border-orange-400 hover:bg-orange-500 transition-colors"
            >
              Enter the Mines
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-800 py-4 px-6 text-center text-gray-500 text-xs mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/images/new-logo.png" alt="FORGE Logo" fill className="object-contain" />
            </div>
            <span className="text-orange-500 font-pixel text-sm tracking-wider">FORGE</span>
          </div>
          <p className="text-amber-500/70 text-xs">© 2025 FORGE. All rights reserved. Built on Solana.</p>
          <a
            href="https://x.com/forgeonsolana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Follow us on X
          </a>
        </div>
      </footer>
    </main>
  )
}

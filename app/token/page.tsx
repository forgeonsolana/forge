import Navbar from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { Copy } from "lucide-react"

export default function TokenPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 pb-16 px-4 container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl text-orange-500 mb-8">$FORGE Token</h1>

        <div className="space-y-8">
          <section className="bg-black/60 border border-gray-800 p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/images/new-logo.png"
                  alt="FORGE Token"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl text-amber-200 mb-4">Token Details</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Token Name:</span>
                    <span className="text-orange-400">FORGE</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Token Symbol:</span>
                    <span className="text-orange-400">$FORGE</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Blockchain:</span>
                    <span className="text-orange-400">Solana</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Total Supply:</span>
                    <span className="text-orange-400">100,000,000</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Contract:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400 text-xs">FDDS$212Ro9uzS46c40L2JRFQC23:B1:pump</span>
                      <button className="text-xs text-green-400 hover:text-green-300">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black/60 border border-gray-800 p-6">
            <h2 className="text-2xl text-amber-200 mb-4">Token Utility</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-800 p-4">
                <h3 className="text-xl text-amber-200 mb-2">Mining Power</h3>
                <p className="text-gray-300 text-sm">
                  Stake $FORGE tokens to claim mines and increase your resource production rate. More tokens staked
                  means higher yields.
                </p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="text-xl text-amber-200 mb-2">PvP Entry</h3>
                <p className="text-gray-300 text-sm">
                  $FORGE tokens are required to initiate raids against other players' mines. Higher-value raids require
                  more tokens.
                </p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="text-xl text-amber-200 mb-2">Upgrades</h3>
                <p className="text-gray-300 text-sm">
                  Spend $FORGE to upgrade your mining operations, improving efficiency, defense, or special abilities.
                </p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="text-xl text-amber-200 mb-2">Governance</h3>
                <p className="text-gray-300 text-sm">
                  $FORGE holders can vote on game development decisions, economic parameters, and special events.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-black/60 border border-gray-800 p-6">
            <h2 className="text-2xl text-amber-200 mb-4">Tokenomics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-gray-800 p-4 text-center">
                <div className="text-3xl text-orange-500 mb-2">40%</div>
                <h3 className="text-amber-200 mb-1">Play-to-Earn</h3>
                <p className="text-gray-300 text-xs">Allocated for in-game rewards and mining yields</p>
              </div>

              <div className="border border-gray-800 p-4 text-center">
                <div className="text-3xl text-orange-500 mb-2">30%</div>
                <h3 className="text-amber-200 mb-1">Treasury</h3>
                <p className="text-gray-300 text-xs">Reserved for development and ecosystem growth</p>
              </div>

              <div className="border border-gray-800 p-4 text-center">
                <div className="text-3xl text-orange-500 mb-2">30%</div>
                <h3 className="text-amber-200 mb-1">Initial Distribution</h3>
                <p className="text-gray-300 text-xs">Public sale, team, and early investors</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              The $FORGE token features a deflationary mechanism where a percentage of tokens used for upgrades and
              raids are burned, reducing the total supply over time.
            </p>
          </section>

          <div className="text-center">
            <Link
              href="/map"
              className="inline-block px-8 py-3 bg-orange-600 text-black border-2 border-orange-400 hover:bg-orange-500 transition-colors"
            >
              Start Mining
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-amber-800/50 py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/images/new-logo.png" alt="FORGE Logo" fill className="object-contain" />
            </div>
            <span className="text-orange-500 font-pixel text-sm tracking-wider">FORGE</span>
          </div>
          <p className="text-amber-500/70 text-xs">© 2025 FORGE. All rights reserved. Built on Solana.</p>
          {/* Example Twitter link update: Replace with actual link if present */}
          {/* <Link href="https://x.com/forgeonsolana" className="text-amber-500/70 text-xs">Follow us on X</Link> */}
        </div>
      </footer>
    </main>
  )
}

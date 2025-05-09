"use client"

import { useState } from "react"
import { Coins, Pickaxe, Shield, Sword } from "lucide-react"

export default function GameStats() {
  const [stats] = useState({
    round: 2,
    minesOwned: 3,
    resourcesCollected: 14000,
    forgeBalance: 5200,
    raidWins: 4,
    raidLosses: 1,
  })

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t-2 border-amber-800 z-10 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center">
          <span className="text-amber-200 mr-2">Round:</span>
          <span className="text-green-400">{stats.round}</span>
        </div>

        <div className="flex items-center">
          <Pickaxe size={16} className="text-amber-500 mr-2" />
          <span className="text-amber-200 mr-2">Mines Owned:</span>
          <span className="text-green-400">{stats.minesOwned}</span>
        </div>

        <div className="flex items-center">
          <Coins size={16} className="text-amber-500 mr-2" />
          <span className="text-amber-200 mr-2">Resources:</span>
          <span className="text-green-400">{stats.resourcesCollected.toLocaleString()} units</span>
        </div>

        <div className="flex items-center">
          <span className="text-amber-500 mr-1">$</span>
          <span className="text-amber-200 mr-2">FORGE Balance:</span>
          <span className="text-green-400">{stats.forgeBalance.toLocaleString()}</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Sword size={16} className="text-green-500 mr-1" />
            <span className="text-amber-200 mr-1">Wins:</span>
            <span className="text-green-400">{stats.raidWins}</span>
          </div>
          <div className="flex items-center">
            <Shield size={16} className="text-red-500 mr-1" />
            <span className="text-amber-200 mr-1">Losses:</span>
            <span className="text-red-400">{stats.raidLosses}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

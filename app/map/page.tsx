"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Plus,
  RefreshCw,
  Shield,
  Pickaxe,
  Sword,
  Clock,
  AlertTriangle,
  Award,
} from "lucide-react"
import Navbar from "@/components/navbar"
import CreateMineModal from "@/components/create-mine-modal"

interface MineZone {
  id: string
  name: string
  type: "cyan" | "gray" | "green" | "purple"
  staked: number
  top: number
  left: number
  width: number
  height: number
  owned?: boolean
  selected?: boolean
}

interface ActivityLog {
  id: string
  type: "mine" | "raid" | "upgrade" | "reward" | "alert" | "shield"
  message: string
  time: string
}

export default function MapPage() {
  const [scale, setScale] = useState(1.2)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)
  const [selectedMine, setSelectedMine] = useState<MineZone | null>(null)
  const [gameStats, setGameStats] = useState({
    round: 1,
    battles: 0,
    mines: 5,
    address: "FORGE4x...9f3z",
    balance: 5000,
    ownedMines: 1,
    totalStaked: 1800,
  })
  const [mineZones, setMineZones] = useState<MineZone[]>([
    {
      id: "mine1",
      name: "Ember Crater",
      type: "cyan",
      staked: 3400,
      top: 320,
      left: 480,
      width: 100,
      height: 70,
      owned: true,
    },
    {
      id: "mine2",
      name: "Stone Pit",
      type: "gray",
      staked: 900,
      top: 550,
      left: 350,
      width: 80,
      height: 80,
    },
    {
      id: "mine3",
      name: "Verdant Ridge",
      type: "green",
      staked: 2100,
      top: 250,
      left: 700,
      width: 120,
      height: 70,
    },
    {
      id: "mine4",
      name: "Shadow Mine",
      type: "purple",
      staked: 1600,
      top: 450,
      left: 650,
      width: 90,
      height: 60,
    },
    {
      id: "mine5",
      name: "Golden Quarry",
      type: "cyan",
      staked: 5200,
      top: 380,
      left: 850,
      width: 110,
      height: 80,
    },
  ])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "log1",
      type: "mine",
      message: "Collected 250 resources from Ember Crater",
      time: "2 min ago",
    },
    {
      id: "log2",
      type: "upgrade",
      message: "Upgraded mining efficiency at Ember Crater",
      time: "15 min ago",
    },
    {
      id: "log3",
      type: "alert",
      message: "Raid detected on Ember Crater",
      time: "30 min ago",
    },
    {
      id: "log4",
      type: "raid",
      message: "Successfully defended Ember Crater from raid",
      time: "32 min ago",
    },
    {
      id: "log5",
      type: "reward",
      message: "Received 120 $FORGE from mining operations",
      time: "1 hour ago",
    },
  ])
  const [resources, setResources] = useState({
    ironOre: 0,
    copper: 0,
    gold: 0,
  })

  const mapRef = useRef<HTMLDivElement>(null)
  const [placingMine, setPlacingMine] = useState(false)
  const [newMine, setNewMine] = useState<Omit<MineZone, "top" | "left" | "width" | "height"> | null>(null)
  const [tempMinePosition, setTempMinePosition] = useState({ top: 0, left: 0 })
  const [simulationMode, setSimulationMode] = useState(true)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (placingMine) {
      // Handle mine placement
      const mapRect = mapRef.current?.getBoundingClientRect()
      if (mapRect) {
        const x = (e.clientX - mapRect.left) / scale
        const y = (e.clientY - mapRect.top) / scale

        if (newMine) {
          const mineWidth = 100
          const mineHeight = 80

          // Add the new mine
          const createdMine: MineZone = {
            ...newMine,
            top: y - mineHeight / 2,
            left: x - mineWidth / 2,
            width: mineWidth,
            height: mineHeight,
            owned: true,
          }

          setMineZones([...mineZones, createdMine])
          setPlacingMine(false)
          setNewMine(null)

          // Update game stats
          setGameStats({
            ...gameStats,
            balance: gameStats.balance - newMine.staked,
            ownedMines: gameStats.ownedMines + 1,
            totalStaked: gameStats.totalStaked + newMine.staked,
          })

          // Add activity log
          addActivityLog({
            type: "mine",
            message: `Created new mine: ${newMine.name}`,
          })
        }
      }
      return
    }

    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (placingMine) {
      const mapRect = mapRef.current?.getBoundingClientRect()
      if (mapRect) {
        const x = (e.clientX - mapRect.left) / scale
        const y = (e.clientY - mapRect.top) / scale
        setTempMinePosition({ top: y, left: x })
      }
      return
    }

    if (!isDragging) return

    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev + 0.1, 2.0)
      return newScale
    })
  }

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.1, 0.5)
      return newScale
    })
  }

  const handleCreateMine = (mine: Omit<MineZone, "top" | "left" | "width" | "height">) => {
    setNewMine(mine)
    setPlacingMine(true)
    setShowModal(false)
  }

  const handleNextRound = () => {
    // Simulate mining rewards
    const newBalance = gameStats.balance + gameStats.totalStaked * 0.1

    setGameStats({
      ...gameStats,
      round: gameStats.round + 1,
      balance: Math.floor(newBalance),
    })

    // Add activity log
    addActivityLog({
      type: "reward",
      message: `Round ${gameStats.round + 1} started. Earned ${Math.floor(gameStats.totalStaked * 0.1)} $FORGE`,
    })
  }

  const handleMineClick = (mine: MineZone) => {
    // Deselect all mines first
    const updatedMines = mineZones.map((m) => ({
      ...m,
      selected: false,
    }))

    // Then select the clicked mine
    const clickedMineIndex = updatedMines.findIndex((m) => m.id === mine.id)
    if (clickedMineIndex !== -1) {
      updatedMines[clickedMineIndex].selected = true
    }

    setMineZones(updatedMines)
    setSelectedMine(mine)
  }

  const addActivityLog = (log: Omit<ActivityLog, "id" | "time">) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      time: "just now",
      ...log,
    }

    setActivityLogs([newLog, ...activityLogs.slice(0, 19)])
  }

  const handleCollectResources = () => {
    if (!selectedMine) return

    // Generate resource amounts based on mine type
    const ironAmount = Math.floor(Math.random() * 2) + 2 // 2-3 iron
    const copperAmount = 1 // Always 1 copper
    const goldAmount = Math.random() < 0.2 ? 1 : 0 // 20% chance to get 1 gold

    // Update resources
    setResources((prev) => ({
      ironOre: prev.ironOre + ironAmount,
      copper: prev.copper + copperAmount,
      gold: prev.gold + goldAmount,
    }))

    // Update game stats with total value in $FORGE
    const totalValue = ironAmount * 12.4 + copperAmount * 8.2 + goldAmount * 45.6
    setGameStats((prev) => ({
      ...prev,
      balance: prev.balance + Math.floor(totalValue),
    }))

    // Add activity log
    addActivityLog({
      type: "mine",
      message: `Collected resources from ${selectedMine.name}:
    Iron Ore: ${ironAmount} (↑ 12.4 $FORGE)
    Copper: ${copperAmount} (↓ 8.2 $FORGE)
    Gold: ${goldAmount} (↑ 45.6 $FORGE)
    Total: ${Math.floor(totalValue)} $FORGE`,
    })
  }

  const handleUpgradeMine = () => {
    if (!selectedMine || !selectedMine.owned || gameStats.balance < 500) return

    // Simulate upgrade
    const upgradeCost = 500

    setGameStats({
      ...gameStats,
      balance: gameStats.balance - upgradeCost,
    })

    // Add activity log
    addActivityLog({
      type: "upgrade",
      message: `Upgraded ${selectedMine.name} for ${upgradeCost} $FORGE`,
    })
  }

  const handleRaidMine = () => {
    if (!selectedMine || selectedMine.owned || gameStats.balance < 300) return

    // Simulate raid
    const raidCost = 300
    const successChance = Math.random()

    setGameStats({
      ...gameStats,
      balance: gameStats.balance - raidCost,
      battles: gameStats.battles + 1,
    })

    if (successChance > 0.4) {
      // Successful raid
      const lootAmount = Math.floor(Math.random() * 500) + 200

      setGameStats((prev) => ({
        ...prev,
        balance: prev.balance + lootAmount,
      }))

      // Add activity log
      addActivityLog({
        type: "raid",
        message: `Successfully raided ${selectedMine.name} and gained ${lootAmount} resources`,
      })
    } else {
      // Failed raid
      addActivityLog({
        type: "alert",
        message: `Failed raid attempt on ${selectedMine.name}`,
      })
    }
  }

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false)
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        // Scroll up - zoom in
        setScale((prev) => Math.min(prev + 0.1, 2.0))
      } else {
        // Scroll down - zoom out
        setScale((prev) => Math.max(prev - 0.1, 0.5))
      }
      e.preventDefault()
    }

    const mapElement = mapRef.current
    if (mapElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "mine":
        return <Pickaxe size={16} className="text-orange-400" />
      case "raid":
        return <Sword size={16} className="text-red-400" />
      case "upgrade":
        return <Award size={16} className="text-blue-400" />
      case "reward":
        return <Award size={16} className="text-green-400" />
      case "alert":
        return <AlertTriangle size={16} className="text-yellow-400" />
      default:
        return <Clock size={16} className="text-gray-400" />
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <div className="pt-16 flex-1 relative">
        {/* Map header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl md:text-3xl text-orange-500">FORGE World Map</h1>
              <p className="text-amber-200 text-sm">
                Create mines, raid others, and expand your mining empire in this interactive simulation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSimulationMode(!simulationMode)} className="game-button-secondary text-sm">
                <span className="mr-1">🔸</span>
                SIMULATION MODE
              </button>

              <button onClick={handleNextRound} className="game-button-secondary text-sm">
                <RefreshCw size={14} className="mr-1" />
                Next Round
              </button>
            </div>
          </div>
        </div>

        {/* Map container with side panels */}
        <div className="container mx-auto px-4 mb-4">
          <div className="flex gap-4">
            {/* Main map area - larger */}
            <div
              className="map-container h-[70vh] flex-grow"
              style={{
                cursor: placingMine ? "crosshair" : isDragging ? "grabbing" : "grab",
                backgroundSize: "25px 25px",
                backgroundImage: `linear-gradient(to right, rgba(101, 67, 33, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(101, 67, 33, 0.1) 1px, transparent 1px)`,
                backgroundColor: "#1a0f00",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Map controls - now inside the map */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button onClick={handleZoomIn} className="map-control-button relative group" aria-label="Zoom in">
                  <ZoomIn size={20} />
                </button>
                <button onClick={handleZoomOut} className="map-control-button relative group" aria-label="Zoom out">
                  <ZoomOut size={20} />
                </button>
                <button
                  onClick={() => setPosition({ x: 0, y: 0 })}
                  className="map-control-button relative group"
                  aria-label="Reset position"
                >
                  <RefreshCw size={20} />
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="map-control-button relative group"
                  aria-label="Add mine"
                >
                  <Plus size={20} />
                </button>
              </div>
              {/* Instructions - static in bottom left */}
              <div className="absolute bottom-2 left-2 z-20 bg-black/80 text-amber-200 text-[10px] py-1 px-2 border border-amber-800/50 rounded-sm">
                Drag • Scroll • Click
              </div>
              {/* Island map */}
              <div
                ref={mapRef}
                className="absolute"
                style={{
                  width: "1600px",
                  height: "1200px",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-800px",
                  marginTop: "-600px",
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-out",
                }}
              >
                {/* Pixel art map */}
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url(/images/mapii.png)`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* Mine zones */}
                  {mineZones.map((zone) => {
                    // Center offset - move all mines more toward the center
                    const centerOffsetX = 200 // Move 200px toward center horizontally
                    const centerOffsetY = 150 // Move 150px toward center vertically

                    // Calculate new positions with center offset
                    const adjustedTop = zone.top < 600 ? zone.top + centerOffsetY : zone.top - centerOffsetY
                    const adjustedLeft = zone.left < 800 ? zone.left + centerOffsetX : zone.left - centerOffsetX

                    // Ensure mine is within map boundaries
                    const top = Math.min(Math.max(adjustedTop, 0), 1200 - zone.height)
                    const left = Math.min(Math.max(adjustedLeft, 0), 1600 - zone.width)

                    return (
                      <div
                        key={zone.id}
                        className={`mine-zone mine-zone-${zone.type} ${zone.selected ? "border-white border-4" : ""}`}
                        style={{
                          top: `${top}px`,
                          left: `${left}px`,
                          width: `${zone.width}px`,
                          height: `${zone.height}px`,
                          backgroundColor:
                            zone.type === "cyan"
                              ? "rgba(6, 182, 212, 0.5)"
                              : zone.type === "gray"
                                ? "rgba(156, 163, 175, 0.5)"
                                : zone.type === "green"
                                  ? "rgba(34, 197, 94, 0.5)"
                                  : "rgba(168, 85, 247, 0.5)",
                          boxShadow: `0 0 15px ${
                            zone.type === "cyan"
                              ? "rgba(6, 182, 212, 0.8)"
                              : zone.type === "gray"
                                ? "rgba(156, 163, 175, 0.8)"
                                : zone.type === "green"
                                  ? "rgba(34, 197, 94, 0.8)"
                                  : "rgba(168, 85, 247, 0.8)"
                          }`,
                        }}
                        onClick={() => handleMineClick(zone)}
                      >
                        {zone.owned && (
                          <div className="absolute -top-4 -right-4 bg-orange-800 rounded-full p-1 z-10">
                            <Image
                              src="/images/forge-logo.png"
                              alt="FORGE Logo"
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="tooltip">
                          <h4 className="text-orange-400 mb-1">{zone.name}</h4>
                          <p className="text-xs text-amber-200">{zone.staked.toLocaleString()} $FORGE staked</p>
                        </div>
                      </div>
                    )
                  })}

                  {/* Temporary mine placement preview */}
                  {placingMine && newMine && (
                    <div
                      className={`mine-zone mine-zone-${newMine.type} opacity-50`}
                      style={{
                        top: `${tempMinePosition.top - 40}px`,
                        left: `${tempMinePosition.left - 50}px`,
                        width: "100px",
                        height: "80px",
                      }}
                    >
                      <div className="tooltip">
                        <h4 className="text-orange-400 mb-1">{newMine.name}</h4>
                        <p className="text-xs text-amber-200">{newMine.staked.toLocaleString()} $FORGE staked</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mine actions panel */}
            <div className="w-64 h-[70vh] bg-black/80 border-2 border-amber-800 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-orange-500 text-lg mb-4 border-b border-amber-800 pb-2">Mine Actions</h3>

                {selectedMine ? (
                  <div className="space-y-4">
                    <div className="bg-black/50 p-3 border border-amber-800/50">
                      <h4 className="text-amber-200 font-bold mb-2">{selectedMine.name}</h4>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Type:</span>
                        <span
                          className={`text-${selectedMine.type === "cyan" ? "orange" : selectedMine.type === "green" ? "green" : selectedMine.type === "purple" ? "purple" : "gray"}-400`}
                        >
                          {selectedMine.type.charAt(0).toUpperCase() + selectedMine.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Staked:</span>
                        <span className="text-amber-200">{selectedMine.staked.toLocaleString()} $FORGE</span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">{selectedMine.owned ? "Owned" : "Available"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleCollectResources}
                        className={`w-full game-button-secondary text-xs py-1.5 flex items-center justify-center whitespace-normal ${
                          !selectedMine?.owned ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!selectedMine?.owned}
                      >
                        <Pickaxe size={14} className="mr-1.5 flex-shrink-0" />
                        Collect Resources
                        <div className="absolute -top-24 left-0 w-full bg-black/90 border border-amber-800 p-2 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="text-amber-200 mb-1">Resources to collect:</div>
                          <div className="text-green-400">Iron Ore ↑ 12.4 $FORGE</div>
                          <div className="text-red-400">Copper ↓ 8.2 $FORGE</div>
                          <div className="text-green-400">Gold ↑ 45.6 $FORGE</div>
                        </div>
                      </button>

                      <button
                        onClick={handleUpgradeMine}
                        className={`w-full game-button-secondary text-xs py-1.5 flex items-center justify-center whitespace-normal ${
                          !selectedMine.owned || gameStats.balance < 500 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!selectedMine.owned || gameStats.balance < 500}
                      >
                        <Award size={14} className="mr-1.5 flex-shrink-0" />
                        Upgrade Mine (500 $FORGE)
                        {gameStats.balance < 500 && selectedMine.owned && (
                          <span className="ml-1 text-red-400 text-[10px]">(Insufficient funds)</span>
                        )}
                      </button>

                      <button
                        onClick={handleRaidMine}
                        className={`w-full game-button-secondary text-xs py-1.5 flex items-center justify-center whitespace-normal ${
                          selectedMine.owned || gameStats.balance < 300 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={selectedMine.owned || gameStats.balance < 300}
                      >
                        <Sword size={14} className="mr-1.5 flex-shrink-0" />
                        Raid Mine (300 $FORGE)
                        {gameStats.balance < 300 && !selectedMine.owned && (
                          <span className="ml-1 text-red-400 text-[10px]">(Insufficient funds)</span>
                        )}
                      </button>

                      <button
                        className={`w-full game-button-secondary text-xs py-1.5 flex items-center justify-center whitespace-normal ${
                          selectedMine.owned || gameStats.balance < 200 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={selectedMine.owned || gameStats.balance < 200}
                        onClick={() => {
                          if (!selectedMine.owned && gameStats.balance >= 200) {
                            // Logic for defending mine
                            addActivityLog({
                              type: "shield",
                              message: `Added defenses to ${selectedMine.name} for 200 $FORGE`,
                            })
                            setGameStats({
                              ...gameStats,
                              balance: gameStats.balance - 200,
                            })
                          }
                        }}
                      >
                        <Shield size={14} className="mr-1.5 flex-shrink-0" />
                        Defend Mine (200 $FORGE)
                        {gameStats.balance < 200 && !selectedMine.owned && (
                          <span className="ml-1 text-red-400 text-[10px]">(Insufficient funds)</span>
                        )}
                      </button>
                    </div>

                    <div className="bg-amber-900/20 p-3 border border-amber-800/50 text-xs">
                      <h4 className="text-orange-400 font-bold mb-1">Mine Stats</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Production:</span>
                          <span className="text-green-400">125 units/round</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Defense:</span>
                          <span className="text-blue-400">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Efficiency:</span>
                          <span className="text-yellow-400">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-amber-200/70">
                    <p>Select a mine on the map to view actions</p>
                  </div>
                )}
              </div>
            </div>

            {/* Activity log panel */}
            <div className="w-64 h-[70vh] bg-black/80 border-2 border-amber-800 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-orange-500 text-lg mb-4 border-b border-amber-800 pb-2">Activity Log</h3>

                <div className="space-y-3">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="bg-black/50 p-2 border border-amber-800/50 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        {getActivityIcon(log.type)}
                        <span className="text-amber-200 font-bold">
                          {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-1">{log.message}</p>
                      <p className="text-gray-500 text-[10px] italic">{log.time}</p>
                    </div>
                  ))}

                  {activityLogs.length === 0 && (
                    <div className="text-center py-4 text-amber-200/70">
                      <p>No activity yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game stats */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="game-panel">
            <h3 className="text-amber-200 mb-4">Game Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="game-label text-xs">Round</div>
                <div className="game-stat text-xl">{gameStats.round}</div>
              </div>
              <div>
                <div className="game-label text-xs">Battles</div>
                <div className="game-stat text-xl">{gameStats.battles}</div>
              </div>
              <div>
                <div className="game-label text-xs">Mines</div>
                <div className="game-stat text-xl">{gameStats.mines}</div>
              </div>
            </div>
          </div>

          <div className="game-panel">
            <h3 className="text-amber-200 mb-4">Your Wallet</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="game-label text-xs">Address</div>
                <div className="game-stat text-sm font-mono">{gameStats.address}</div>
              </div>
              <div>
                <div className="game-label text-xs">$FORGE Balance</div>
                <div className="game-stat text-xl">{gameStats.balance.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="game-panel">
            <h3 className="text-amber-200 mb-4">Your Empire</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="game-label text-xs">Mines Owned</div>
                <div className="game-stat text-xl">{gameStats.ownedMines}</div>
              </div>
              <div>
                <div className="game-label text-xs">Total $FORGE Staked</div>
                <div className="game-stat text-xl">{gameStats.totalStaked.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="game-panel">
          <h3 className="text-amber-200 mb-4">Resources Collected</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="game-label text-xs">Iron Ore</div>
              <div className="game-stat text-xl">
                {resources.ironOre} <span className="text-green-400 text-sm">↑</span>
              </div>
            </div>
            <div>
              <div className="game-label text-xs">Copper</div>
              <div className="game-stat text-xl">
                {resources.copper} <span className="text-red-400 text-sm">↓</span>
              </div>
            </div>
            <div>
              <div className="game-label text-xs">Gold</div>
              <div className="game-stat text-xl">
                {resources.gold} <span className="text-green-400 text-sm">↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Mine Modal */}
      {showModal && (
        <CreateMineModal
          onClose={() => setShowModal(false)}
          onCreateMine={handleCreateMine}
          walletBalance={gameStats.balance}
        />
      )}
    </main>
  )
}

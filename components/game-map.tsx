"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ZoomIn, ZoomOut, Crown } from "lucide-react"

interface MineZone {
  id: string
  name: string
  type: "orange" | "gray" | "green" | "purple"
  staked: number
  top: number
  left: number
  width: number
  height: number
  owned?: boolean
}

export default function GameMap() {
  const [scale, setScale] = useState(0.8)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const mineZones: MineZone[] = [
    {
      id: "mine1",
      name: "Ember Crater",
      type: "orange",
      staked: 3400,
      top: 200,
      left: 400,
      width: 120,
      height: 80,
      owned: true,
    },
    {
      id: "mine2",
      name: "Stone Pit",
      type: "gray",
      staked: 900,
      top: 350,
      left: 250,
      width: 100,
      height: 100,
    },
    {
      id: "mine3",
      name: "Verdant Ridge",
      type: "green",
      staked: 2100,
      top: 150,
      left: 600,
      width: 150,
      height: 90,
    },
    {
      id: "mine4",
      name: "Shadow Mine",
      type: "purple",
      staked: 1600,
      top: 400,
      left: 550,
      width: 110,
      height: 70,
    },
    {
      id: "mine5",
      name: "Golden Quarry",
      type: "orange",
      staked: 5200,
      top: 300,
      left: 750,
      width: 130,
      height: 90,
    },
    {
      id: "mine6",
      name: "Granite Hollow",
      type: "gray",
      staked: 1200,
      top: 500,
      left: 350,
      width: 90,
      height: 110,
    },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
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
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
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

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Map controls */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="pixel-button p-2" aria-label="Zoom in">
          <ZoomIn size={20} />
        </button>
        <button onClick={handleZoomOut} className="pixel-button p-2" aria-label="Zoom out">
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Map container */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Sea grid background */}
        <div
          className="absolute w-[2000px] h-[2000px] bg-repeat"
          style={{
            backgroundImage: "url(/images/sea-grid.png)",
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {/* Island map */}
          <div
            ref={mapRef}
            className="absolute"
            style={{
              width: "1024px",
              height: "1536px",
              top: "50%",
              left: "50%",
              marginLeft: "-512px",
              marginTop: "-768px",
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <Image
              src="/images/island-map.png"
              alt="FORGE Game Map"
              width={1024}
              height={1536}
              className="w-full h-full object-contain pixel-borders"
            />

            {/* Mine zones */}
            {mineZones.map((zone) => (
              <div
                key={zone.id}
                className={`mine-zone mine-zone-${zone.type}`}
                style={{
                  top: `${zone.top}px`,
                  left: `${zone.left}px`,
                  width: `${zone.width}px`,
                  height: `${zone.height}px`,
                }}
              >
                {zone.owned && (
                  <div className="absolute -top-4 -right-4 bg-amber-800 rounded-full p-1 z-10">
                    <Crown size={16} className="text-yellow-400" />
                  </div>
                )}
                <div className="tooltip">
                  <h4 className="text-amber-200 mb-1">{zone.name}</h4>
                  <p className="text-xs text-green-400">{zone.staked.toLocaleString()} $FORGE staked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

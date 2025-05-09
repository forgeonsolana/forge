"use client"

import { useState } from "react"

interface MineData {
  id: string
  name: string
  type: "orange" | "gray" | "green" | "purple"
  staked: number
}

interface CreateMineModalProps {
  onClose: () => void
  onCreateMine: (mine: MineData) => void
  walletBalance: number
}

export default function CreateMineModal({ onClose, onCreateMine, walletBalance }: CreateMineModalProps) {
  const [mineName, setMineName] = useState("")
  const [mineColor, setMineColor] = useState<"orange" | "gray" | "green" | "purple">("orange")
  const [investment, setInvestment] = useState(1000)
  const [step, setStep] = useState(1)

  const colorOptions: { value: "orange" | "gray" | "green" | "purple"; bg: string }[] = [
    { value: "orange", bg: "bg-orange-500" },
    { value: "gray", bg: "bg-gray-500" },
    { value: "green", bg: "bg-green-500" },
    { value: "purple", bg: "bg-purple-500" },
  ]

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2)
      return
    }

    const newMine: MineData = {
      id: `mine-${Date.now()}`,
      name: mineName || "Unnamed Mine",
      type: mineColor,
      staked: investment,
    }

    onCreateMine(newMine)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Create New Mine</div>

        {step === 1 ? (
          <>
            <div>
              <label className="block text-amber-200 mb-2">Mine Name</label>
              <input
                type="text"
                value={mineName}
                onChange={(e) => setMineName(e.target.value)}
                placeholder="Enter mine name"
                className="modal-input"
              />
            </div>

            <div>
              <label className="block text-amber-200 mb-2">Mine Color</label>
              <div className="color-picker">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`color-option ${color.bg} ${mineColor === color.value ? "selected" : ""}`}
                    onClick={() => setMineColor(color.value)}
                    aria-label={`Select ${color.value} color`}
                  />
                ))}
              </div>
            </div>

            <div className="slider-container">
              <label className="block text-amber-200 mb-2">Initial $FORGE Investment: {investment}</label>
              <input
                type="range"
                min="100"
                max={walletBalance}
                step="100"
                value={investment}
                onChange={(e) => setInvestment(Number.parseInt(e.target.value))}
                className="slider"
              />
            </div>

            <div className="modal-footer">
              <button onClick={onClose} className="game-button-secondary">
                Cancel
              </button>
              <button onClick={handleSubmit} className="game-button">
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center my-4">
              <div className="text-amber-200 mb-2">Your wallet balance:</div>
              <div className="text-orange-400 text-xl">{walletBalance} $FORGE</div>
              <div className="text-amber-200 mt-4 mb-2">After creation:</div>
              <div className="text-orange-400 text-xl">{walletBalance - investment} $FORGE</div>
            </div>

            <div className="text-center my-6">
              <div className="text-amber-200">Click on the map to place your mine</div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setStep(1)} className="game-button-secondary">
                Back
              </button>
              <button onClick={handleSubmit} className="game-button">
                Place on Map
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

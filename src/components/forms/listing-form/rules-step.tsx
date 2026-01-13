"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface RulesStepProps {
  onNext: () => void
  onBack: () => void
}

export function RulesStep({ onNext, onBack }: RulesStepProps) {
  const { formData, setFormData } = useListingStore()
  const [rules, setRules] = useState<string[]>(formData.houseRules || [""])
  const [newRule, setNewRule] = useState("")

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()])
      setNewRule("")
    }
  }

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    setFormData({ houseRules: rules.filter((r) => r.trim()) })
    onNext()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Set house rules</h2>
      <p className="text-gray-600 mb-8">Let guests know what to expect</p>

      <div className="space-y-4 mb-8">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={rule}
              onChange={(e) => {
                const newRules = [...rules]
                newRules[index] = e.target.value
                setRules(newRules)
              }}
              placeholder="e.g., No smoking, No pets, Check-in after 3 PM"
            />
            {rules.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeRule(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" onClick={addRule} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}

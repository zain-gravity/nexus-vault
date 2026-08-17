'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const GOAL_TYPES = [
  { value: 'savings', label: 'Savings' },
  { value: 'investment', label: 'Investment' },
  { value: 'purchase', label: 'Large Purchase' },
  { value: 'debt', label: 'Debt Payoff' },
]

export interface AddGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Financial Goal" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Goal Title" required placeholder="e.g. Emergency Fund" />
        <Select label="Type" options={GOAL_TYPES} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Target Amount" type="number" required placeholder="0.00" />
          <Input label="Current Amount" type="number" required placeholder="0.00" />
        </div>
        <Input label="Deadline" type="date" required />
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">Add Goal</Button>
        </div>
      </form>
    </Modal>
  )
}

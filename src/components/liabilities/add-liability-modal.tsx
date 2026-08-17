'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const LIABILITY_TYPES = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'loan', label: 'Personal Loan' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'auto', label: 'Auto Loan' },
  { value: 'other', label: 'Other' },
]

export interface AddLiabilityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export const AddLiabilityModal: React.FC<AddLiabilityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Liability" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Liability Name" required placeholder="e.g. Chase Sapphire" />
        <Select label="Type" options={LIABILITY_TYPES} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Total Amount" type="number" required placeholder="0.00" />
          <Input label="Remaining Amount" type="number" required placeholder="0.00" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Monthly Payment" type="number" required placeholder="0.00" />
          <Input label="Interest Rate (%)" type="number" step="0.01" required placeholder="0.00" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="date" required />
          <Input label="End Date" type="date" />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">Add Liability</Button>
        </div>
      </form>
    </Modal>
  )
}

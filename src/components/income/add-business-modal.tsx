'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const BUSINESS_TYPES = [
  { value: 'service', label: 'Service' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'content', label: 'Content Creation' },
  { value: 'other', label: 'Other' },
]

export interface AddBusinessModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Normally gather form data
    onSubmit({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Business Stream" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Business Name" required placeholder="e.g. Consulting" />
        <Input label="Description" placeholder="Brief description" />
        <Select label="Type" options={BUSINESS_TYPES} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Initial Investment" type="number" required placeholder="0.00" />
          <Input label="Current Value" type="number" required placeholder="0.00" />
        </div>
        <Input label="Start Date" type="date" required />
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">Add Stream</Button>
        </div>
      </form>
    </Modal>
  )
}

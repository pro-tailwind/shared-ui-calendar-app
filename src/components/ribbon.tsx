'use client'

import { useState } from 'react'

import { Modal } from '@/components/modal'
import { ButtonProps } from './button'

export function Ribbon() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState<ButtonProps['status']>('idle')
  return (
    <>
      <div className="absolute -right-2 -top-2 z-10 aspect-square w-32 overflow-hidden rounded-sm">
        <div aria-hidden="true" className="absolute h-2 w-2 bg-violet-500"></div>
        <div aria-hidden="true" className="absolute bottom-0 right-0 h-2 w-2 bg-violet-500"></div>
        <div className="absolute bottom-0 right-0 w-square-diagonal origin-bottom-right rotate-45">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full flex-col items-center bg-violet-300 py-2.5 shadow hover:bg-violet-200 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-offset-1"
          >
            <span className="text-[10px] font-semibold uppercase leading-none tracking-wide text-violet-900/60">
              Powered by
            </span>
            <span className="font-bold leading-none text-violet-900">Pro Tailwind</span>
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        status={status}
        onClose={() => setIsModalOpen(false)}
        title="Powered by Pro Tailwind"
        actions={{
          cancel: {
            label: 'No thanks',
            action: () => setIsModalOpen(false),
          },
          confirm: {
            label: 'Take me there!',
            // action: () => window.open('https://protailwind.com', '_blank')
            action: () => {
              setStatus('loading')
              setTimeout(() => {
                setStatus('idle')
              }, 2000)
            },
          },
        }}
      >
        <p className="mt-4 text-slate-600">
          This calendar app is part of the Pro Tailwind course, created by Simon Vrachliotis.
        </p>
        <p className="mt-2 text-slate-600">You should totally check it out!</p>
      </Modal>
    </>
  )
}

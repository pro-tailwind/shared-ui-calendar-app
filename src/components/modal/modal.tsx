import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import { Button, ButtonProps } from '../button'

// ---------------------------------
// Prop types
// ---------------------------------
type ModalProps = {
  onClose: () => void
  onCloseComplete?: () => void
  title: string
  open: boolean
  status?: ButtonProps['status']
  size?: 'small' | 'medium' | 'large'
  tone?: ButtonProps['tone']
  slideFrom?: 'top' | 'right' | 'bottom' | 'left'
  actions: {
    cancel?: {
      label: string
      action: () => void
    }
    confirm: {
      label: string
      action: () => void
    }
  }
  children: React.ReactNode
}

// ---------------------------------
// Style lookup directories
// ---------------------------------
const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  small: 'sm:max-w-sm',
  medium: 'sm:max-w-lg',
  large: 'sm:max-w-2xl',
}

const toneClasses: Record<NonNullable<ModalProps['tone']>, string> = {
  default: 'bg-primary-300',
  danger: 'bg-red-300',
  success: 'bg-green-300',
}

const slideFromClasses: Record<
  NonNullable<ModalProps['slideFrom']>,
  { from: string; to: string }
> = {
  top: {
    from: '-translate-y-8',
    to: 'translate-y-0',
  },
  right: {
    from: 'translate-x-8',
    to: 'translate-x-0',
  },
  bottom: {
    from: 'translate-y-8',
    to: 'translate-y-0',
  },
  left: {
    from: '-translate-x-8',
    to: 'translate-x-0',
  },
}

// ---------------------------------
// Main Component
// ---------------------------------
export function Modal({
  open,
  onClose,
  onCloseComplete = () => {},
  title,
  children,
  actions,
  status = 'idle',
  size = 'medium',
  tone = 'default',
  slideFrom = 'top',
  ...restProps
}: ModalProps) {
  const isLoading = status === 'loading'
  return (
    <Transition.Root show={open} afterLeave={onCloseComplete}>
      <Dialog onClose={isLoading ? () => {} : onClose} className="relative z-10" {...restProps}>
        {/* Background overlay */}
        <Transition.Child
          enter="transition ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={twMerge('fixed inset-0 bg-opacity-75 transition-opacity', toneClasses[tone])}
          ></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Modal panel */}
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-out"
              enterFrom={twMerge('opacity-0', slideFromClasses[slideFrom].from)}
              enterTo={twMerge('opacity-100', slideFromClasses[slideFrom].to)}
              leave="transition ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={twMerge(
                  'relative w-full overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8',
                  sizeClasses[size]
                )}
              >
                <div className="bg-white p-4 sm:p-6">
                  <div className="text-center sm:text-left">
                    {/* Title */}
                    <Dialog.Title className="text-xl font-semibold leading-6 text-slate-900">
                      {title}
                    </Dialog.Title>

                    {/* Body */}
                    {children}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 border-t p-4 sm:flex-row-reverse">
                  <Button
                    disabled={isLoading}
                    tone={tone}
                    onClick={actions.confirm.action}
                    status={status}
                  >
                    {actions.confirm.label}
                  </Button>

                  {/* Only show the cancel button if the action exists */}
                  {actions.cancel && (
                    <Button
                      disabled={isLoading}
                      tone={tone}
                      impact="none"
                      onClick={actions.cancel.action}
                    >
                      <span>{actions.cancel.label}</span>
                    </Button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

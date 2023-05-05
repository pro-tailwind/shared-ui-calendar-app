import React from 'react'
import { Transition } from '@headlessui/react'

import { twMerge } from 'tailwind-merge'

// ------------------------------
// Prop types
// ------------------------------
export type ButtonProps = {
  block?: boolean
  impact?: 'bold' | 'light' | 'none'
  size?: 'small' | 'medium' | 'large'
  shape?: 'square' | 'rounded' | 'pill'
  tone?: 'default' | 'danger' | 'success'
  status?: 'idle' | 'loading'
}

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------
const baseClasses =
  'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const impactClasses: Record<
  NonNullable<ButtonProps['tone']>,
  Record<NonNullable<ButtonProps['impact']>, string>
> = {
  default: {
    bold: 'bg-primary-500 text-white shadow-md hover:bg-primary-600 focus-visible:ring-primary-500',
    light: 'bg-primary-100 text-primary-700 hover:bg-primary-200 focus-visible:ring-primary-500',
    none: 'bg-transparent text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500',
  },
  danger: {
    bold: 'bg-red-500 text-white shadow-md hover:bg-red-600 focus-visible:ring-red-500',
    light: 'bg-red-100 text-red-700 hover:bg-red-200 focus-visible:ring-red-500',
    none: 'bg-transparent text-red-700 hover:bg-red-50 focus-visible:ring-red-500',
  },
  success: {
    bold: 'bg-green-500 text-white shadow-md hover:bg-green-600 focus-visible:ring-green-500',
    light: 'bg-green-100 text-green-700 hover:bg-green-200 focus-visible:ring-green-500',
    none: 'bg-transparent text-green-700 hover:bg-green-50 focus-visible:ring-green-500',
  },
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-5 py-2 text-base',
  large: 'px-7 py-2.5 text-lg',
}

const shapeClasses: Record<NonNullable<ButtonProps['shape']>, string> = {
  square: 'rounded-none',
  rounded: 'rounded',
  pill: 'rounded-full',
}

// ------------------------------
// Component definition (with default variants)
// ------------------------------
export const Button = ({
  block = false,
  size = 'medium',
  impact = 'bold',
  shape = 'rounded',
  tone = 'default',
  status = 'idle',
  className,
  children,
  ...restProps
}: ButtonProps & React.ComponentProps<'button'>) => {
  const blockClasses = block ? 'w-full' : ''
  return (
    <button
      {...restProps}
      className={twMerge(
        baseClasses,
        blockClasses,
        impactClasses[tone][impact],
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      <span className="flex items-center gap-3">
        <Transition
          appear
          show={status === 'loading'}
          enter="transition ease-out"
          enterFrom="scale-0"
          enterTo="scale-100"
        >
          <LoadingSpinner />
        </Transition>
        <span>{children}</span>
      </span>
    </button>
  )
}

// ------------------------------
// Loading spinner
// ------------------------------
function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

import { useEffect, type ReactNode } from 'react'
import { XIcon } from './Icons'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxHeight?: string
}

export default function BottomSheet({ open, onClose, title, children, maxHeight = '80vh' }: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6EBE8] shrink-0">
          {title && <h3 className="text-base font-semibold text-text-primary">{title}</h3>}
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

interface DesktopModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function DesktopModal({ open, onClose, title, children }: DesktopModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6EBE8] shrink-0">
          {title && <h3 className="text-base font-semibold text-text-primary">{title}</h3>}
          <button onClick={onClose} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

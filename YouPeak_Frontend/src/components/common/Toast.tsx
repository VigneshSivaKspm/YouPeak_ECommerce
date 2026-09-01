import { useApp } from '../../context/AppContext'
import { CheckCircleIcon, XIcon } from './Icons'

export default function Toast() {
  const { toasts, removeToast } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-xs w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === 'success'
              ? 'bg-green'
              : toast.type === 'error'
              ? 'bg-red'
              : 'bg-[#1e293b]'
          }`}
        >
          {toast.type === 'success' && <CheckCircleIcon className="w-5 h-5 shrink-0" />}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

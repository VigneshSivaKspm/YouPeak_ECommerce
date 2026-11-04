import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
}

export default function EmptyState({ icon = '📦', title, description, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      {description && <p className="text-sm text-text-secondary mb-6 max-w-xs">{description}</p>}
      {actionLabel && (
        actionTo ? (
          <Link
            to={actionTo}
            className="bg-green text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-deep transition-colors"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="bg-green text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-deep transition-colors"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  )
}

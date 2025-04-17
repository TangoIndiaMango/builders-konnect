import React from "react"
import { Empty } from "antd"
import { BarChart3 } from "lucide-react"

interface EmptyStateProps {
  description?: string
  height?: number | string
  className?: string
  icon?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  description = "You have no data here yet",
  height = 200,
  className = "",
  icon,
}) => {
  return (
    <div
      className={`flex items-center justify-center bg-gray-50 rounded ${className}`}
      style={{ height }}
    >
      <Empty
        image={icon || <BarChart3 size={40} className="text-gray-400" />}
        description={<p className="text-sm text-gray-500">{description}</p>}
      />
    </div>
  )
}

export default EmptyState

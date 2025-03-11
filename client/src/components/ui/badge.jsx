import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants = {
  default: "bg-gray-900 text-white hover:bg-gray-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "text-gray-700 border border-gray-200 hover:bg-gray-100",
}

const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
          badgeVariants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants } 
import React from 'react'

function SkeletonLoader({ className = '', variant = 'rect', width, height, rounds = 1 }) {
  const baseClasses = 'bg-outline-variant/20 animate-pulse rounded'
  const variantClasses = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-xl',
  }
  const classes = [baseClasses, variantClasses[variant] || variantClasses.rect, className].filter(Boolean).join(' ')

  const style = {}
  if (width) style.width = width
  if (height) style.height = height

  return <div className={classes} style={style} />
}

function StatCardSkeleton() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-md space-y-md">
      <SkeletonLoader variant="text" width="60%" height="14" />
      <SkeletonLoader variant="text" width="40%" height="24" />
    </div>
  )
}

function TableRowSkeleton({ cols = 4 }) {
  return (
    <div className="grid gap-md p-md" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonLoader key={i} variant="text" height="16" />
      ))}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-md space-y-md">
      <SkeletonLoader variant="text" width="80%" height="18" />
      <SkeletonLoader variant="text" width="60%" height="14" />
      <SkeletonLoader variant="rect" width="100%" height="40" />
    </div>
  )
}

export { SkeletonLoader, StatCardSkeleton, TableRowSkeleton, CardSkeleton }
export default SkeletonLoader
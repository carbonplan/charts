import React from 'react'
import { useChart } from './chart'

const Plot = ({ children, mode = 'svg' }) => {
  const { pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

  return (
    <div
      style={{
        position: 'absolute',
        height: `calc(100% - ${apt + pt + pb + apb}px)`,
        width: `calc(100% - ${apl + pl + pr + apr}px)`,
        left: `${apl + pl}px`,
        top: `${apt + pt}px`,
      }}
    >
      {mode === 'svg' && (
        <svg
          height='100%'
          viewBox='0 0 100 100'
          width='100%'
          preserveAspectRatio='none'
        >
          {children}
        </svg>
      )}
    </div>
  )
}

export default Plot

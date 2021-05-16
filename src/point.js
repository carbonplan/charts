import React from 'react'
import { useChart } from './chart'

const Point = ({ x, y, children }) => {
  const { x: _x, y: _y, pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

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
      <div
        style={{
          position: 'absolute',
          top: `${_y(y)}%`,
          left: `${_x(x)}%`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Point

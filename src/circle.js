import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Circle = ({ x, y, color = 'primary', size = 10, sx }) => {
  const { x: _x, y: _y } = useChart()

  return (
    <Box
      as='line'
      x1={`${_x(x)}`}
      x2={`${_x(x) + 0.00001}`}
      y1={`${_y(y)}`}
      y2={`${_y(y) + 0.00001}`}
      sx={{
        stroke: color,
        strokeWidth: size,
        strokeLinecap: 'round',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
    />
  )
}

export default memo(Circle)

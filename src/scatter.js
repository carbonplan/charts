import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Scatter = ({
  data,
  x,
  y,
  color = 'primary',
  size = 10,
  sx,
  ...props
}) => {
  const { x: _x, y: _y } = useChart()
  x = x || ((d) => d[0])
  y = y || ((d) => d[1])

  const path = data.map((d) => `M${_x(x(d))},${_y(y(d))} l0.01,0.01`).join(' ')

  return (
    <Box
      as='path'
      d={path}
      sx={{
        stroke: color,
        strokeWidth: size,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Scatter)

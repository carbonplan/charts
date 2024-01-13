import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import { dropNans } from './utils/missing'

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

  const filteredData = dropNans(data)

  const path = filteredData
    .map(
      (d, i) =>
        `M${_x(x(d))} ${_y(y(d))} A0 0 0 0 1 ${_x(x(d)) + 0.0001} ${
          _y(y(d)) + 0.0001
        }`
    )
    .join(' ')

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

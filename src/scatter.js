import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Scatter = ({ data, x, y, color = 'primary', size = 10, sx }) => {
  const { x: _x, y: _y } = useChart()

  return (
    <Box
      as='path'
      d={data
        .map(
          (d, i) =>
            `M${_x(d[0])} ${_y(d[1])} A0 0 0 0 1 ${_x(d[0]) + 0.0001} ${
              _y(d[1]) + 0.0001
            }`
        )
        .join(' ')}
      sx={{
        stroke: color,
        strokeWidth: size,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
    />
  )
}

export default memo(Scatter)

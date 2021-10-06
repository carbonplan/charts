import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import { area } from 'd3-shape'

const Area = ({ data, color = 'primary', width = 1, curve = false, sx }) => {
  const { x: _x, y: _y } = useChart()

  let generator = area()
    .x((d) => _x(d[0]))
    .y0(_y(0))
    .y1((d) => _y(d[1]))

  if (curve) {
    generator = generator.curve(curve)
  }

  return (
    <Box
      as='path'
      d={generator(data)}
      sx={{
        fill: color,
        ...sx,
      }}
    />
  )
}

export default memo(Area)

import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import { line } from 'd3-shape'
import { dropNans } from './utils/missing'

const Line = ({ data, color = 'primary', width = 1, curve = false, sx }) => {
  const { x: _x, y: _y } = useChart()

  let generator = line()
    .x((d) => _x(d[0]))
    .y((d) => _y(d[1]))

  if (curve) {
    generator = generator.curve(curve)
  }

  const filteredData = dropNans(data)

  return (
    <Box
      as='path'
      d={generator(filteredData)}
      sx={{
        stroke: color,
        strokeWidth: width,
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
    />
  )
}

export default memo(Line)

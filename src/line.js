import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import { line } from 'd3-shape'

const Line = ({
  data,
  color = 'primary',
  width = 1,
  curve = false,
  sx,
  ...props
}) => {
  const { x: _x, y: _y } = useChart()

  let generator = line()
    .x((d) => _x(d[0]))
    .y((d) => _y(d[1]))

  if (curve) {
    generator = generator.curve(curve)
  }

  return (
    <Box
      as='path'
      d={generator(data)}
      sx={{
        stroke: color,
        strokeWidth: width,
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Line)

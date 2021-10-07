import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import { area } from 'd3-shape'

/**
 * Renders an area <path>
 * @param  props
 * @param  props.data - array of values specifying the two bounding lines of the area, where
 *                      entries can be of the shape [x, y1] (a lower bounding line of [x, 0]
 *                      is assumed) or of the shape [x, y0, y1] (where [x, y1] becomes the
 *                      upper line and [x, y0] the lower line).
 * @param  props.color - the color of the area fill
 * @param  props.curve - optional curve factory
 * @param  props.sx - optional sx object
 */
const Area = ({ data, color = 'primary', curve = false, sx }) => {
  const { x: _x, y: _y } = useChart()

  let generator = area()
    .x((d) => _x(d[0]))
    .y0((d) => (d.length === 3 ? _y(d[1]) : _y(0)))
    .y1((d) => _y(d[d.length - 1]))

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

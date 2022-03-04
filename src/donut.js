import React, { memo } from 'react'
import { arc, pie } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { Box } from 'theme-ui'
import { getPropAtIndex, getColorAtIndex } from './utils'

const Donut = ({
  data,
  innerRadius = 0.3,
  outerRadius = 50,
  opacity,
  color = 'primary',
  preserveOrder = false,
  sx,
}) => {
  const arcs = pie()
    .sort(preserveOrder ? (a, b) => a.i - b.i : null)
    .value((d) => d.value)(data.map((d, i) => ({ value: d, i })))
  const generator = arc()
    .innerRadius(innerRadius * 100)
    .outerRadius(outerRadius)

  let defaultOpacity
  if (opacity == null) {
    if (Array.isArray(color)) {
      defaultOpacity = 1
    } else {
      const opacityScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0.3, 0.9])
      defaultOpacity = arcs.map((d) => opacityScale(d.index))
    }
  }

  return (
    <g transform='translate(50,50)'>
      {arcs.map((d, i) => {
        return (
          <Box
            key={i}
            as='path'
            d={generator(d)}
            sx={{
              stroke: 'none',
              fillOpacity: getPropAtIndex(opacity ?? defaultOpacity, data, i, {
                propName: 'opacity',
              }),
              fill: getColorAtIndex(color, data, i),
              ...sx,
            }}
          />
        )
      })}
    </g>
  )
}

export default memo(Donut)

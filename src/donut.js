import React, { memo } from 'react'
import { arc, pie } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { Box } from 'theme-ui'

const Donut = ({
  data,
  domain,
  range,
  innerRadius = 0.3,
  outerRadius = 50,
  color = 'primary',
  sx,
}) => {
  domain = domain || [0, data.length - 1]
  range = range || [0.3, 0.9]
  const arcs = pie()(data)
  const generator = arc()
    .innerRadius(innerRadius * 100)
    .outerRadius(outerRadius)
  const opacity = scaleLinear().domain(domain).range(range)

  if (Array.isArray(color) && color.length !== data.length) {
    throw new Error(
      `Unexpected color array provided. Expected length ${data.length}, received length ${color.length}`
    )
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
              fillOpacity: typeof color === 'string' ? opacity(d.index) : 1,
              fill: typeof color === 'string' ? color : color[i],
              ...sx,
            }}
          />
        )
      })}
    </g>
  )
}

export default memo(Donut)

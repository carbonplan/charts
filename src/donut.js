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
  ...props
}) => {
  domain = domain || [0, data.length - 1]
  range = range || [0.3, 0.9]
  const arcs = pie()(data)
  const generator = arc()
    .innerRadius(innerRadius * 100)
    .outerRadius(outerRadius)
  const opacity = scaleLinear().domain(domain).range(range)

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
              fillOpacity: opacity(d.index),
              fill: color,
              ...sx,
            }}
            {...props}
          />
        )
      })}
    </g>
  )
}

export default memo(Donut)

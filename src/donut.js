import React, { memo } from 'react'
import { arc, pie } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { Box } from 'theme-ui'
import { getPropAtIndex } from './utils'

const Donut = ({
  data,
  innerRadius = 0.3,
  outerRadius = 50,
  opacity,
  color = 'primary',
  sx,
}) => {
  const arcs = pie()(data)
  const generator = arc()
    .innerRadius(innerRadius * 100)
    .outerRadius(outerRadius)

  let defaultOpacity
  if (opacity == null) {
    const opacityScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0.3, 0.9])
    defaultOpacity = (d, i) => opacityScale(i)
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
              fillOpacity: getPropAtIndex(
                'opacity',
                opacity ?? defaultOpacity,
                data,
                i,
                { index: d.index }
              ),
              fill: getValueAtIndex('color', color, data, i, {
                index: d.index,
              }),
              ...sx,
            }}
          />
        )
      })}
    </g>
  )
}

export default memo(Donut)

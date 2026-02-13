import React, { memo } from 'react'
import { arc, pie, PieArcDatum } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { BoxProps } from 'theme-ui'
import { PathBox } from './svg'

export interface DonutProps extends Omit<BoxProps, 'color'> {
  data: number[]
  domain?: [number, number]
  range?: [number, number]
  innerRadius?: number
  outerRadius?: number
  color?: string
}

const Donut = ({
  data,
  domain,
  range,
  innerRadius = 0.3,
  outerRadius = 50,
  color = 'primary',
  sx,
  ...props
}: DonutProps) => {
  domain = domain || [0, data.length - 1]
  range = range || [0.3, 0.9]
  const arcs = pie<number>()(data)
  const generator = arc<PieArcDatum<number>>()
    .innerRadius(innerRadius * 100)
    .outerRadius(outerRadius)
  const opacity = scaleLinear().domain(domain).range(range)

  return (
    <g transform='translate(50,50)'>
      {arcs.map((d, i) => {
        return (
          <PathBox
            key={i}
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

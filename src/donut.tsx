import React, { memo } from 'react'
import { arc, pie, PieArcDatum } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { BoxProps } from 'theme-ui'
import { PathBox } from './svg'

/** A pie/donut where each value's share of the total sets its arc angle. */
export interface DonutProps extends Omit<BoxProps, 'color'> {
  /**
   * One slice per value; each value's share of the total sets its arc angle.
   * @example data={[10, 20, 30, 40]}
   */
  data: number[]
  /**
   * Slice-index range mapped onto the opacity `range`. Defaults to
   * `[0, data.length - 1]`.
   */
  domain?: [number, number]
  /**
   * Opacity range `[min, max]` applied across slices. Defaults to `[0.3, 0.9]`.
   */
  range?: [number, number]
  /**
   * Inner (hole) radius; the value is multiplied by 100 SVG units, so `0` makes
   * a full pie. Defaults to `0.3` (→ 30 units).
   */
  innerRadius?: number
  /**
   * Outer radius in SVG units. The plot spans 100×100 centered at its middle,
   * so `50` reaches the edge. Defaults to `50`.
   */
  outerRadius?: number
  /**
   * Fill color shared by all slices, which are distinguished by opacity.
   * Defaults to `'primary'`.
   * @example color='secondary'
   */
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

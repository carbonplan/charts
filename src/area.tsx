import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { area, CurveFactory } from 'd3-shape'
import { PathBox } from './svg'
import { DataSeries } from './types'

export interface AreaProps extends Omit<BoxProps, 'color'> {
  data: DataSeries
  color?: string
  /** d3 curve factory, or `false` for linear interpolation. */
  curve?: CurveFactory | false
}

const Area = ({
  data,
  color = 'primary',
  curve = false,
  sx,
  ...props
}: AreaProps) => {
  const { x: _x, y: _y } = useChart()

  let generator = area<number[]>()
    .x((d) => _x(d[0]))
    .y0((d) => (d.length === 3 ? _y(d[1]) : _y(0)))
    .y1((d) => _y(d[d.length - 1]))

  if (curve) {
    generator = generator.curve(curve)
  }

  return (
    <PathBox
      d={generator(data)}
      sx={{
        fill: color,
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Area)

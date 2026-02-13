import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { line, CurveFactory } from 'd3-shape'
import { PathBox } from './svg'

export interface LineProps extends Omit<BoxProps, 'color' | 'width'> {
  data: [number, number][]
  color?: string
  width?: number
  curve?: CurveFactory | false
}

const Line = ({
  data,
  color = 'primary',
  width = 1,
  curve = false,
  sx,
  ...props
}: LineProps) => {
  const { x: _x, y: _y } = useChart()

  let generator = line<[number, number]>()
    .x((d) => _x(d[0]))
    .y((d) => _y(d[1]))

  if (curve) {
    generator = generator.curve(curve)
  }

  return (
    <PathBox
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

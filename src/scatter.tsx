import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'

export interface ScatterProps extends Omit<BoxProps, 'color'> {
  data: number[][]
  x?: (d: number[]) => number
  y?: (d: number[]) => number
  color?: string
  size?: number
}

const Scatter = ({
  data,
  x,
  y,
  color = 'primary',
  size = 10,
  sx,
  ...props
}: ScatterProps) => {
  const { x: _x, y: _y } = useChart()
  x = x || ((d) => d[0])
  y = y || ((d) => d[1])

  const path = data.map((d) => `M${_x(x(d))},${_y(y(d))} l0.01,0.01`).join(' ')

  return (
    <PathBox
      d={path}
      sx={{
        stroke: color,
        strokeWidth: size,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Scatter)

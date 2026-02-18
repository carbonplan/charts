import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'
import { Datum } from './types'

export interface ScatterProps extends Omit<BoxProps, 'color'> {
  data: Datum[]
  color?: string
  size?: number
}

const Scatter = ({
  data,
  color = 'primary',
  size = 10,
  sx,
  ...props
}: ScatterProps) => {
  const { x: _x, y: _y } = useChart()

  const path = data.map((d) => `M${_x(d[0])},${_y(d[1])} l0.01,0.01`).join(' ')

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

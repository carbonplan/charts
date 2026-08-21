import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { LineBox } from './svg'

/** A single circular marker at a point in data space. */
export interface CircleProps extends Omit<BoxProps, 'color'> {
  /** X coordinate in data space. */
  x: number
  /** Y coordinate in data space. */
  y: number
  /**
   * Marker color: a theme-ui color key or any CSS color. Defaults to
   * `'primary'`.
   * @example color='secondary'
   */
  color?: string
  /** Marker diameter in pixels. Defaults to `10`. */
  size?: number
}

const Circle = ({
  x,
  y,
  color = 'primary',
  size = 10,
  sx,
  ...props
}: CircleProps) => {
  const { x: _x, y: _y } = useChart()

  return (
    <LineBox
      x1={`${_x(x)}`}
      x2={`${_x(x) + 0.00001}`}
      y1={`${_y(y)}`}
      y2={`${_y(y) + 0.00001}`}
      sx={{
        stroke: color,
        strokeWidth: size,
        strokeLinecap: 'round',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Circle)

import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'
import { Datum } from './types'

/** A cloud of point markers. */
export interface ScatterProps extends Omit<BoxProps, 'color'> {
  /**
   * One marker per point, in `[x, y]` form.
   * @example data={[[100, 50], [0, 100], [25, 60]]}
   */
  data: Datum[]
  /**
   * Marker color: a theme-ui color key or any CSS color. Defaults to
   * `'primary'`.
   * @example color='secondary'
   */
  color?: string
  /** Marker diameter in pixels. Defaults to `10`. */
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

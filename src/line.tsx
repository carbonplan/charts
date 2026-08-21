import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { line, CurveFactory } from 'd3-shape'
import { PathBox } from './svg'
import { Datum } from './types'

/** A connected line through a series of points. */
export interface LineProps extends Omit<BoxProps, 'color' | 'width'> {
  /**
   * Points along the line, in `[x, y]` form.
   * @example data={[[0, 5], [1, 8], [2, 3]]}
   */
  data: Datum[]
  /**
   * Stroke color: a theme-ui color key or any CSS color. Defaults to
   * `'primary'`.
   * @example color='secondary'
   */
  color?: string
  /** Stroke width in pixels. Defaults to `1`. */
  width?: number
  /**
   * A d3 curve factory used to interpolate between points, or `false` for
   * straight segments. Defaults to `false`.
   * @example
   * import { curveMonotoneX } from 'd3-shape'
   * <Line data={data} curve={curveMonotoneX} />
   */
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

  let generator = line<Datum>()
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

import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { area, CurveFactory } from 'd3-shape'
import { PathBox } from './svg'
import { DataSeries } from './types'

/** A filled area between a lower and upper bound across x. */
export interface AreaProps extends Omit<BoxProps, 'color'> {
  /**
   * Points defining the filled area. Each point is either `[x, y]` (filled from
   * 0 up to y) or `[x, y0, y1]` (filled between y0 and y1).
   * @example
   * // area from the x-axis up to each y
   * data={[[0, 5], [1, 8], [2, 3]]}
   * @example
   * // banded area between a lower and upper bound (e.g. an uncertainty range)
   * data={[[0, 2, 5], [1, 3, 8], [2, 1, 4]]}
   */
  data: DataSeries
  /**
   * Fill color: a theme-ui color key or any CSS color. Defaults to `'primary'`.
   * @example color='secondary'
   * @example color='#7eb36a'
   */
  color?: string
  /**
   * A d3 curve factory used to interpolate between points, or `false` for
   * straight segments. Defaults to `false`.
   * @example
   * import { curveMonotoneX } from 'd3-shape'
   * <Area data={data} curve={curveMonotoneX} />
   */
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

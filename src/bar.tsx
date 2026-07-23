import React, { memo, useMemo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'
import { DataSeries } from './types'

/** Vertical or horizontal bars, one per data point. */
export interface BarProps extends Omit<BoxProps, 'color' | 'width'> {
  /**
   * One bar per point. Each point is `[x, y]` (bar from 0 to y) or
   * `[x, y0, y1]` (floating bar between y0 and y1).
   * @example
   * data={[[0, 5], [1, 8], [2, 3]]}
   * @example
   * // floating bars between a lower and upper value
   * data={[[0, 2, 5], [1, 3, 8]]}
   */
  data: DataSeries
  /**
   * Bar thickness as a fraction of the spacing between adjacent bars, from 0 to
   * 1. Defaults to `0.8`.
   * @example width={0.5}
   */
  width?: number
  /** Orientation of the bars. Defaults to `'vertical'`. */
  direction?: 'vertical' | 'horizontal'
  /**
   * A single color for every bar, or one color per bar (array length must equal
   * `data.length`). Each value is a theme-ui color key or CSS color. Defaults to
   * `'primary'`.
   * @example color='secondary'
   * @example color={['red', 'orange', 'yellow']}
   */
  color?: string | string[]
}

const Bar = ({
  data,
  width = 0.8,
  direction = 'vertical',
  color = 'primary',
  sx,
  ...props
}: BarProps) => {
  const { x: _x, y: _y } = useChart()

  const flipped = direction === 'horizontal'

  const xValues = data.map((d) => d[0])
  const minDelta = useMemo(() => {
    if (xValues.length < 2) return 0
    return xValues
      .sort((a, b) => a - b)
      .slice(1)
      .reduce((min: number | null, el, i) => {
        const transform = flipped ? _y : _x
        const diff = Math.abs(transform(el) - transform(xValues[i]))
        if (typeof min !== 'number' || diff < min) {
          return diff
        } else {
          return min
        }
      }, null) as number
  }, [xValues.join(','), direction, _x, _y])
  const fixedWidth = minDelta * width
  if (Array.isArray(color) && color.length !== data.length) {
    throw new Error(
      `Unexpected color array provided. Expected length ${data.length}, received length ${color.length}`
    )
  }

  return (
    <>
      {data.map((d, i) => {
        const fixedPosition = flipped ? _y(d[0]) : _x(d[0])
        const varying = [d.length === 3 ? d[1] : 0, d[d.length - 1]]
        const varyingPositions = varying.map(flipped ? _x : _y)
        const lower = Math.min(...varyingPositions)
        const upper = Math.max(...varyingPositions)

        const position = [`${fixedPosition - fixedWidth / 2}`, `${lower}`] // x, y
        const dimensions: (string | number)[] = [fixedWidth, `${upper - lower}`] // width, height

        if (flipped) {
          position.reverse()
          dimensions.reverse()
        }

        const [x, y] = position
        const [barWidth, height] = dimensions

        const colorString = typeof color === 'string' ? color : color[i]

        return (
          <PathBox
            key={i}
            d={`M ${x} ${y} h ${barWidth} v ${height} h -${barWidth} Z`}
            sx={{
              fill: colorString,
              stroke: 'none',
              ...sx,
            }}
            {...props}
          />
        )
      })}
    </>
  )
}

export default memo(Bar)

import React, { memo, useMemo } from 'react'
import { scaleLinear } from 'd3-scale'

import Bar, { BarProps } from './bar'
import { RangeDatum, StackedDatum } from './types'

/** Bars split into stacked segments defined by consecutive y boundaries. */
export interface StackedBarProps
  extends Omit<BarProps, 'data' | 'color' | 'width' | 'ref'> {
  /**
   * One row per bar. Each row is `[x, ...yBoundaries]` with two or more
   * boundaries; consecutive boundaries become stacked segments.
   * @example
   * // x, then boundaries 0 -> 2 -> 5 -> 9 (three segments per bar)
   * data={[[0, 0, 2, 5, 9], [1, 0, 3, 6, 10]]}
   */
  data: StackedDatum[]
  /**
   * Segment colors, in one of three shapes:
   * - `string` — one color for every segment, distinguished by opacity.
   * - `string[]` — one color per segment (length = segments per bar).
   * - `string[][]` — a color for each segment of each bar (outer length =
   *   `data.length`, each inner length = segments per bar).
   *
   * Defaults to `'primary'`.
   * @example color='purple'
   * @example color={['pink', 'red', 'orange']}
   * @example
   * // fully custom: a color for every segment of every bar
   * color={data.map((row) => row.slice(2).map(() => randomColor()))}
   */
  color?: string | string[] | string[][]
  /**
   * Opacity range `[min, max]` applied across segments when `color` is a single
   * string. Defaults to `[0.3, 0.9]`.
   */
  range?: [number, number]
  /**
   * Bar thickness as a fraction of the spacing between adjacent bars (0–1).
   * Defaults to `0.8`.
   */
  width?: number
}

const isFlatStringArray = (c: string[] | string[][]): c is string[] =>
  c.every((item) => typeof item === 'string')

const getBarColors = (
  color: string | string[] | string[][],
  barLength: number,
  dataLength: number,
  opacityRange: [number, number]
): { colors: (string | string[])[]; opacities: number[] } => {
  let colors: (string | string[])[]
  let opacities: number[] = []
  if (typeof color === 'string') {
    // single color for all bars has been provided, use same color with different opacity per bar
    colors = new Array(barLength).fill(color)
    const opacity = scaleLinear<number, number>()
      .domain([barLength - 1, 0])
      .range(opacityRange)
    opacities = new Array(barLength).fill(null).map((_, i) => opacity(i))
  } else if (isFlatStringArray(color)) {
    // color has been specified for each bar
    if (color.length !== barLength) {
      throw new Error(
        `Unexpected 1D color array provided. Expected length equal to number of bars: ${barLength}, received length: ${color.length}`
      )
    }
    colors = color
  } else {
    // color has been specified for each datum
    if (color.length !== dataLength) {
      throw new Error(
        `Unexpected 2D color array provided. Expected length equal to data: ${dataLength}, received length: ${color.length}`
      )
    }
    const invalidSubarray = color.find((c) => c.length !== barLength)
    if (invalidSubarray) {
      throw new Error(
        `Unexpected 2D color array provided. Expected all subarrays to have length equal to number of bars: ${barLength}, received length: ${invalidSubarray.length}`
      )
    }

    colors = color.reduce<string[][]>(
      (accum, datum) => {
        datum.forEach((barColor, i) => accum[i].push(barColor))
        return accum
      },
      new Array(barLength).fill(null).map(() => [])
    )
  }

  return { colors, opacities }
}

const StackedBar = ({
  data,
  color = 'primary',
  range,
  sx,
  ...props
}: StackedBarProps) => {
  const bars = useMemo(() => {
    const stackedData: RangeDatum[][] = data[0].slice(2).map(() => [])
    return data.reduce((accum, datum) => {
      const [x, ...yValues] = datum

      if (yValues.length - 1 !== accum.length) {
        throw new Error(
          `Mismatching number of y values provided. Expected ${
            accum.length + 1
          } y values, received ${yValues.length}.`
        )
      }

      yValues.sort((a, b) => a - b)
      yValues.slice(1).forEach((_, i) => {
        accum[i].push([x, yValues[i], yValues[i + 1]])
      })

      return accum
    }, stackedData)
  }, [data])

  const { colors, opacities } = useMemo(
    () => getBarColors(color, bars.length, data.length, range || [0.3, 0.9]),
    [color, bars.length, data.length, range]
  )

  return (
    <>
      {bars.map((bar, i) => {
        return (
          <Bar
            key={i}
            data={bar}
            color={colors[i]}
            sx={{ fillOpacity: opacities[i], ...sx }}
            {...props}
          />
        )
      })}
    </>
  )
}

export default memo(StackedBar)

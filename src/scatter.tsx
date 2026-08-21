import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'
import { Datum } from './types'

interface ScatterCoreProps<T> extends Omit<BoxProps, 'color'> {
  /**
   * One marker per datum, in `[x, y]` form or any shape the `x` and `y`
   * accessors can read.
   * @example data={[[100, 50], [0, 100], [25, 60]]}
   * @example data={[{ x: 100, y: 50 }, { x: 0, y: 100 }]}
   */
  data: T[]
  /**
   * Maps a datum to its x value. Defaults to the first tuple entry.
   * @example x={(d) => d.x}
   */
  x?: (d: T) => number
  /**
   * Maps a datum to its y value. Defaults to the second tuple entry.
   * @example y={(d) => d.y}
   */
  y?: (d: T) => number
  /**
   * Marker color: a theme-ui color key or any CSS color. Defaults to
   * `'primary'`.
   * @example color='secondary'
   */
  color?: string
  /** Marker diameter in pixels. Defaults to `10`. */
  size?: number
}

type ScatterAccessorProps<T> = ScatterCoreProps<T> & {
  x: (d: T) => number
  y: (d: T) => number
}

/**
 * Point markers, one per data point. The `x` and `y` accessors are optional
 * for `[x, y]` tuple data and required for any other datum type, such as
 * `{ x, y }` objects.
 */
export type ScatterProps<T = Datum> = [T] extends [Datum]
  ? ScatterCoreProps<T>
  : ScatterAccessorProps<T>

interface ScatterComponent {
  <T extends Datum>(props: ScatterCoreProps<T>): React.ReactElement
  <T>(props: ScatterAccessorProps<T>): React.ReactElement
}

const Scatter = <T,>({
  data,
  x,
  y,
  color = 'primary',
  size = 10,
  sx,
  ...props
}: ScatterCoreProps<T>) => {
  const { x: _x, y: _y } = useChart()

  const xAccessor = x ?? ((d: T) => (d as Datum)[0])
  const yAccessor = y ?? ((d: T) => (d as Datum)[1])

  const path = data
    .map((d) => `M${_x(xAccessor(d))},${_y(yAccessor(d))} l0.01,0.01`)
    .join(' ')

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

export default memo(Scatter) as ScatterComponent

import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'

type ScatterTuple = readonly number[]
type ScatterObject = Record<string, number>
type ScatterDatum = ScatterTuple | ScatterObject
type ScatterBaseProps<T extends ScatterDatum> = Omit<BoxProps, 'color'> & {
  data: T[]
  color?: string
  size?: number
}

export type ScatterTupleProps = ScatterBaseProps<ScatterTuple> & {
  x?: (d: ScatterTuple) => number
  y?: (d: ScatterTuple) => number
}

export type ScatterObjectProps = ScatterBaseProps<ScatterObject> & {
  x: (d: ScatterObject) => number
  y: (d: ScatterObject) => number
}

export type ScatterProps = ScatterTupleProps | ScatterObjectProps

const tupleCoordinate = (d: ScatterDatum, index: 0 | 1) => {
  if (Array.isArray(d) && typeof d[index] === 'number') return d[index]
  throw new Error(
    'Scatter: default accessors require tuple data like [x, y]. For object data, pass both x and y accessors.'
  )
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
  const xAccessor =
    (x as ((d: ScatterDatum) => number) | undefined) ||
    ((d: ScatterDatum) => tupleCoordinate(d, 0))
  const yAccessor =
    (y as ((d: ScatterDatum) => number) | undefined) ||
    ((d: ScatterDatum) => tupleCoordinate(d, 1))

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

export default memo(Scatter)

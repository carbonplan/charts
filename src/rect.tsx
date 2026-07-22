import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'

/** A filled rectangle spanning a range in x and y. */
export interface RectProps extends Omit<BoxProps, 'color'> {
  /**
   * Horizontal extent in data space, as `[x0, x1]`. Order does not matter.
   * @example x={[10, 40]}
   */
  x: [number, number]
  /**
   * Vertical extent in data space, as `[y0, y1]`. Order does not matter.
   * @example y={[0, 25]}
   */
  y: [number, number]
  /**
   * Fill color: a theme-ui color key or any CSS color. Defaults to `'primary'`.
   * @example color='muted'
   */
  color?: string
}

const Rect = ({ x, y, color = 'primary', sx, ...props }: RectProps) => {
  const { x: _x, y: _y } = useChart()

  const sortedX: [number, number] = x[0] > x[1] ? [x[1], x[0]] : x
  const sortedY: [number, number] = y[0] > y[1] ? [y[1], y[0]] : y

  const width = Math.abs(sortedX[1] - sortedX[0])
  const height = Math.abs(sortedY[1] - sortedY[0])

  const h = _x(sortedX[0] + width) - _x(sortedX[0])
  const v = _y(sortedY[0]) - _y(sortedY[0] + height)

  return (
    <PathBox
      d={`M ${_x(sortedX[0])} ${_y(sortedY[1])} h ${h} v ${v} h -${h} Z`}
      sx={{
        fill: color,
        stroke: 'none',
        ...sx,
      }}
      {...props}
    />
  )
}

export default memo(Rect)

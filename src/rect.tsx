import React, { memo } from 'react'
import { BoxProps } from 'theme-ui'
import { useChart } from './chart'
import { PathBox } from './svg'

export interface RectProps extends Omit<BoxProps, 'color'> {
  x: [number, number]
  y: [number, number]
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

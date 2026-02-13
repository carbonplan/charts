import React, { memo } from 'react'
import { get, useThemeUI } from 'theme-ui'
import { useChart } from './chart'

export interface RectProps
  extends Omit<React.SVGProps<SVGPathElement>, 'x' | 'y'> {
  x: [number, number]
  y: [number, number]
  color?: string
}

const Rect = ({ x, y, color = 'primary', ...props }: RectProps) => {
  const { x: _x, y: _y } = useChart()
  const { theme } = useThemeUI()

  if (x[0] > x[1]) {
    x = [x[1], x[0]]
  }

  if (y[0] > y[1]) {
    y = [y[1], y[0]]
  }

  const width = Math.abs(x[1] - x[0])
  const height = Math.abs(y[1] - y[0])

  const h = _x(x[0] + width) - _x(x[0])
  const v = _y(y[0]) - _y(y[0] + height)
  return (
    <path
      d={`M ${_x(x[0])} ${_y(y[1])} h ${h} v ${v} h -${h} Z`}
      fill={get(theme, `rawColors.${color}`, color)}
      stroke='none'
      {...props}
    />
  )
}

export default memo(Rect)

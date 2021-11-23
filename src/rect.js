import React, { memo } from 'react'
import { useThemeUI } from 'theme-ui'
import { useChart } from './chart'

const Rect = ({ x, y, color = 'primary', ...props }) => {
  const { x: _x, y: _y } = useChart()
  const { theme } = useThemeUI()

  if (x[0] > x[1]) {
    x = x.reverse()
  }

  if (y[0] > y[1]) {
    y = y.reverse()
  }

  const width = Math.abs(x[1] - x[0])
  const height = Math.abs(y[1] - y[0])

  const h = _x(x[0] + width) - _x(x[0])
  const v = _y(y[0]) - _y(y[0] + height)
  return (
    <path
      d={`M ${_x(x[0])} ${_y(y[1])} h ${h} v ${v} h -${h} Z`}
      fill={theme.rawColors[color] || color}
      stroke='none'
      {...props}
    />
  )
}

export default memo(Rect)

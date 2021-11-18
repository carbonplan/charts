import React, { memo } from 'react'
import { useChart } from './chart'

import Rect from './rect'

const Bar = ({
  data,
  width = 1,
  direction = 'horizontal',
  color = 'primary',
  sx,
}) => {
  const { x: _x } = useChart()

  const minDelta = data
    .sort()
    .slice(1)
    .reduce((min, el, i) => {
      const diff = Math.abs(_x(el[0]) - _x(data[i][0]))
      if (typeof min !== 'number' || diff < min) {
        return diff
      } else {
        return min
      }
    }, null)

  const offset = (minDelta / 2) * width

  if (Array.isArray(color) && color.length !== data.length) {
    throw new Error(
      `Unexpected color array provided. Expected length ${data.length}, received length ${color.length}`
    )
  }

  return (
    <>
      {data.map(([x, y1, y0], i) => (
        <Rect
          key={i}
          x={[_x.invert(_x(x) - offset), _x.invert(_x(x) + offset)]}
          y={[y0 || 0, y1]}
          color={typeof color === 'string' ? color : color[i]}
          sx={sx}
        />
      ))}
    </>
  )
}

export default memo(Bar)

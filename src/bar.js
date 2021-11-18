import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Bar = ({
  data,
  width = 1,
  direction = 'horizontal',
  color = 'primary',
  sx,
}) => {
  const { x: _x, y: _y } = useChart()

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

  const fixedWidth = minDelta * width

  if (Array.isArray(color) && color.length !== data.length) {
    throw new Error(
      `Unexpected color array provided. Expected length ${data.length}, received length ${color.length}`
    )
  }

  return (
    <>
      {data.map(([x, y1, y0 = 0], i) => {
        const lower = Math.min(y0, y1)
        const upper = Math.max(y0, y1)
        return (
          <Box
            as='rect'
            key={i}
            x={`${_x(x) - fixedWidth / 2}`}
            y={`${_y(upper)}`}
            width={fixedWidth}
            height={`${_y(lower) - _y(upper)}`}
            sx={{
              fill: typeof color === 'string' ? color : color[i],
              stroke: 'none',
              ...sx,
            }}
          />
        )
      })}
    </>
  )
}

export default memo(Bar)

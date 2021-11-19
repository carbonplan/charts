import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Bar = ({
  data,
  width = 1,
  direction = 'vertical',
  color = 'primary',
  sx,
}) => {
  const { x: _x, y: _y } = useChart()
  const flipped = direction === 'horizontal'

  const minDelta = data
    .sort()
    .slice(1)
    .reduce((min, el, i) => {
      const transform = flipped ? _y : _x
      const diff = Math.abs(transform(el[0]) - transform(data[i][0]))
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
      {data.map((d, i) => {
        const fixed = d[0]
        const varying = [d.length === 3 ? d[1] : 0, d[d.length - 1]]
        const lower = Math.min(...varying)
        const upper = Math.max(...varying)

        return (
          <Box
            as='rect'
            key={i}
            x={flipped ? `${_x(lower)}` : `${_x(fixed) - fixedWidth / 2}`}
            y={flipped ? `${_y(fixed) - fixedWidth / 2}` : `${_y(upper)}`}
            width={flipped ? `${_x(upper) - _x(lower)}` : fixedWidth}
            height={flipped ? fixedWidth : `${_y(lower) - _y(upper)}`}
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

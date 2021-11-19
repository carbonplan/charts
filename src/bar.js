import React, { memo } from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const Bar = ({
  data,
  width = 0.8,
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
        const fixedPosition = flipped ? _y(d[0]) : _x(d[0])
        const varying = [d.length === 3 ? d[1] : 0, d[d.length - 1]]
        const varyingPositions = varying.map(flipped ? _x : _y)
        const lower = Math.min(...varyingPositions)
        const upper = Math.max(...varyingPositions)

        const props = {
          x: `${fixedPosition - fixedWidth / 2}`,
          y: `${lower}`,
          width: fixedWidth,
          height: `${upper - lower}`,
        }

        return (
          <Box
            as='rect'
            key={i}
            x={flipped ? props.y : props.x}
            y={flipped ? props.x : props.y}
            width={flipped ? props.height : props.width}
            height={flipped ? props.width : props.height}
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

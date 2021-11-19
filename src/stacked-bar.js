import React, { memo } from 'react'
import { scaleLinear } from 'd3-scale'

import Bar from './bar'

const StackedBar = ({
  data,
  color = 'primary',
  range = [0.3, 0.9],
  sx,
  ...props
}) => {
  const stackedData = data[0].slice(2).map(() => [])
  const bars = data.reduce((accum, datum) => {
    const [x, ...yValues] = datum

    if (yValues.length - 1 !== accum.length) {
      throw new Error(
        `Mismatching number of y values provided. Expected ${
          accum.length + 1
        } y values, received ${yValues.length}.`
      )
    }

    yValues.sort((a, b) => a - b)
    yValues.slice(1).forEach((_, i) => {
      accum[i].push([x, yValues[i], yValues[i + 1]])
    })

    return accum
  }, stackedData)

  if (Array.isArray(color) && color.length !== stackedData.length) {
    throw new Error(
      `Unexpected color array provided. Expected length ${stackedData.length}, received length ${color.length}`
    )
  }
  const opacity = scaleLinear()
    .domain([bars.length - 1, 0])
    .range(range)

  return (
    <>
      {bars.map((bar, i) => (
        <Bar
          {...props}
          key={i}
          data={bar}
          color={typeof color === 'string' ? color : color[i]}
          sx={{
            fillOpacity: typeof color === 'string' ? opacity(i) : undefined,
            ...sx,
          }}
        />
      ))}
    </>
  )
}

export default memo(StackedBar)

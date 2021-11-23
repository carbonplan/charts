import React, { memo, useMemo } from 'react'
import { scaleLinear } from 'd3-scale'

import Bar from './bar'

const getBarColors = (color, barLength, dataLength, opacityRange) => {
  let colors
  let opacities = []
  if (typeof color === 'string') {
    // single color for all bars has been provided, use same color with different opacity per bar
    colors = new Array(barLength).fill(color)
    const opacity = scaleLinear()
      .domain([barLength - 1, 0])
      .range(opacityRange)
    opacities = new Array(barLength).fill(null).map((_, i) => opacity(i))
  } else if (color.every((c) => typeof c === 'string')) {
    // color has been specified for each bar
    if (color.length !== barLength) {
      throw new Error(
        `Unexpected 1D color array provided. Expected length equal to number of bars: ${barLength}, received length: ${color.length}`
      )
    }
    colors = color
  } else {
    // color has been specified for each datum
    if (color.length !== dataLength) {
      throw new Error(
        `Unexpected 2D color array provided. Expected length equal to data: ${dataLength}, received length: ${color.length}`
      )
    }
    const invalidSubarray = color.find((c) => c.length !== barLength)
    if (invalidSubarray) {
      throw new Error(
        `Unexpected 2D color array provided. Expected all subarrays to have length equal to number of bars: ${barLength}, received length: ${invalidSubarray.length}`
      )
    }

    colors = color.reduce(
      (accum, datum) => {
        datum.forEach((barColor, i) => accum[i].push(barColor))
        return accum
      },
      new Array(barLength).fill(null).map(() => [])
    )
  }

  return { colors, opacities }
}

const StackedBar = ({ data, color = 'primary', range, ...props }) => {
  const bars = useMemo(() => {
    const stackedData = data[0].slice(2).map(() => [])
    return data.reduce((accum, datum) => {
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
  }, [data])

  const { colors, opacities } = useMemo(
    () => getBarColors(color, bars.length, data.length, range || [0.3, 0.9]),
    [color, bars.length, data.length, range]
  )

  return (
    <>
      {bars.map((bar, i) => {
        return (
          <Bar
            key={i}
            data={bar}
            color={colors[i]}
            fillOpacity={opacities[i]}
            {...props}
          />
        )
      })}
    </>
  )
}

export default memo(StackedBar)

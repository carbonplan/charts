import React, { memo, useMemo } from 'react'
import { scaleLinear } from 'd3-scale'

import Bar from './bar'

const normalizeProps = (props, barLength, dataLength) => {
  return Object.keys(props).reduce((accum, propName) => {
    const prop = props[propName]
    if (!Array.isArray(prop)) {
      // single prop for all bars has been provided, use same prop with different opacity per bar
      accum[propName] = new Array(barLength).fill(prop)
    } else if (prop.every((p) => !Array.isArray(p))) {
      // prop has been specified for each bar
      if (prop.length !== barLength) {
        throw new Error(
          `Unexpected 1D ${propName} array provided. Expected length equal to number of bars: ${barLength}, received length: ${prop.length}`
        )
      }

      accum[propName] = prop
    } else {
      // prop has been specified for each datum
      if (prop.length !== dataLength) {
        throw new Error(
          `Unexpected 2D ${propName} array provided. Expected length equal to data: ${dataLength}, received length: ${prop.length}`
        )
      }
      const invalidSubarray = prop.find((p) => p.length !== barLength)
      if (invalidSubarray) {
        throw new Error(
          `Unexpected 2D ${propName} array provided. Expected all subarrays to have length equal to number of bars: ${barLength}, received length: ${invalidSubarray.length}`
        )
      }

      accum[propName] = prop.reduce(
        (accum, datum) => {
          datum.forEach((barProp, i) => accum[i].push(barProp))
          return accum
        },
        new Array(barLength).fill(null).map(() => [])
      )
    }

    return accum
  }, {})
}

const getBarColors = (color, opacity, barLength, dataLength) => {
  const normalized = normalizeProps({ color, opacity }, barLength, dataLength)

  // if same opacity and color provided, use same color with different opacity per bar
  if (!Array.isArray(color) && !Array.isArray(opacity)) {
    const opacityScale = scaleLinear()
      .domain([barLength - 1, 0])
      .range([0.3, 0.9])
    const opacities = new Array(barLength)
      .fill(null)
      .map((_, i) => opacityScale(i))

    return { colors: normalized.color, opacities }
  } else {
    return { colors: normalized.color, opacities: normalized.opacity }
  }
}

const StackedBar = ({ data, color = 'primary', opacity, ...props }) => {
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
    () => getBarColors(color, opacity, bars.length, data.length),
    [color, opacity, bars.length, data.length]
  )

  return (
    <>
      {bars.map((bar, i) => {
        return (
          <Bar
            key={i}
            data={bar}
            color={colors[i]}
            opacity={opacities[i]}
            {...props}
          />
        )
      })}
    </>
  )
}

export default memo(StackedBar)

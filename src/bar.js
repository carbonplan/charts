import React, { memo, useMemo } from 'react'
import { useThemeUI } from 'theme-ui'
import { useChart } from './chart'
import { getColorAtIndex, getPropAtIndex } from './utils'

const Bar = ({
  data,
  width = 0.8,
  direction = 'vertical',
  color = 'primary',
  opacity = 1,
  ...props
}) => {
  const { x: _x, y: _y } = useChart()
  const { theme } = useThemeUI()

  const flipped = direction === 'horizontal'

  const xValues = data.map((d) => d[0])
  const minDelta = useMemo(
    () =>
      xValues
        .sort()
        .slice(1)
        .reduce((min, el, i) => {
          const transform = flipped ? _y : _x
          const diff = Math.abs(transform(el) - transform(xValues[i]))
          if (typeof min !== 'number' || diff < min) {
            return diff
          } else {
            return min
          }
        }, null),

    [xValues.join(',')]
  )
  const fixedWidth = minDelta * width

  return (
    <>
      {data.map((d, i) => {
        const fixedPosition = flipped ? _y(d[0]) : _x(d[0])
        const varying = [d.length === 3 ? d[1] : 0, d[d.length - 1]]
        const varyingPositions = varying.map(flipped ? _x : _y)
        const lower = Math.min(...varyingPositions)
        const upper = Math.max(...varyingPositions)

        const position = [`${fixedPosition - fixedWidth / 2}`, `${lower}`] // x, y
        const dimensions = [fixedWidth, `${upper - lower}`] // width, height

        if (flipped) {
          position.reverse()
          dimensions.reverse()
        }

        const [x, y] = position
        const [width, height] = dimensions

        return (
          <path
            key={i}
            d={`M ${x} ${y} h ${width} v ${height} h -${width} Z`}
            fill={getColorAtIndex(color, data, i, {
              colors: theme.rawColors,
            })}
            fillOpacity={getPropAtIndex('opacity', opacity, data, i)}
            stroke='none'
            {...props}
          />
        )
      })}
    </>
  )
}

export default memo(Bar)

import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useChartPadding from './utils/use-chart-padding'

const styles = {
  tick: {
    position: 'absolute',
  },
}

const VerticalTicks = ({ values, x, top, bottom, padding, size, sx }) => {
  let position
  if (top) position = { bottom: `${padding}px` }
  if (bottom) position = { top: `${padding}px` }
  return values.map((d, i) => {
    return (
      <Box
        key={d}
        sx={{
          ...styles.tick,
          left: `${x(d)}%`,
          height: `${size}px`,
          borderColor: 'secondary',
          borderStyle: 'solid',
          borderWidth: '0px',
          borderLeftWidth: '1px',
          ...position,
          ...sx,
        }}
      />
    )
  })
}

const HorizontalTicks = ({ values, y, left, right, padding, size, sx }) => {
  let position
  if (left) position = { right: `${padding}px` }
  if (right) position = { left: `${padding}px` }
  return values.map((d, i) => {
    return (
      <Box
        key={d}
        sx={{
          ...styles.tick,
          top: `${y(d)}%`,
          borderColor: 'secondary',
          borderStyle: 'solid',
          borderWidth: '0px',
          borderTopWidth: '1px',
          width: `${size}px`,
          ...position,
          ...sx,
        }}
      />
    )
  })
}

const Ticks = ({
  left,
  right,
  top,
  bottom,
  count = 5,
  values,
  size = 6,
  padding = 0,
  sx,
}) => {
  const { x, y, logx, logy } = useChart()

  const leftSx = useChartPadding(({ apt, pt, pb, apb, pl }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pl + 1}px`,
  }))

  const rightSx = useChartPadding(({ apt, pt, pb, apb, pr }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pr}px`,
    left: `calc(100% - ${pr + 1}px)`,
  }))

  const bottomSx = useChartPadding(({ pb, apl, pl, pr, apr }) => ({
    height: `${pb}px`,
    width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
    left: `${apl + pl}px`,
  }))
  const topSx = useChartPadding(({ pt, apl, pl, pr, apr }) => ({
    height: `${pt}px`,
    width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
    left: `${apl + pl}px`,
  }))

  values = getTicks({ values, count, logx, logy, x, y })

  return (
    <>
      {left && (
        <Box
          sx={{
            ...leftSx,
            position: 'absolute',
            left: 0,
          }}
        >
          <HorizontalTicks
            left
            values={values.horizontal}
            y={y}
            size={size}
            padding={padding}
            sx={sx}
          />
        </Box>
      )}
      {right && (
        <Box
          sx={{
            ...rightSx,
            position: 'absolute',
          }}
        >
          <HorizontalTicks
            right
            values={values.horizontal}
            y={y}
            size={size}
            padding={padding}
            sx={sx}
          />
        </Box>
      )}
      {bottom && (
        <Box
          sx={{
            ...bottomSx,
            position: 'absolute',
            bottom: '0px',
          }}
        >
          <VerticalTicks
            bottom
            values={values.vertical}
            x={x}
            size={size}
            padding={padding}
            sx={sx}
          />
        </Box>
      )}
      {top && (
        <Box
          sx={{
            ...topSx,
            position: 'absolute',
            top: `1px`,
          }}
        >
          <VerticalTicks
            top
            values={values.vertical}
            x={x}
            size={size}
            padding={padding}
            sx={sx}
          />
        </Box>
      )}
    </>
  )
}

export default Ticks

import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'

const styles = {
  tick: {
    position: 'absolute',
    fontSize: [0],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'secondary',
    userSelect: 'none',
  },
}

const VerticalTickLabels = ({ values, x, top, bottom, padding, sx }) => {
  let position
  if (top) position = { bottom: `${padding}px` }
  if (bottom) position = { top: `${padding}px` }
  return values.map((d, i) => {
    return (
      <Box
        as='span'
        key={d}
        sx={{
          ...styles.tick,
          left: `${x(d)}%`,
          transform: 'translateX(calc(-50% + 1px))',
          ...position,
          ...sx,
        }}
      >
        {d}
      </Box>
    )
  })
}

const HorizontalTickLabels = ({ values, y, left, right, padding, sx }) => {
  let position
  if (left) position = { right: `${padding + 4}px` }
  if (right) position = { left: `${padding + 4}px` }
  return values.map((d, i) => {
    return (
      <Box
        as='span'
        key={d}
        sx={{
          ...styles.tick,
          top: `${y(d)}%`,
          right: '0',
          transform: 'translateY(-50%)',
          ...position,
          ...sx,
        }}
      >
        {d}
      </Box>
    )
  })
}

const TickLabels = ({
  left,
  right,
  top,
  bottom,
  count,
  values,
  padding = 8,
  sx,
}) => {
  const { x, y, log, pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

  count = count == null ? (log ? 2 : 5) : count

  values = getTicks({ values, count, log, x, y })

  return (
    <>
      {left && (
        <Box
          sx={{
            position: 'absolute',
            top: `${apt + pt}px`,
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            width: `${pl}px`,
            left: 0,
          }}
        >
          <HorizontalTickLabels
            left
            values={values.horizontal}
            padding={padding}
            y={y}
            sx={sx}
          />
        </Box>
      )}
      {right && (
        <Box
          sx={{
            position: 'absolute',
            top: `${apt + pt}px`,
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            width: `${pr}px`,
            left: `calc(100% - ${pr}px)`,
          }}
        >
          <HorizontalTickLabels
            right
            values={values.horizontal}
            padding={padding}
            y={y}
            sx={sx}
          />
        </Box>
      )}
      {bottom && (
        <Box
          sx={{
            position: 'absolute',
            height: `${pb}px`,
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            left: `${apl + pl}px`,
            bottom: '0px',
          }}
        >
          <VerticalTickLabels
            bottom
            values={values.vertical}
            padding={padding}
            x={x}
            sx={sx}
          />
        </Box>
      )}
      {top && (
        <Box
          sx={{
            position: 'absolute',
            height: `${pt}px`,
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            left: `${apl + pl}px`,
            top: `0px`,
          }}
        >
          <VerticalTickLabels
            top
            values={values.vertical}
            padding={padding}
            x={x}
            sx={sx}
          />
        </Box>
      )}
    </>
  )
}

export default TickLabels

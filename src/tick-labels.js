import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useResponsiveStyles from './utils/use-responsive-styles'

const styles = {
  tick: {
    position: 'absolute',
    fontSize: [0, 0, 0, 1],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'secondary',
    userSelect: 'none',
  },
}

const VerticalTickLabels = ({
  values,
  x,
  labels,
  top,
  bottom,
  padding,
  sx,
}) => {
  let position
  if (top)
    position = {
      bottom: [
        `${padding}px`,
        `${padding}px`,
        `${padding}px`,
        `${padding + 1}px`,
      ],
    }
  if (bottom)
    position = {
      top: [`${padding}px`, `${padding}px`, `${padding}px`, `${padding + 1}px`],
    }
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
        {labels[i]}
      </Box>
    )
  })
}

const HorizontalTickLabels = ({
  values,
  y,
  labels,
  left,
  right,
  padding,
  sx,
}) => {
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
          top: [`${y(d)}%`, `${y(d)}%`, `${y(d)}%`, `calc(${y(d)}% + 1px)`],
          right: '0',
          transform: 'translateY(-50%)',
          ...position,
          ...sx,
        }}
      >
        {labels[i]}
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
  labels,
  format,
  padding = 8,
  sx,
}) => {
  const { x, y, logx, logy } = useChart()
  const leftSx = useResponsiveStyles(({ apt, pt, pb, apb, pl }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pl}px`,
  }))
  const rightSx = useResponsiveStyles(({ apt, pt, pb, apb, pr }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pr}px`,
    left: `calc(100% - ${pr}px)`,
  }))
  const bottomSx = useResponsiveStyles(({ pb, apl, pl, pr, apr }) => ({
    height: `${pb}px`,
    width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
    left: `${apl + pl}px`,
  }))
  const topSx = useResponsiveStyles(({ pt, apl, pl, pr, apr }) => ({
    height: `${pt}px`,
    width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
    left: `${apl + pl}px`,
  }))

  const countx = count == null ? (logx ? 2 : 5) : count
  const county = count == null ? (logy ? 2 : 5) : count

  values = getTicks({ values, count, countx, county, logx, logy, x, y })

  if ((left || right) && labels && labels.length !== values.horizontal.length) {
    throw Error(
      `when specfiying labels directly the number of labels must match the number of ticks, got ${labels.length} labels for ${values.horizontal.length} values`
    )
  }

  if ((top || bottom) && labels && labels.length !== values.vertical.length) {
    throw Error(
      `when specfiying labels directly the number of labels must match the number of ticks, got ${labels.length} labels for ${values.vertical.length} values`
    )
  }

  if (format) {
    labels = {
      horizontal: values.horizontal.map((d) => format(d)),
      vertical: values.vertical.map((d) => format(d)),
    }
  } else {
    labels = labels
      ? { vertical: labels, horizontal: labels }
      : { vertical: values.vertical, horizontal: values.horizontal }
  }

  return (
    <>
      {left && (
        <Box
          sx={{
            position: 'absolute',
            ...leftSx,
            left: 0,
          }}
        >
          <HorizontalTickLabels
            left
            values={values.horizontal}
            labels={labels.horizontal}
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
            ...rightSx,
          }}
        >
          <HorizontalTickLabels
            right
            values={values.horizontal}
            labels={labels.horizontal}
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
            ...bottomSx,
            bottom: '0px',
          }}
        >
          <VerticalTickLabels
            bottom
            values={values.vertical}
            labels={labels.vertical}
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
            ...topSx,
            top: `1px`,
          }}
        >
          <VerticalTickLabels
            top
            values={values.vertical}
            labels={labels.vertical}
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

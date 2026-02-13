import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useChartPadding from './utils/use-chart-padding'

export interface TickLabelsProps extends BoxProps {
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  count?: number
  values?: number[]
  labels?: (string | number)[]
  format?: (d: number) => string | number
  padding?: number
}

const styles = {
  tick: {
    position: 'absolute' as const,
    fontSize: [0, 0, 0, 1],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'secondary',
    userSelect: 'none' as const,
  },
}

interface VerticalTickLabelsInternalProps extends Pick<BoxProps, 'sx'> {
  values: number[]
  x: (d: number) => number
  labels: (string | number)[]
  top?: boolean
  bottom?: boolean
  padding: number
}

const VerticalTickLabels = ({
  values,
  x,
  labels,
  top,
  bottom,
  padding,
  sx,
}: VerticalTickLabelsInternalProps) => {
  let position: Record<string, string | string[]> | undefined
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

interface HorizontalTickLabelsInternalProps extends Pick<BoxProps, 'sx'> {
  values: number[]
  y: (d: number) => number
  labels: (string | number)[]
  left?: boolean
  right?: boolean
  padding: number
}

const HorizontalTickLabels = ({
  values,
  y,
  labels,
  left,
  right,
  padding,
  sx,
}: HorizontalTickLabelsInternalProps) => {
  let position: Record<string, string> | undefined
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
  values: valuesProp,
  labels: labelsProp,
  format,
  padding = 8,
  sx,
}: TickLabelsProps) => {
  const { x, y, logx, logy } = useChart()
  const leftSx = useChartPadding(({ apt, pt, pb, apb, pl }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pl}px`,
  }))
  const rightSx = useChartPadding(({ apt, pt, pb, apb, pr }) => ({
    top: `${apt + pt}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    width: `${pr}px`,
    left: `calc(100% - ${pr}px)`,
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

  const countx = count == null ? (logx ? 2 : 5) : count
  const county = count == null ? (logy ? 2 : 5) : count

  const values = getTicks({
    values: valuesProp,
    count,
    countx,
    county,
    logx,
    logy,
    x,
    y,
  })

  if (
    (left || right) &&
    labelsProp &&
    labelsProp.length !== values.horizontal.length
  ) {
    throw Error(
      `when specfiying labels directly the number of labels must match the number of ticks, got ${labelsProp.length} labels for ${values.horizontal.length} values`
    )
  }

  if (
    (top || bottom) &&
    labelsProp &&
    labelsProp.length !== values.vertical.length
  ) {
    throw Error(
      `when specfiying labels directly the number of labels must match the number of ticks, got ${labelsProp.length} labels for ${values.vertical.length} values`
    )
  }

  let labels: {
    horizontal: (string | number)[]
    vertical: (string | number)[]
  }

  if (format) {
    labels = {
      horizontal: values.horizontal.map((d) => format(d)),
      vertical: values.vertical.map((d) => format(d)),
    }
  } else {
    labels = labelsProp
      ? { vertical: labelsProp, horizontal: labelsProp }
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

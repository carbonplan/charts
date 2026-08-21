import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useChartPadding from './utils/use-chart-padding'

/** Tick marks drawn along any combination of the four sides. */
export interface TicksProps extends BoxProps {
  /** Draw ticks along the left (y) axis. */
  left?: boolean
  /** Draw ticks along the right (y) axis. */
  right?: boolean
  /** Draw ticks along the top (x) axis. */
  top?: boolean
  /** Draw ticks along the bottom (x) axis. */
  bottom?: boolean
  /**
   * Approximate number of automatically generated ticks. Ignored when `values`
   * is set. Defaults to `5`.
   */
  count?: number
  /**
   * Explicit tick positions in data space. Overrides `count`. Pass `null` to
   * fall back to automatically generated ticks.
   * @example values={[0, 25, 50, 75, 100]}
   * @example values={log ? [1, 10, 100, 1000] : null}
   */
  values?: number[] | null
  /** Tick length in pixels. Defaults to `6`. */
  size?: number
  /** Gap in pixels between the tick and the axis. Defaults to `0`. */
  padding?: number
}

const styles = {
  tick: {
    position: 'absolute' as const,
  },
}

interface VerticalTicksInternalProps extends Pick<BoxProps, 'sx'> {
  values: number[]
  x: (d: number) => number
  top?: boolean
  bottom?: boolean
  padding: number
  size: number
}

const VerticalTicks = ({
  values,
  x,
  top,
  bottom,
  padding,
  size,
  sx,
}: VerticalTicksInternalProps) => {
  let position: Record<string, string> | undefined
  if (top) position = { bottom: `${padding}px` }
  if (bottom) position = { top: `${padding}px` }
  return values.map((d) => {
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

interface HorizontalTicksInternalProps extends Pick<BoxProps, 'sx'> {
  values: number[]
  y: (d: number) => number
  left?: boolean
  right?: boolean
  padding: number
  size: number
}

const HorizontalTicks = ({
  values,
  y,
  left,
  right,
  padding,
  size,
  sx,
}: HorizontalTicksInternalProps) => {
  let position: Record<string, string> | undefined
  if (left) position = { right: `${padding}px` }
  if (right) position = { left: `${padding}px` }
  return values.map((d) => {
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
  values: valuesProp,
  size = 6,
  padding = 0,
  sx,
}: TicksProps) => {
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

  const values = getTicks({
    values: valuesProp,
    countx: count,
    county: count,
    logx,
    logy,
    x,
    y,
  })

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

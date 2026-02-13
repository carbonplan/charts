import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useChartPadding from './utils/use-chart-padding'

export interface GridProps extends BoxProps {
  horizontal?: boolean
  vertical?: boolean
  count?: number
  values?: number[]
}

const styles = {
  grid: {
    position: 'absolute' as const,
    borderColor: 'muted',
    borderStyle: 'solid',
    borderWidth: '0px',
    opacity: 0.6,
  },
}

interface VerticalGridProps extends BoxProps {
  values: number[]
  x: (d: number) => number
}

interface HorizontalGridProps extends BoxProps {
  values: number[]
  y: (d: number) => number
}

const VerticalGrid = ({ values, x, sx, ...props }: VerticalGridProps) => {
  return values.map((d) => {
    return (
      <Box
        key={d}
        sx={{
          ...styles.grid,
          left: `${x(d)}%`,
          height: `calc(100%)`,
          borderLeftWidth: '1px',
          ...sx,
        }}
        {...props}
      />
    )
  })
}

const HorizontalGrid = ({ values, y, sx, ...props }: HorizontalGridProps) => {
  return values.map((d) => {
    return (
      <Box
        key={d}
        sx={{
          ...styles.grid,
          top: `${y(d)}%`,
          borderTopWidth: '1px',
          width: `calc(100%)`,
          ...sx,
        }}
        {...props}
      />
    )
  })
}

const Grid = ({
  horizontal,
  vertical,
  count = 5,
  values: valuesProp,
  sx,
  ...props
}: GridProps) => {
  const { x, y, logx, logy } = useChart()
  const verticalSx = useChartPadding(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )
  const horizontalSx = useChartPadding(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )
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
      {vertical && (
        <Box
          sx={{
            position: 'absolute',
            ...verticalSx,
          }}
        >
          <VerticalGrid values={values.vertical} x={x} sx={sx} {...props} />
        </Box>
      )}
      {horizontal && (
        <Box
          sx={{
            position: 'absolute',
            ...horizontalSx,
          }}
        >
          <HorizontalGrid values={values.horizontal} y={y} sx={sx} {...props} />
        </Box>
      )}
    </>
  )
}

export default Grid

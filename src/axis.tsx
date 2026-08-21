import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import useChartPadding from './utils/use-chart-padding'

/** Solid axis lines drawn on any combination of the four sides. */
export interface AxisProps extends BoxProps {
  /** Draw the left (y) axis line. */
  left?: boolean
  /** Draw the right (y) axis line. */
  right?: boolean
  /** Draw the top (x) axis line. */
  top?: boolean
  /** Draw the bottom (x) axis line. */
  bottom?: boolean
}

const styles = {
  axis: {
    position: 'absolute' as const,
    borderStyle: 'solid',
    borderColor: 'secondary',
    borderWidth: '0px',
  },
}

const Axis = ({ left, right, top, bottom, sx, ...props }: AxisProps) => {
  const leftSx = useChartPadding(({ apt, pt, pb, apb, pl }) => ({
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    left: `${pl}px`,
    top: `${apt + pt}px`,
  }))
  const rightSx = useChartPadding(({ apt, pt, pb, apb, pr }) => ({
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    right: `${pr}px`,
    top: `${apt + pt}px`,
  }))
  const bottomSx = useChartPadding(({ apl, pl, pb, apr, pr }) => ({
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
    bottom: `${pb - 1}px`,
    left: `${apl + pl}px`,
  }))
  const topSx = useChartPadding(({ apl, pl, pr, apr, pt }) => ({
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
    top: `${pt}px`,
    left: `${apl + pl}px`,
  }))

  return (
    <>
      {left && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            width: '1px',
            ...leftSx,
            ...sx,
          }}
          {...props}
        />
      )}
      {right && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            width: '1px',
            ...rightSx,
            ...sx,
          }}
          {...props}
        />
      )}
      {bottom && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            height: '1px',
            ...bottomSx,
            ...sx,
          }}
          {...props}
        />
      )}
      {top && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            height: '1px',
            ...topSx,
            ...sx,
          }}
          {...props}
        />
      )}
    </>
  )
}

export default Axis

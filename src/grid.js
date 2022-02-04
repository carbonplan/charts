import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'
import useResponsiveStyles from './utils/use-responsive-styles'

const styles = {
  grid: {
    position: 'absolute',
    borderColor: 'muted',
    borderStyle: 'solid',
    borderWidth: '0px',
    opacity: 0.6,
  },
}

const VerticalGrid = ({ values, x, sx }) => {
  return values.map((d, i) => {
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
      />
    )
  })
}

const HorizontalGrid = ({ values, y, sx }) => {
  return values.map((d, i) => {
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
      />
    )
  })
}

const Grid = ({ horizontal, vertical, count = 5, values, sx }) => {
  const { x, y, logx, logy } = useChart()
  const verticalSx = useResponsiveStyles(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )
  const horizontalSx = useResponsiveStyles(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )
  values = getTicks({ values, count, logx, logy, x, y })

  return (
    <>
      {vertical && (
        <Box
          sx={{
            position: 'absolute',
            ...verticalSx,
          }}
        >
          <VerticalGrid values={values.vertical} x={x} sx={sx} />
        </Box>
      )}
      {horizontal && (
        <Box
          sx={{
            position: 'absolute',
            ...horizontalSx,
          }}
        >
          <HorizontalGrid bottom values={values.horizontal} y={y} sx={sx} />
        </Box>
      )}
    </>
  )
}

export default Grid

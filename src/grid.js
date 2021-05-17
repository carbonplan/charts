import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'
import getTicks from './utils/get-ticks'

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
          height: `calc(100% + 1px)`,
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
          width: `calc(100% + 1px)`,
          ...sx,
        }}
      />
    )
  })
}

const Grid = ({ horizontal, vertical, count = 5, values, sx }) => {
  const { x, y, logx, logy, pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

  values = getTicks({ values, count, logx, logy, x, y })

  return (
    <>
      {vertical && (
        <Box
          sx={{
            position: 'absolute',
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            left: `${apl + pl}px`,
            top: `${apt + pt}px`,
          }}
        >
          <VerticalGrid values={values.vertical} x={x} sx={sx} />
        </Box>
      )}
      {horizontal && (
        <Box
          sx={{
            position: 'absolute',
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            left: `${apl + pl}px`,
            top: `${apt + pt}px`,
          }}
        >
          <HorizontalGrid bottom values={values.horizontal} y={y} sx={sx} />
        </Box>
      )}
    </>
  )
}

export default Grid

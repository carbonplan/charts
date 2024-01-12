import React from 'react'
import { Box } from 'theme-ui'
import useChartPadding from './utils/use-chart-padding'

const Plot = ({ children, sx, mode = 'svg', square = false, ...props }) => {
  const responsiveSx = useChartPadding(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr + 1}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )

  return (
    <Box
      sx={{
        ...responsiveSx,
        position: 'absolute',
        transform: `translate(0.5px, 0.5px)`,
      }}
    >
      {mode === 'svg' && (
        <Box
          as='svg'
          height='100%'
          viewBox='0 0 100 100'
          width='100%'
          preserveAspectRatio={square ? 'xMidYMid' : 'none'}
          sx={{
            overflow: 'visible',
            ...sx,
          }}
          {...props}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default Plot

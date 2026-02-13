import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { SvgBox } from './svg'
import useChartPadding from './utils/use-chart-padding'

export interface PlotProps extends BoxProps {
  mode?: 'svg'
  square?: boolean
}

const Plot = ({
  children,
  sx,
  mode = 'svg',
  square = false,
  ...props
}: PlotProps) => {
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
        <SvgBox
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
        </SvgBox>
      )}
    </Box>
  )
}

export default Plot

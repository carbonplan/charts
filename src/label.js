import React from 'react'
import { Box } from 'theme-ui'
import Point from './point'

const Label = ({ x, y, children, sx }) => {
  return (
    <Point x={x} y={y}>
      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [0],
          color: 'secondary',
          ...sx,
        }}
      >
        {children}
      </Box>
    </Point>
  )
}

export default Label

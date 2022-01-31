import React from 'react'
import { Box } from 'theme-ui'
import Point from './point'

const Label = ({ x, y, children, align, verticalAlign, width, height, sx }) => {
  return (
    <Point
      x={x}
      y={y}
      width={width}
      height={height}
      align={align}
      verticalAlign={verticalAlign}
    >
      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [0, 0, 0, 1],
          color: 'secondary',
          textAlign: align,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Point>
  )
}

export default Label

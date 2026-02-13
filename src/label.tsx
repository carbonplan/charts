import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import Point from './point'

export interface LabelProps extends Omit<BoxProps, 'height'> {
  x: number
  y: number
  align?: 'left' | 'right' | 'center'
  verticalAlign?: 'top' | 'middle' | 'bottom'
  width?: number
  height?: number
}

const Label = ({
  x,
  y,
  children,
  align,
  verticalAlign,
  width,
  height,
  sx,
  ...props
}: LabelProps) => {
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
        {...props}
      >
        {children}
      </Box>
    </Point>
  )
}

export default Label

import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import Point, {
  AlignmentConstraint,
  HorizontalAlign,
  VerticalAlign,
} from './point'

interface LabelBaseProps extends Omit<BoxProps, 'height'> {
  /** X coordinate in data space where the label is anchored. */
  x: number
  /** Y coordinate in data space where the label is anchored. */
  y: number
  /** Horizontal anchor relative to (x, y). Defaults to `'left'`. */
  align?: HorizontalAlign
  /** Vertical anchor relative to (x, y). Defaults to `'top'`. */
  verticalAlign?: VerticalAlign
  /** Width in data units. Required when `align` is `'center'`. */
  width?: number
  /** Height in data units. Required when `verticalAlign` is `'middle'`. */
  height?: number
}

/**
 * A styled text label positioned at a point in data space.
 *
 * `width` is required when `align` is `'center'`; `height` is required when
 * `verticalAlign` is `'middle'`.
 */
export type LabelProps = LabelBaseProps & AlignmentConstraint

const Label = (props: LabelProps) => {
  const { x, y, children, sx, ...rest } = props
  return (
    <Point x={x} y={y} {...rest}>
      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [0, 0, 0, 1],
          color: 'secondary',
          textAlign: props.align,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Point>
  )
}

export default Label

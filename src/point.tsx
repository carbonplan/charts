import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { useChart } from './chart'
import useChartPadding from './utils/use-chart-padding'

export type HorizontalAlign = 'left' | 'right' | 'center'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

/**
 * Encodes the runtime rule that centering needs a size: `align: 'center'`
 * requires `width`, and `verticalAlign: 'middle'` requires `height`. Intersect
 * with a component's base props.
 */
export type AlignmentConstraint = (
  | { align?: 'left' | 'right' }
  | { align: 'center'; width: number }
) &
  (
    | { verticalAlign?: 'top' | 'bottom' }
    | { verticalAlign: 'middle'; height: number }
  )

interface PointBaseProps extends BoxProps {
  /** X coordinate in data space where the content is anchored. */
  x: number
  /** Y coordinate in data space where the content is anchored. */
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
 * Positions arbitrary content at a point in data space.
 *
 * `width` is required when `align` is `'center'`; `height` is required when
 * `verticalAlign` is `'middle'`.
 * @example
 * <Point x={50} y={50} align='center' width={10}>...</Point>
 */
export type PointProps = PointBaseProps & AlignmentConstraint

const Point = ({
  x,
  y,
  children,
  align = 'left',
  verticalAlign = 'top',
  width,
  height,
  ...props
}: PointProps) => {
  const { x: _x, y: _y } = useChart()
  const responsiveSx = useChartPadding(
    ({ apt, pt, pb, apb, apl, pl, pr, apr }) => ({
      height: `calc(100% - ${apt + pt + pb + apb}px)`,
      width: `calc(100% - ${apl + pl + pr + apr}px)`,
      left: `${apl + pl}px`,
      top: `${apt + pt}px`,
    })
  )

  let position: Record<string, string> | undefined,
    verticalPosition: Record<string, string> | undefined,
    flexStyles: Record<string, string> = {}

  if (!(['left', 'right', 'center'] as const).includes(align)) {
    throw new Error(
      `'${align}' is not a recognized alignment, must be left, right, or center`
    )
  }

  if (!(['top', 'middle', 'bottom'] as const).includes(verticalAlign)) {
    throw new Error(
      `'${verticalAlign}' is not a recognized vertical alignment, must be top, middle, or bottom`
    )
  }

  if (align === 'center' && !width) {
    throw new Error(`center alignment requires specifying a width`)
  }

  if (verticalAlign === 'middle' && !height) {
    throw new Error(`middle vertical alignment requires specifying a height`)
  }

  if (align === 'left') {
    position = {
      left: `${_x(x)}%`,
    }
  }

  if (align === 'center') {
    position = {
      left: `${_x(x - width! / 2)}%`,
      right: `${100 - _x(x + width! / 2)}%`,
    }
  }

  if (align === 'right') {
    position = {
      right: `${100 - _x(x)}%`,
    }
  }

  if (verticalAlign === 'top') {
    verticalPosition = {
      top: `${_y(y)}%`,
    }
  }

  if (verticalAlign === 'middle') {
    verticalPosition = {
      top: `${_y(y + height! / 2)}%`,
      bottom: `${100 - _y(y - height! / 2)}%`,
    }
    flexStyles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    }
  }

  if (verticalAlign === 'bottom') {
    verticalPosition = {
      bottom: `${100 - _y(y)}%`,
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        ...responsiveSx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          ...position,
          ...verticalPosition,
          ...flexStyles,
        }}
        {...props}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Point

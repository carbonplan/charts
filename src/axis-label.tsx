import React from 'react'
import { Box, BoxProps, Flex } from 'theme-ui'
import Arrow from './arrow'
import useChartPadding from './utils/use-chart-padding'

/** A label with an optional arrow and units, placed along the left or bottom axis. */
export interface AxisLabelProps extends BoxProps {
  /** Render the label along the left (y) axis. */
  left?: boolean
  /** Reserved: right-axis labels are not currently rendered. */
  right?: boolean
  /** Reserved: top-axis labels are not currently rendered. */
  top?: boolean
  /** Render the label along the bottom (x) axis. */
  bottom?: boolean
  /**
   * Secondary unit text shown after the label in a muted color.
   * @example units='kg CO₂'
   */
  units?: React.ReactNode
  /** Show a directional arrow after the label. Defaults to `true`. */
  arrow?: boolean
  /** Text alignment of the label along its axis. Defaults to `'right'`. */
  align?: 'left' | 'right' | 'center'
}

const styles = {
  label: {
    position: 'absolute' as const,
    fontSize: [0, 0, 0, 1],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'primary',
    textTransform: 'uppercase' as const,
    userSelect: 'none' as const,
  },
}

const AxisLabel = ({
  left,
  right: _right,
  top: _top,
  bottom,
  children,
  sx,
  units,
  arrow = true,
  align = 'right',
}: AxisLabelProps) => {
  const bottomSx = useChartPadding(({ apl, pl, pr, apr }) => ({
    left: `${apl + pl + (align === 'right' ? 2 : 0)}px`,
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
  }))
  const leftSx = useChartPadding(({ apb, pb, apt, pt }) => ({
    bottom: `${apb + pb + (align === 'right' ? 2 : 0)}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
  }))
  const alignToFlexVertical: Record<string, string> = {
    left: 'flex-end',
    right: 'flex-start',
    center: 'center',
  }

  const alignToFlex: Record<string, string> = {
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
  }

  const inner = (
    <>
      {children}
      {units && (
        <>
          &nbsp;
          <Box sx={{ textTransform: 'none', color: 'secondary' }}>{units}</Box>
        </>
      )}
    </>
  )

  return (
    <>
      {bottom && (
        <Box
          sx={{
            bottom: [`0px`, `0px`, `0px`, `-4px`],
            textAlign: align,
            ...bottomSx,
            ...styles.label,
            ...sx,
          }}
        >
          <Flex
            sx={{
              alignItems: 'flex-start',
              justifyContent: alignToFlex[align],
            }}
          >
            {inner}
            {arrow && (
              <>
                <Arrow
                  sx={{
                    position: 'relative',
                    top: '3px',
                    ml: ['6px'],
                    width: 11,
                    height: 11,
                    transform: 'rotate(45deg)',
                  }}
                />
              </>
            )}
          </Flex>
        </Box>
      )}
      {left && (
        <Box
          sx={{
            left: '-3px',
            textAlign: align,
            ...leftSx,
            ...styles.label,
            ...sx,
          }}
        >
          <Box
            sx={{
              writingMode: 'vertical-rl',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: alignToFlexVertical[align],
              height: '100%',
            }}
          >
            <Box
              sx={{
                transform: 'rotate(180deg)',
              }}
            >
              <Flex
                sx={{
                  alignItems: 'flex-start',
                  justifyContent: alignToFlex[align],
                }}
              >
                {inner}
                {arrow && (
                  <>
                    <Arrow
                      sx={{
                        position: 'relative',
                        right: '4px',
                        mt: ['6px'],
                        width: 11,
                        height: 11,
                        transform: 'rotate(135deg)',
                      }}
                    />
                  </>
                )}
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default AxisLabel

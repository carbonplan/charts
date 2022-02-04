import React from 'react'
import { Box, Flex } from 'theme-ui'
import Arrow from './arrow'
import useResponsiveStyles from './utils/use-responsive-styles'

const styles = {
  label: {
    position: 'absolute',
    fontSize: [0, 0, 0, 1],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'primary',
    textTransform: 'uppercase',
    userSelect: 'none',
  },
}

const AxisLabel = ({
  left,
  right,
  top,
  bottom,
  children,
  sx,
  units,
  arrow = true,
  align = 'right',
}) => {
  const bottomSx = useResponsiveStyles(({ apl, pl, pr, apr }) => ({
    left: `${apl + pl + (align === 'right' ? 2 : 0)}px`,
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
  }))
  const leftSx = useResponsiveStyles(({ apb, pb, apt, pt }) => ({
    bottom: `${apb + pb + (align === 'right' ? 2 : 0)}px`,
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
  }))
  const alignToFlexVertical = {
    left: 'flex-end',
    right: 'flex-start',
    center: 'center',
  }

  const alignToFlex = {
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
            position: 'absolute',
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
            position: 'absolute',
            left: '-3px',
            textAlign: align,
            ...leftSx,
            ...styles.label,
            ...sx,
          }}
        >
          <Box
            sx={{
              writingMode: 'tb-rl',
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

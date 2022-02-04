import React from 'react'
import { Box } from 'theme-ui'
import useResponsiveStyles from './utils/use-responsive-styles'

const styles = {
  axis: {
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: 'secondary',
    borderWidth: '0px',
  },
}

const Axis = ({ left, right, top, bottom, sx }) => {
  const leftSx = useResponsiveStyles(({ apt, pt, pb, apb, pl }) => ({
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    left: `${pl}px`,
    top: `${apt + pt}px`,
  }))
  const rightSx = useResponsiveStyles(({ apt, pt, pb, apb, pr }) => ({
    height: `calc(100% - ${apt + pt + pb + apb}px)`,
    right: `${pr}px`,
    top: `${apt + pt}px`,
  }))
  const bottomSx = useResponsiveStyles(({ apl, pl, pb, apr, pr }) => ({
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
    bottom: `${pb - 1}px`,
    left: `${apl + pl}px`,
  }))
  const topSx = useResponsiveStyles(({ apl, pl, pr, apr, pt }) => ({
    width: `calc(100% - ${apl + pl + pr + apr}px)`,
    top: `${pt}px`,
    left: `${apl + pl}px`,
  }))

  return (
    <>
      {left && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            width: '1px',
            ...leftSx,
            ...sx,
          }}
        />
      )}
      {right && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            width: '1px',
            ...rightSx,
            ...sx,
          }}
        />
      )}
      {bottom && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            height: '1px',
            ...bottomSx,
            ...sx,
          }}
        />
      )}
      {top && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            height: '1px',
            ...topSx,
            ...sx,
          }}
        />
      )}
    </>
  )
}

export default Axis

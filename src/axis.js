import React from 'react'
import { Box } from 'theme-ui'
import { useChart } from './chart'

const styles = {
  axis: {
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: 'secondary',
    borderWidth: '0px',
  },
}

const Axis = ({ left, right, top, bottom, sx }) => {
  const { x, y, pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

  return (
    <>
      {left && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            left: `${pl}px`,
            top: `${apt + pt}px`,
            width: '1px',
            ...sx,
          }}
        />
      )}
      {right && (
        <Box
          sx={{
            ...styles.axis,
            borderRightWidth: '1px',
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            right: `${pr - 1}px`,
            top: `${apt + pt}px`,
            width: '1px',
            ...sx,
          }}
        />
      )}
      {bottom && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            bottom: `${pb - 1}px`,
            left: `${apl + pl}px`,
            height: '1px',
            ...sx,
          }}
        />
      )}
      {top && (
        <Box
          sx={{
            ...styles.axis,
            borderTopWidth: '1px',
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            top: `${pt}px`,
            left: `${apl + pl}px`,
            height: '1px',
            ...sx,
          }}
        />
      )}
    </>
  )
}

export default Axis

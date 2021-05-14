import { Box } from 'theme-ui'

const sx = {
  axis: {
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: 'secondary',
    borderWidth: '0px',
  },
  tick: {
    position: 'absolute',
    fontSize: [1, 1, 1, 2],
    fontFamily: 'mono',
    letterSpacing: 'mono',
    color: 'secondary',
  },
}

const Axis = ({
  scales,
  ticks,
  labels,
  units,
  padding,
  axisPadding,
}) => {
  const { 
    left : pl = 20, 
    right : pr = 0, 
    top : pt = 0, 
    bottom : pb = 20
  } = padding
  
  const { 
    left: apl = 0, 
    right: apr = 0, 
    top: apt = 0, 
    bottom: apb = 0 
  } = axisPadding


  const { x, y } = scales

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box
        sx={{
          ...sx.axis,
          borderRightWidth: '1px',
          height: `calc(100% - ${apt + pt + pb + apb}px)`,
          left: `${pl}px`,
          top: `${apt + pt}px`,
          width: '1px',
        }}
      />
      <Box
        sx={{
          ...sx.axis,
          borderTopWidth: '1px',
          width: `calc(100% - ${apl + pl + pr + apr}px)`,
          bottom: `${pb}px`,
          left: `${apl + pl}px`,
          height: '1px',
        }}
      />
      {ticks && ticks.y && (
        <Box
          sx={{
            position: 'absolute',
            top: `${apt + pt}px`,
            height: `calc(100% - ${apt + pt + pb + apb}px)`,
            width: `${pl}px`,
          }}
        >
          {ticks.y.map((d) => {
            return (
              <Box
                sx={{
                  ...sx.tick,
                  fill: 'primary',
                  top: `${y(d)}%`,
                  mt: '-9px',
                  right: '5px',
                }}
              >
                {d}
              </Box>
            )
          })}
        </Box>
      )}
      {ticks && ticks.x && (
        <Box
          sx={{
            position: 'absolute',
            height: `${pb}px`,
            width: `calc(100% - ${apl + pl + pr + apr}px)`,
            left: `${apl + pl}px`,
            bottom: '0px',
          }}
        >
          {ticks.x.map((d) => {
            return (
              <Box
                sx={{
                  ...sx.tick,
                  left: `${x(d)}%`,
                  top: `0px`,
                  transform: 'translate(-50%)',
                }}
              >
                {d}
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default Axis

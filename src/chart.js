import { Box } from 'theme-ui'
import Axis from './axis'

const Chart = ({
  scales,
  ticks,
  labels,
  units,
  padding,
  axisPadding,
  children
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

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Axis 
        scales={scales}
        ticks={ticks}
        labels={labels}
        units={units}
        padding={padding}
        axisPadding={axisPadding}
      />
      <Box sx={{
        position: 'absolute', 
        top: `${apt + pt}px`,
        left: `${apl + pl}px`,
        width: `calc(100% - ${apl + pl + pr + apr}px)`,
        height: `calc(100% - ${apt + pt + pb + apb}px)`,
      }}>
      <Box 
        as='svg' 
        height='100%'
        viewBox={`0 0 100 100`}
        width='100%'
        preserveAspectRatio='none'
      >
        {children}
      </Box>
      </Box>
    </Box>
  )
}

export default Chart
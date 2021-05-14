import { Box } from 'theme-ui'
import Axis from './axis'

const Chart = ({
  scales,
  ticks,
  labels,
  units,
  padding,
  axisPadding
  }) => {
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
    </Box>
  )
}

export default Chart
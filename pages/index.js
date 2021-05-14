import { Box } from 'theme-ui'
import { scaleLinear } from 'd3-scale'
import Axis from '../src/axis'
import Chart from '../src/chart'

const Index = () => {
  const x = scaleLinear().domain([0, 1000]).range([0, 100])
  const y = scaleLinear().domain([0, 1000]).range([0, 100])
  return (
    <Box
      sx={{
        width: '80%',
        height: '300px',
        border: 'solid 1px red',
        borderColor: 'muted',
        mx: ['auto'],
        mt: [5],
      }}
    >
      <Chart
        scales={{ x: x, y: y }}
        ticks={{ x: [0, 500, 1000], y: [0, 500, 1000] }}
        labels={{ x: 'x label', y: 'ylabel' }}
        units={{ x: 'unit', y: 'unit' }}
        padding={{ left: 50, bottom: 50, right: 0, top: 0 }}
        axisPadding={{ left: 0, right : 0, top: 0, bottom: 0 }}
      ></Chart>
    </Box>
  )
}

export default Index

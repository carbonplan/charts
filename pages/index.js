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
        height: ['300px'],
        border: 'solid 1px',
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
      >
        <Box as='line' x1={`${x(0)}`} x2={`${x(500)}`} y1={`${y(0)}`} y2={`${y(500)}`} sx={{stroke: 'primary', strokeWidth: 2, vectorEffect: 'non-scaling-stroke'}} />
        <Box as='line' x1={`${x(500)}`} x2={`${x(500)+0.00001}`} y1={`${y(500)}`} y2={`${y(500)+0.00001}`} sx={{stroke: 'primary', strokeWidth: 13, strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke'}} />
        <Box as='line' x1={`${x(100)}`} x2={`${x(100)+0.00001}`} y1={`${y(500)}`} y2={`${y(500)+0.00001}`} sx={{stroke: 'primary', strokeWidth: 13, strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke'}} />
        </Chart>
    </Box>
  )
}

export default Index

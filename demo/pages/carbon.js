import { Box } from 'theme-ui'
import {
  Axis,
  Chart,
  Ticks,
  Grid,
  TickLabels,
  AxisLabel,
  Label,
  Plot,
  Circle,
  Scatter,
  Line,
} from '../src'
import tsv from '../carbon.js'

let data = tsv.split('\n').map((str) => {
  let [date, _1, avg, _2, trend] = str.split(' ').map(parseFloat)
  if (avg === -99.99) avg = null
  return { date, avg, trend }
})

data = data.filter((d) => d.avg)

const Index = () => {
  return (
    <>
      <Box
        sx={{
          width: 'calc(100% - 48px)',
          height: ['400px'],
          border: 'solid 0px',
          borderColor: 'muted',
          mx: ['auto'],
          my: ['24px'],
        }}
      >
        <Chart
          x={[1956, 2022]}
          y={[310, 425]}
          padding={{ left: 70, bottom: 50, right: 0, top: 0 }}
          axisPadding={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <Grid vertical horizontal />
          <Ticks left bottom />
          <TickLabels left bottom />
          <AxisLabel left>Atmospheric CO2</AxisLabel>
          <AxisLabel bottom>Year</AxisLabel>
          <Plot>
            <Line
              data={data.map((d) => [d.date, d.avg])}
              width={1}
              color={'secondary'}
            />
            <Scatter
              data={data.map((d) => [d.date, d.avg])}
              color={'secondary'}
              size={3}
            />
            <Line
              data={data.map((d) => [d.date, d.trend])}
              color={'red'}
              width={2}
            />
          </Plot>
        </Chart>
      </Box>
    </>
  )
}

export default Index

import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Grid,
  Plot,
  Ticks,
  TickLabels,
  AxisLabel,
  Scatter,
} from '@carbonplan/charts'
import { scaleLinear } from 'd3-scale'

# Scatter

This is a scatter chart.

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Scatter
        size={10}
        x={(d) => d.x}
        y={(d) => d.y}
        data={[
          { x: 100, y: 50 },
          { x: 0, y: 100 },
        ]}
      />
    </Plot>
  </Chart>
</Box>

export default ({ children }) => <Section name='scatter'>{children}</Section>

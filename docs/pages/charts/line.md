import Section from '../../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Grid,
  Plot,
  Ticks,
  TickLabels,
  AxisLabel,
  Line,
} from '@carbonplan/charts'
import { scaleLinear } from 'd3-scale'

# Line

This is a line chart.

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Line
        data={[
          [100, 50],
          [40, 60],
          [0, 100],
        ]}
      />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Line
        data={[
          [100, 50],
          [40, 60],
          [0, 100],
        ]}
      />
    </Plot>
  </Chart>
</Box>
```

export default ({ children }) => <Section name='line'>{children}</Section>

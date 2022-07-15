import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Grid,
  Plot,
  Ticks,
  TickLabels,
  AxisLabel,
  Area,
} from '@carbonplan/charts'
import { scaleLinear } from 'd3-scale'

# Area

This is a area chart.

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Area
        color='red'
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
      <Area
        color='red'
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

### Specifying y0

Area `data` can be provided with entries of the shape `[x, y1]` (where a lower bounding line of `[x, 0]` is assumed). Alternatively, the shape `[x, y0, y1]` can be used (where `[x, y1]` becomes the upper line and `[x, y0]` the lower line).

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Area
        color='yellow'
        data={[
          [100, 20, 50],
          [40, 35, 60],
          [0, 80, 100],
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
      <Area
        color='yellow'
        data={[
          [100, 20, 50],
          [40, 35, 60],
          [0, 80, 100],
        ]}
      />
    </Plot>
  </Chart>
</Box>
```

### Negative values

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-100, 0]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Area
        color='teal'
        data={[
          [100, -50],
          [40, -60],
          [0, -100],
        ]}
      />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-100, 0]} padding={{ left: 60, top: 50 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Area
        color='teal'
        data={[
          [100, -50],
          [40, -60],
          [0, -100],
        ]}
      />
    </Plot>
  </Chart>
</Box>
```

export default ({ children }) => <Section name='area'>{children}</Section>

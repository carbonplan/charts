import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Plot,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  Bar,
} from '@carbonplan/charts'

export const data = Array(11).fill(null).map((_, i) => [i, (i + 1) * 9])

# Bar

This is a simple bar chart.

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Bar data={data} color={'purple'} />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <Bar data={data} color={'purple'} />
    </Plot>
  </Chart>
</Box>
```

### Horizontal bar

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-1, 11]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data} color={'purple'} direction='horizontal' />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-1, 11]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data} color={'purple'} direction='horizontal' />
    </Plot>
  </Chart>
</Box>
```

### Floating bar

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data.map(([x, y]) => [x, y / 2, y])} color={'purple'} />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data.map(([x, y]) => [x, y / 2, y])} color={'purple'} />
    </Plot>
  </Chart>
</Box>
```

### Multiple colors

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data} color={data.map((_, i) => ['pink', 'red', 'orange', 'yellow'][i % 4])} />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]}  padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <Bar data={data} color={data.map((_, i) => ['pink', 'red', 'orange', 'yellow'][i % 4])} />
    </Plot>
  </Chart>
</Box>
```

export default ({ children }) => <Section name='bar'>{children}</Section>

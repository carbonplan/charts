import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Plot,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  StackedBar,
} from '@carbonplan/charts'

export const data = Array(11)
  .fill(null)
  .map((_, i) => [i, 0, (i + 1) * 2, (i + 1) * 5, (i + 1) * 9])
export const getRandomColor = () =>
  ['pink', 'red', 'orange', 'yellow', 'green'][Math.floor(Math.random() * 5)]

# StackedBar

This is a simple bar chart.

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <StackedBar data={data} color={'purple'} />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <AxisLabel left>Variable one</AxisLabel>
    <AxisLabel bottom>Variable two</AxisLabel>
    <Plot>
      <StackedBar data={data} color={'purple'} />
    </Plot>
  </Chart>
</Box>
```

### Horizontal bar

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-1, 11]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar data={data} color={'purple'} direction='horizontal' />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[0, 100]} y={[-1, 11]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar data={data} color={'purple'} direction='horizontal' />
    </Plot>
  </Chart>
</Box>
```

### Floating bar

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar
        data={data.map(([x, zero, ...yValues]) => [x, ...yValues])}
        color={'purple'}
      />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar
        data={data.map(([x, zero, ...yValues]) => [x, ...yValues])}
        color={'purple'}
      />
    </Plot>
  </Chart>
</Box>
```

### Multiple colors

#### Custom stack colors

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar data={data} color={['pink', 'red', 'orange']} />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar data={data} color={['pink', 'red', 'orange']} />
    </Plot>
  </Chart>
</Box>
```

#### Completely customized colors

<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar
        data={data}
        color={data.map((d) => d.slice(2).map((_, i) => getRandomColor()))}
      />
    </Plot>
  </Chart>
</Box>

```jsx
<Box sx={{ width: '100%', height: '400px' }}>
  <Chart x={[-1, 11]} y={[0, 100]} padding={{ left: 60, top: 50 }}>
    <Ticks left bottom />
    <TickLabels left bottom />
    <Axis left bottom />
    <Plot>
      <StackedBar
        data={data}
        color={data.map((d) => d.slice(2).map(() => getRandomColor()))}
      />
    </Plot>
  </Chart>
</Box>
```

export default ({ children }) => (
  <Section name='stackedbar'>{children}</Section>
)

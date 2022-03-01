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

export const data = [
  [0, 0, 2, 5, 9],
  [1, 0, 4, 10, 18],
  [2, 0, 6, 15, 27],
  [3, 0, 8, 20, 36],
  [4, 0, 10, 25, 45],
  [5, 0, 12, 30, 54],
  [6, 0, 14, 35, 63],
  [7, 0, 16, 40, 72],
  [8, 0, 18, 45, 81],
  [9, 0, 20, 50, 90],
  [10, 0, 22, 55, 99],
]
export const getRandomColor = () =>
  ['pink', 'red', 'orange', 'yellow', 'green'][Math.floor(Math.random() * 5)]

# StackedBar

This is a simple bar chart.

```js
const data = [
// x,  y0, y1, y2, y3
  [0,  0,  2,  5,  9],
  [1,  0,  4,  10, 18],
  [2,  0,  6,  15, 27],
  [3,  0,  8,  20, 36],
  [4,  0,  10, 25, 45],
  [5,  0,  12, 30, 54],
  [6,  0,  14, 35, 63],
  [7,  0,  16, 40, 72],
  [8,  0,  18, 45, 81],
  [9,  0,  20, 50, 90],
  [10, 0,  22, 55, 99],
]
```

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
  <Section name='stacked-bar'>{children}</Section>
)

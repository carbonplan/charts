import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Grid,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  Plot,
  Scatter,
  Circle
} from '@carbonplan/charts'
import { scaleLinear } from 'd3-scale'

# Axis

This is a simple axis with a grid, ticks, tick labels, and axis labels.

<Box sx={{width: '100%', height: '200px', my: [6]}}>
<Chart x={[0, 100]} y={[0, 100]} padding={{left: 60, top: 0}}>
  <Grid vertical horizontal />
  <Ticks left bottom />
  <TickLabels left bottom />
  <AxisLabel left>Axis one</AxisLabel>
  <AxisLabel bottom>Axis two</AxisLabel>
</Chart>
</Box>

```jsx
<Box sx={{width: '100%', height: '200px'}}>
<Chart x={[0, 100]} y={[0, 100]} padding={{left: 60, top: 0}}>
  <Grid vertical horizontal />
  <Ticks left bottom />
  <TickLabels left bottom />
  <AxisLabel left>Axis one</AxisLabel>
  <AxisLabel bottom>Axis two</AxisLabel>
</Chart>
</Box>
```

export default ({children}) => <Section name='axis'>{children}</Section>
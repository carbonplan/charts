import Section from '../components/section'
import { Box } from 'theme-ui'
import {
  Chart,
  Grid,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  Label,
  Plot,
  Circle,
} from '@carbonplan/charts'
import { scaleLinear } from 'd3-scale'

# Labels

We can add labels to a chart by specifying a location. We're showing a point at the coordinate of each label for clarity.

<Box sx={{ width: '100%', height: '200px', my: [6] }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 0 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Axis one</AxisLabel>
    <AxisLabel bottom>Axis two</AxisLabel>
    <Label x={60} y={40}>
      This is a label at (60,40)
    </Label>
    <Label x={20} y={80}>
      This is a label at (20,80)
    </Label>
    <Plot>
      <Circle x={20} y={80} size={5} />
      <Circle x={60} y={40} size={5} />
    </Plot>
  </Chart>
</Box>

The horizontal alignment is controlled with the `align` prop and can be `left` `right` or `center`.

<Box sx={{ width: '100%', height: '200px', my: [6] }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 0 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Axis one</AxisLabel>
    <AxisLabel bottom>Axis two</AxisLabel>
    <Label x={50} y={15} align='right'>
      This label is right aligned
    </Label>
    <Label x={50} y={50} width={50} align='center'>
      This label is center aligned
    </Label>
    <Label x={50} y={85} align='left'>
      This label is left aligned
    </Label>
    <Plot>
      <Circle x={50} y={15} size={5} />
      <Circle x={50} y={50} size={5} />
      <Circle x={50} y={85} size={5} />
    </Plot>
  </Chart>
</Box>

The vertical alignment is controlled with the `verticalAlign` prop and can be `top` `bottom` or `middle`.

<Box sx={{ width: '100%', height: '200px', my: [6] }}>
  <Chart x={[0, 100]} y={[0, 100]} padding={{ left: 60, top: 0 }}>
    <Grid vertical horizontal />
    <Ticks left bottom />
    <TickLabels left bottom />
    <AxisLabel left>Axis one</AxisLabel>
    <AxisLabel bottom>Axis two</AxisLabel>
    <Label x={50} y={15} align='center' width={50} verticalAlign='top'>
      This label is top aligned
    </Label>
    <Label
      x={50}
      y={50}
      align='center'
      height={50}
      width={50}
      verticalAlign='middle'
    >
      This label is middle aligned
    </Label>
    <Label x={50} y={85} align='center' width={50} verticalAlign='bottom'>
      This label is bottom aligned
    </Label>
    <Plot>
      <Circle x={50} y={15} size={5} />
      <Circle x={50} y={50} size={5} />
      <Circle x={50} y={85} size={5} />
    </Plot>
  </Chart>
</Box>

export default ({ children }) => <Section name='axis'>{children}</Section>

import { Dimmer } from '@carbonplan/components'
import {
  Chart,
  Grid,
  Ticks,
  TickLabels,
  AxisLabel,
  Plot,
  Scatter,
} from '../src'

const ScatterChart = () => {
  return (
    <div style={{ width: '500px', height: '500px', padding: '64px' }}>
      <Chart x={[0, 100]} y={[0, 100]}>
        <Grid vertical horizontal />
        <Ticks left bottom />
        <TickLabels left bottom />
        <AxisLabel left>Variable one</AxisLabel>
        <AxisLabel bottom>Variable two</AxisLabel>
        <Plot>
          <Scatter
            data={[
              [10, 10],
              [50, 50],
              [90, 90],
            ]}
          />
        </Plot>
      </Chart>
    </div>
  )
}

export default ScatterChart

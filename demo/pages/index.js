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
    <>
      <div style={{ marginLeft: '64px', marginTop: '64px' }}>
        <Dimmer />
      </div>
      <div style={{ width: '80%', height: '500px', padding: '64px' }}>
        <Chart x={[0, 100]} y={[0, 100]}>
          <Grid vertical horizontal />
          <Ticks left bottom />
          <TickLabels left bottom />
          <AxisLabel left>Variable one</AxisLabel>
          <AxisLabel bottom>Variable two</AxisLabel>
          <Plot>
            <Scatter
              data={[
                [0, 0],
                [0, 100],
                [50, 50],
                [100, 100],
                [100, 0],
              ]}
            />
          </Plot>
        </Chart>
      </div>
    </>
  )
}

export default ScatterChart

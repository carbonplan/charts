import { Themed, Box } from 'theme-ui'
import { Layout, Row, Column } from '@carbonplan/components'
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
} from '../src'
import { scaleLinear } from 'd3-scale'

const ScatterChart = () => {
  return (
    <Layout>
      <Row>
        <Column start={[1, 2, 2, 2]} width={6}>
          <Themed.h1>CarbonPlan Charts</Themed.h1>
          <Themed.p>Our charts</Themed.p>
          <Themed.h2>Scatter</Themed.h2>
          <Themed.code>
            const foo = 2
          </Themed.code>
          <Box sx={{width: '100%', height: '400px'}}>
            <Chart x={[0, 100]} y={[0, 100]} padding={{left: 60, top: 50}}>
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
                    {x: 100, y: 50},
                    {x: 0, y: 100}
                  ]}
                />
              </Plot>
            </Chart>
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default ScatterChart

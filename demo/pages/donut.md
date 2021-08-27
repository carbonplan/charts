import Section from '../components/section'
import { Box } from 'theme-ui'
import { Chart, Plot, Donut } from '@carbonplan/charts'

# Donut

This is a donut chart.

<Box sx={{ width: '100%', height: '200px' }}>
  <Chart padding={{ left: 0, bottom: 0 }}>
    <Plot square>
      <Donut data={[100, 50, 30]} innerRadius={0.26} color={'purple'} />
    </Plot>
  </Chart>
</Box>

export default ({children}) => <Section name='donut'>{children}</Section

>

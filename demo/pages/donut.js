import { Dimmer } from '@carbonplan/components'
import {
  Chart,
  Plot,
  Donut,
} from '../src'

const DonutChart = () => {
  return (
    <>
      <div style={{ marginLeft: '64px', marginTop: '64px' }}>
        <Dimmer />
      </div>
      <div style={{ border: 'solid 1px red', width: '100px', height: '500px'}}>
        <Chart padding={{left: 0, bottom: 0}}>
          <Plot square>
            <Donut
              data={[100, 50, 30]}
              innerRadius={0.26}
              color={'purple'}
            />
          </Plot>
        </Chart>
      </div>
    </>
  )
}

export default DonutChart

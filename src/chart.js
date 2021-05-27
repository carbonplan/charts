import React, { createContext, useContext } from 'react'
import { scaleLinear, scaleLog } from 'd3-scale'

const ChartContext = createContext(null)

export const useChart = () => {
  return useContext(ChartContext)
}

export const Chart = ({
  x,
  y,
  padding = {},
  axisPadding = {},
  log = false,
  logx = false,
  logy = false,
  children,
}) => {
  const { left: pl = 70, right: pr = 0, top: pt = 0, bottom: pb = 50 } = padding

  const {
    left: apl = 0,
    right: apr = 0,
    top: apt = 0,
    bottom: apb = 0,
  } = axisPadding

  if (log) {
    logx = true
    logy = true
  }

  const xBaseScale = logx ? scaleLog : scaleLinear
  const yBaseScale = logy ? scaleLog : scaleLinear
  const xScale = x ? xBaseScale().domain(x).range([0, 100]).clamp(true) : null
  const yScale = y ? yBaseScale().domain(y).range([100, 0]).clamp(true) : null

  return (
    <ChartContext.Provider
      value={{
        x: xScale,
        y: yScale,
        logx: logx,
        logy: logy,
        pl: pl,
        pr: pr,
        pt: pt,
        pb: pb,
        apl: apl,
        apr: apr,
        apt: apt,
        apb: apb,
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export default Chart

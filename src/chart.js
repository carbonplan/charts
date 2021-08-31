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

  let x_, y_

  if (Array.isArray(x)) {
    const xBaseScale = logx ? scaleLog : scaleLinear
    x_ = x ? xBaseScale().domain(x).range([0, 100]).clamp(true) : null
  } else {
    x_ = x
  }

  if (Array.isArray(y)) {
    const yBaseScale = logy ? scaleLog : scaleLinear
    y_ = y ? yBaseScale().domain(y).range([100, 0]).clamp(true) : null
  } else {
    y_ = y
  }

  return (
    <ChartContext.Provider
      value={{
        x: x_,
        y: y_,
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

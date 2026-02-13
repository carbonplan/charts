import React, { createContext, useContext } from 'react'
import { scaleLinear, scaleLog, ScaleLinear, ScaleLogarithmic } from 'd3-scale'

type ScaleFn = ScaleLinear<number, number> | ScaleLogarithmic<number, number>

export interface ChartContextValue {
  x: ScaleFn
  y: ScaleFn
  logx: boolean
  logy: boolean
  pl: number | number[]
  pr: number | number[]
  pt: number | number[]
  pb: number | number[]
  apl: number | number[]
  apr: number | number[]
  apt: number | number[]
  apb: number | number[]
}

export interface ChartProps extends React.PropsWithChildren {
  x: [number, number] | ScaleFn
  y: [number, number] | ScaleFn
  padding?: {
    left?: number | number[]
    right?: number | number[]
    top?: number | number[]
    bottom?: number | number[]
  }
  axisPadding?: {
    left?: number | number[]
    right?: number | number[]
    top?: number | number[]
    bottom?: number | number[]
  }
  log?: boolean
  logx?: boolean
  logy?: boolean
  clamp?: boolean
}

const ChartContext = createContext<ChartContextValue | null>(null)

export const useChart = (): ChartContextValue => {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a Chart component')
  }
  return context
}

export const Chart = ({
  x,
  y,
  padding = {},
  axisPadding = {},
  log = false,
  logx = false,
  logy = false,
  clamp = true,
  children,
}: ChartProps) => {
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

  let x_: ScaleFn, y_: ScaleFn

  if (Array.isArray(x)) {
    const xBaseScale = logx ? scaleLog : scaleLinear
    x_ = xBaseScale().domain(x).range([0, 100]).clamp(clamp)
  } else {
    x_ = x
  }

  if (Array.isArray(y)) {
    const yBaseScale = logy ? scaleLog : scaleLinear
    y_ = yBaseScale().domain(y).range([100, 0]).clamp(clamp)
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

import React, { createContext, useContext } from 'react'
import { scaleLinear, scaleLog, ScaleLinear, ScaleLogarithmic } from 'd3-scale'

/** A d3 linear or log scale, as accepted by `Chart`'s `x` and `y` props. */
export type ScaleFn =
  | ScaleLinear<number, number>
  | ScaleLogarithmic<number, number>

/** The context value returned by {@link useChart}: the active scales, log flags, and resolved padding. */
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

/** The chart container: establishes the coordinate system and padding shared by all child components. */
export interface ChartProps extends React.PropsWithChildren {
  /**
   * X domain as `[min, max]` (a linear or log scale is created for you), or a
   * preconfigured d3 scale. Optional: omit for a chart that renders only a
   * `Donut`, which supplies its own geometry.
   * @example x={[0, 100]}
   */
  x?: [number, number] | ScaleFn
  /**
   * Y domain as `[min, max]`, or a preconfigured d3 scale. Optional: omit for a
   * chart that renders only a `Donut`.
   * @example y={[0, 100]}
   */
  y?: [number, number] | ScaleFn
  /**
   * Space (px) reserved outside the plot for axes and labels. Each side may be
   * a single number or a responsive array of theme-ui breakpoint values.
   * Defaults to `{ left: 70, right: 0, top: 0, bottom: 50 }`.
   * @example padding={{ left: 60, top: 50 }}
   * @example padding={{ left: [70, 80, 80, 80], top: 10, bottom: [70, 50, 50, 50] }}
   */
  padding?: {
    left?: number | number[]
    right?: number | number[]
    top?: number | number[]
    bottom?: number | number[]
  }
  /** Extra space (px) between the axes and the plot, per side. Defaults to `0` on each side. */
  axisPadding?: {
    left?: number | number[]
    right?: number | number[]
    top?: number | number[]
    bottom?: number | number[]
  }
  /** Use a log scale on both axes. Defaults to `false`. */
  log?: boolean
  /** Use a log scale on the x-axis. Defaults to `false`. */
  logx?: boolean
  /** Use a log scale on the y-axis. Defaults to `false`. */
  logy?: boolean
  /**
   * Clamp values outside the domain to the range. Applies only when `x`/`y` are
   * passed as domain arrays. Defaults to `true`.
   */
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

  let x_: ScaleFn | undefined, y_: ScaleFn | undefined

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
        // absent only for Donut-only charts, which never read the scales
        x: x_ as ScaleFn,
        y: y_ as ScaleFn,
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

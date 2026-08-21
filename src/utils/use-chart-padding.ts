import { useChart } from '../chart'

interface PaddingValues {
  pl: number
  pr: number
  pt: number
  pb: number
  apl: number
  apr: number
  apt: number
  apb: number
}

type RawPaddingValues = { [K in keyof PaddingValues]: number | number[] }
type FunctionalSx = (values: PaddingValues) => Record<string, string>

const KEYS: (keyof PaddingValues)[] = [
  'pl',
  'pr',
  'pt',
  'pb',
  'apl',
  'apr',
  'apt',
  'apb',
]

// Baseline padding shape used to initialize breakpoint values and derive sx keys.
const ZERO_PADDING: PaddingValues = {
  pl: 0,
  pr: 0,
  pt: 0,
  pb: 0,
  apl: 0,
  apr: 0,
  apt: 0,
  apb: 0,
}

const isResolved = (values: RawPaddingValues): values is PaddingValues =>
  KEYS.every((key) => !Array.isArray(values[key]))

const getChartPadding = (
  functionalSx: FunctionalSx,
  rawValues: RawPaddingValues
): Record<string, string | string[]> => {
  if (!isResolved(rawValues)) {
    const breakpointValues = KEYS.reduce<PaddingValues[]>(
      (accum, key) => {
        const rawValue = rawValues[key]
        let arrayValue: number[]
        if (Array.isArray(rawValue)) {
          if (rawValue.length === 4) {
            arrayValue = rawValue
          } else {
            arrayValue = new Array(4)
              .fill(null)
              .map((_, i) => rawValue[i] ?? rawValue[rawValue.length - 1])
          }
        } else {
          arrayValue = new Array(4).fill(rawValue)
        }
        arrayValue.forEach((value, i) => {
          accum[i][key] = value
        })

        return accum
      },
      [
        { ...ZERO_PADDING },
        { ...ZERO_PADDING },
        { ...ZERO_PADDING },
        { ...ZERO_PADDING },
      ]
    )

    const sxKeys = Object.keys(functionalSx(ZERO_PADDING))

    return breakpointValues.reduce<Record<string, string[]>>(
      (accum, values) => {
        const result = functionalSx(values)
        sxKeys.map((key) => {
          accum[key] ||= []
          accum[key].push(result[key])
        })
        return accum
      },
      {}
    )
  } else {
    return functionalSx(rawValues)
  }
}

const useChartPadding = (
  functionalSx: FunctionalSx
): Record<string, string | string[]> => {
  const chart = useChart()

  const rawValues: RawPaddingValues = {
    pl: chart.pl,
    pr: chart.pr,
    pt: chart.pt,
    pb: chart.pb,
    apl: chart.apl,
    apr: chart.apr,
    apt: chart.apt,
    apb: chart.apb,
  }

  return getChartPadding(functionalSx, rawValues)
}

export default useChartPadding

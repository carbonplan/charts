import { useChart } from '../chart'

const KEYS = ['pl', 'pr', 'pt', 'pb', 'apl', 'apr', 'apt', 'apb']

const getChartPadding = (functionalSx, rawValues) => {
  if (KEYS.some((key) => Array.isArray(rawValues[key]))) {
    const breakpointValues = KEYS.reduce(
      (accum, key) => {
        const rawValue = rawValues[key]
        let arrayValue
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
      [{}, {}, {}, {}]
    )

    const sxKeys = Object.keys(functionalSx({}))

    return breakpointValues.reduce((accum, values, i) => {
      const result = functionalSx(values)
      sxKeys.map((key) => {
        accum[key] ||= []
        accum[key].push(result[key])
      })
      return accum
    }, {})
  } else {
    return functionalSx(rawValues)
  }
}

const useChartPadding = (functionalSx) => {
  const chart = useChart()

  return getChartPadding(functionalSx, chart)
}

export default useChartPadding

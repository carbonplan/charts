import { useChart } from '../chart'

const KEYS = ['pl', 'pr', 'pt', 'pb', 'apl', 'apr', 'apt', 'apb']

const getChartPadding = (functionalSx, rawValues) => {
  const breakpointValues = KEYS.reduce(
    (accum, key) => {
      const rawValue = rawValues[key]
      let arrayValue
      if (Array.isArray(rawValue)) {
        if (rawValue.length === 4) {
          arrayValue = rawValue
        } else {
          throw new Error('can only handle 4 breakpoints')
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
}

const useChartPadding = (functionalSx) => {
  const chart = useChart()

  return getChartPadding(functionalSx, chart)
}

export default useChartPadding

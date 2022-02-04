import { useChart } from '../chart'

const KEYS = ['pl', 'pr', 'pt', 'pb', 'apl', 'apr', 'apt', 'apb']

const getResponsiveStyles = (functionalSx, rawValues) => {
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

  return Object.keys(functionalSx).reduce((accum, key) => {
    const f = functionalSx[key]
    accum[key] = breakpointValues.map((values) => f(values))
    return accum
  }, {})
}

const useResponsiveStyles = (functionalSx) => {
  const chart = useChart()

  return getResponsiveStyles(functionalSx, chart)
}

export default useResponsiveStyles

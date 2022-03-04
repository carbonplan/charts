export const getPropAtIndex = (prop, data, i, options = {}) => {
  if (Array.isArray(prop)) {
    if (prop.length !== data.length) {
      throw new Error(
        `Unexpected ${options.propName} array provided. Expected length ${data.length}, received length ${prop.length}`
      )
    }
    return prop[i]
  } else {
    return prop
  }
}

export const getColorAtIndex = (color, data, i, options = {}) => {
  const rawValue = getPropAtIndex(color, data, i, {
    ...options,
    propName: options.propName || 'color',
  })
  if (options.colors && options.colors[rawValue]) {
    return options.colors[rawValue]
  } else {
    return rawValue
  }
}

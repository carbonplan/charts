export const getPropAtIndex = (propName, prop, data, i, options = {}) => {
  if (Array.isArray(prop)) {
    if (prop.length !== data.length) {
      throw new Error(
        `Unexpected ${propName} array provided. Expected length ${data.length}, received length ${prop.length}`
      )
    }
    return prop[i]
  } else if (typeof prop === 'function') {
    return prop(data[i], options.index ?? i)
  } else {
    return prop
  }
}

export const getColorAtIndex = (color, data, i, options = {}) => {
  const rawValue = getPropAtIndex(
    options.propName || 'color',
    color,
    data,
    i,
    options
  )
  if (options.colors && options.colors[rawValue]) {
    return options.colors[rawValue]
  } else {
    return rawValue
  }
}

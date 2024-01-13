export function dropNans({ data }) {
  return data.filter((d) => !Number.isNaN(d[0]) && !Number.isNaN(d[1]))
}

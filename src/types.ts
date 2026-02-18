/** A single [x, y] data point.
 * @example [[0, 5], [1, 8], [2, 3]] */
export type Datum = [x: number, y: number]

/** A data point with explicit lower and upper bounds: [x, y0, y1].
 * @example [[0, 2, 5], [1, 3, 8], [2, 1, 3]] */
export type RangeDatum = [x: number, y0: number, y1: number]

/** An array of data points, each either [x, y] or [x, y0, y1].
 * When y0 is omitted, it defaults to 0.
 * @example
 * // simple: lower bound is 0
 * [[0, 5], [1, 8], [2, 3]]
 * // with explicit lower bound
 * [[0, 2, 5], [1, 3, 8]] */
export type DataSeries = (Datum | RangeDatum)[]

/** A data point with an x value followed by one or more y values: [x, y0, y1, ...].
 * Used by StackedBar to define segments between consecutive y values.
 * Values are sorted automatically, so order does not matter.
 * @example
 * // two segments per bar (3 y boundaries)
 * [[0, 0, 10, 25], [1, 0, 15, 30]] */
export type StackedDatum = [x: number, ...y: number[]]

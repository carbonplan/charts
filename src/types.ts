/**
 * A single `[x, y]` data point.
 * @example
 * const point: Datum = [0, 5]
 */
export type Datum = [x: number, y: number]

/**
 * A single data point with explicit lower and upper bounds: `[x, y0, y1]`.
 * @example
 * // at x = 0, span y from 2 up to 5
 * const point: RangeDatum = [0, 2, 5]
 */
export type RangeDatum = [x: number, y0: number, y1: number]

/**
 * An array of data points, each either `[x, y]` or `[x, y0, y1]`.
 * When the lower bound is omitted it defaults to 0.
 * @example
 * // simple points (lower bound defaults to 0)
 * const data: DataSeries = [[0, 5], [1, 8], [2, 3]]
 * @example
 * // explicit lower and upper bound per point
 * const data: DataSeries = [[0, 2, 5], [1, 3, 8]]
 */
export type DataSeries = (Datum | RangeDatum)[]

/**
 * A single stacked-bar row: an x value followed by two or more y boundaries,
 * `[x, y0, y1, ...]`. Consecutive boundaries define the stacked segments, so N
 * boundaries produce N − 1 segments. Boundaries are sorted automatically, so
 * the order they are passed in does not matter.
 * @example
 * // three boundaries -> two stacked segments (0->10 and 10->25)
 * const row: StackedDatum = [0, 0, 10, 25]
 */
export type StackedDatum = [x: number, ...y: number[]]

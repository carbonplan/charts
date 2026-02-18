export type Datum = [x: number, y: number]
export type RangeDatum = [x: number, y0: number, y1: number]
export type DataSeries = (Datum | RangeDatum)[]
export type StackedDatum = [x: number, ...y: number[]]

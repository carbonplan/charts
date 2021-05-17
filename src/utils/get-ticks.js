var e10 = Math.sqrt(50),
  e5 = Math.sqrt(10),
  e2 = Math.sqrt(2)

export default function getTicks({
  values,
  horizontal,
  vertical,
  count,
  countx,
  county,
  logx,
  logy,
  x,
  y,
}) {
  countx = countx || count
  county = county || count
  let verticalValues, horizontalValues

  const verticalGenerator = logx ? logTicks : ticks
  const horizontalGenerator = logy ? logTicks : ticks

  if (!values) {
    verticalValues = verticalGenerator(x.domain()[0], x.domain()[1], countx)
    horizontalValues = horizontalGenerator(y.domain()[0], y.domain()[1], county)
  } else {
    verticalValues = horizontalValues = values
  }

  return {
    horizontal: horizontalValues,
    vertical: verticalValues,
  }
}

function logTicks(start, stop, count) {
  var base = 10
  var logs = logp(base)
  var pows = powp(base)

  var u = start,
    v = stop,
    r

  if ((r = v < u)) (i = u), (u = v), (v = i)

  var i = logs(u),
    j = logs(v),
    p,
    k,
    t,
    n = count == null ? 10 : +count,
    z = []

  if (!(base % 1) && j - i < n) {
    ;(i = Math.floor(i)), (j = Math.ceil(j))
    if (u > 0)
      for (; i <= j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k
          if (t < u) continue
          if (t > v) break
          z.push(t)
        }
      }
    else
      for (; i <= j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k
          if (t < u) continue
          if (t > v) break
          z.push(t)
        }
      }
    if (z.length * 2 < n) z = ticks(u, v, n)
  } else {
    z = ticks(i, j, Math.min(j - i, n)).map(pows)
  }

  return r ? z.reverse() : z
}

function logp(base) {
  return base === Math.E
    ? Math.log
    : (base === 10 && Math.log10) ||
        (base === 2 && Math.log2) ||
        ((base = Math.log(base)),
        function (x) {
          return Math.log(x) / base
        })
}

function powp(base) {
  return base === 10
    ? pow10
    : base === Math.E
    ? Math.exp
    : function (x) {
        return Math.pow(base, x)
      }
}

function pow10(x) {
  return isFinite(x) ? +('1e' + x) : x < 0 ? 0 : x
}

function ticks(start, stop, count) {
  var reverse,
    i = -1,
    n,
    ticks,
    step
  ;(stop = +stop), (start = +start), (count = +count)
  if (start === stop && count > 0) return [start]
  if ((reverse = stop < start)) (n = start), (start = stop), (stop = n)
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step))
    return []

  if (step > 0) {
    let r0 = Math.round(start / step),
      r1 = Math.round(stop / step)
    if (r0 * step < start) ++r0
    if (r1 * step > stop) --r1
    ticks = new Array((n = r1 - r0 + 1))
    while (++i < n) ticks[i] = (r0 + i) * step
  } else {
    step = -step
    let r0 = Math.round(start * step),
      r1 = Math.round(stop * step)
    if (r0 / step < start) ++r0
    if (r1 / step > stop) --r1
    ticks = new Array((n = r1 - r0 + 1))
    while (++i < n) ticks[i] = (r0 + i) / step
  }

  if (reverse) ticks.reverse()

  return ticks
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
    power = Math.floor(Math.log(step) / Math.LN10),
    error = step / Math.pow(10, power)
  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) *
        Math.pow(10, power)
    : -Math.pow(10, -power) /
        (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1)
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
    step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
    error = step0 / step1
  if (error >= e10) step1 *= 10
  else if (error >= e5) step1 *= 5
  else if (error >= e2) step1 *= 2
  return stop < start ? -step1 : step1
}

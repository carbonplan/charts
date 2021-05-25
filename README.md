<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / charts

**responsive reactive themeable charts**

[![GitHub][github-badge]][github]
[![Build Status]][actions]
![MIT License][]
![NPM Version][]

[github]: https://github.com/carbonplan/charts
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/charts/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/components/actions/workflows/main.yml
[mit license]: https://badgen.net/badge/license/MIT/blue
[npm version]: https://badgen.net/npm/v/@carbonplan/charts

There are _a lot_ of charting libraries for the web. Somehow, this one fills a niche that we think still exists. If nothing else, we find it useful, and will be using it ourselves! It's still super early in development, so expect lots of changes.

We're designing `@carbonplan/charts` with a few goals in mind:

- built for modern `react` :arrow_upper_right:
- fully responsive :left_right_arrow:
- modular and composable :recycle:
- easy to theme via `theme-ui` :sparkles:
- plays great with `MDX` :tada:

It's also super light weight, depending only on `react` and `theme-ui` and some `d3` utility packages. If there's interest we could probably factor out the `theme-ui` dependency so it's optional.

## background

This package is most directly inspired by [`pancake`](https://github.com/Rich-Harris/pancake), an experimental package build for `svelte`. The concept motivating `pancake` is that fluid, responsive charts that adapt to their containers can be built by using HTML for the chart and axes and SVG for the graphical elements. It's like an SVG `sandwich` or `pancake`. Pick your favorite food metaphor. Rich Harris described the concept super clearly in [a blog post](https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp). Without knowing about `pancake`, we started doing almost _exactly_ the same thing a few months ago for our charts at `carbonplan`. There must be something to it.

However, to our knowledge, none of the existing charting libraries for JS take this approach. And `pancake` is built for `svelte`, whereas we're mainly using `react`. That's how we got here.

Also worth mentioning that we've used `vega` and `vega-lite` and `d3` a lot. We love them, we're taking inspiration all over the place, and even using some `d3` utilities under the hood. Incredibly grateful to the developers of those tools.

## usage

Here's a super simple scatter chart just to give you the idea.

```jsx
import {
  Chart,
  Grid,
  Ticks,
  TickLabels,
  AxisLabel,
  Plot,
  Scatter,
} from '@carbonplan/charts'

const ScatterChart = () => {
  return (
    <div style={{ width: '500px', height: '500px', padding: '64px' }}>
      <Chart x={[0, 100]} y={[0, 100]}>
        <Grid vertical horizontal />
        <Ticks left bottom />
        <TickLabels left bottom />
        <AxisLabel left>Variable one</AxisLabel>
        <AxisLabel bottom>Variable two</AxisLabel>
        <Plot>
          <Scatter
            data={[
              [10, 10],
              [50, 50],
              [90, 90],
            ]}
          />
        </Plot>
      </Chart>
    </div>
  )
}
```

This creates the following chart, shown with the `light` and `dark` themes of [`@carbonplan/theme`](https://github.com/carbonplan/theme).

<img width="419" alt="Screen Shot 2021-05-16 at 10 11 50 AM" src="https://user-images.githubusercontent.com/3387500/118406207-fed4a900-b62f-11eb-84a1-0f2b2d3311ef.png">
<img width="437" alt="Screen Shot 2021-05-16 at 10 18 51 AM" src="https://user-images.githubusercontent.com/3387500/118406265-2297ef00-b630-11eb-99d4-d7eb16a0211b.png">

Many more examples and documentation coming soon.

## development

To update a component and publish a new version, first make your changes, then follow these steps

- Increase the version number in `package.json`
- `npm run build`
- `npm publish`

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/components/issues/new) or [sending us an email](mailto:hello@carbonplan.org).

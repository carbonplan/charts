import { useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Box } from 'theme-ui'
import * as carbonPlanCharts from '@carbonplan/charts'
import { Layout, Row, Column, FadeIn } from '@carbonplan/components'
import { LiveCode, Pre } from '@carbonplan/prism'
import Sidenav from './sidenav'
import { ColorSample, GridSample } from './samples'

const transform = (src) => {
  if (!src.startsWith('()')) {
    return `<>${src}</>`
  } else {
    return `${src}`
  }
}

const scope = {
  ...carbonPlanCharts,
  Box,
  useState,
}

const components = {
  code: ({ ...props }) => (
    <LiveCode
      theme={'monochrome'}
      transform={transform}
      scope={scope}
      {...props}
    />
  ),
  pre: Pre,
}

const Section = ({ children, name }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <MDXProvider components={components}>
      <Layout
        fade={false}
        settings={{
          value: expanded,
          onClick: () => setExpanded((prev) => !prev),
        }}
      >
        <Row>
          <Column start={[1, 1, 2, 2]} width={[4, 4, 2, 2]}>
            <Sidenav active={name} expanded={expanded} />
          </Column>
          <Column start={[1, 2, 5, 5]} width={[6]} sx={{ mb: [8, 8, 9, 10] }}>
            <FadeIn>{children}</FadeIn>
          </Column>
        </Row>
      </Layout>
    </MDXProvider>
  )
}

export default Section

import { MDXProvider } from '@mdx-js/react'
import { Box } from 'theme-ui'
import * as carbonPlanCharts from '@carbonplan/charts'
import { LiveCode, Pre } from '@carbonplan/prism'
import { NavSection } from '@carbonplan/layouts'
import { contents } from './contents'

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
  return (
    <MDXProvider components={components}>
      <NavSection
        name={name}
        menu={{ contents: contents, prefix: '/charts' }}
        title={`${
          name === 'intro' ? 'Charts' : name[0].toUpperCase() + name.slice(1)
        } – CarbonPlan`}
        description={'Documentation for our charting library.'}
      >
        {children}
      </NavSection>
    </MDXProvider>
  )
}

export default Section

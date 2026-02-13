import React from 'react'
import { Box, BoxProps } from 'theme-ui'

type PathBoxProps = BoxProps & { d?: string | null }
export const PathBox = (props: PathBoxProps) => <Box as='path' {...props} />

type SvgBoxProps = BoxProps &
  Pick<
    React.SVGProps<SVGSVGElement>,
    'viewBox' | 'preserveAspectRatio' | 'height' | 'width'
  >
export const SvgBox = (props: SvgBoxProps) => <Box as='svg' {...props} />

type LineBoxProps = BoxProps &
  Pick<React.SVGProps<SVGLineElement>, 'x1' | 'x2' | 'y1' | 'y2'>
export const LineBox = (props: LineBoxProps) => <Box as='line' {...props} />

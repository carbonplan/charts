import React from 'react'
import { Box, BoxProps } from 'theme-ui'

type PathBoxProps = BoxProps &
  Omit<React.SVGProps<SVGPathElement>, keyof BoxProps | 'd'> & {
    d?: string | null
  }
export const PathBox = (props: PathBoxProps) => <Box as='path' {...props} />

type SvgBoxProps = BoxProps &
  Omit<React.SVGProps<SVGSVGElement>, keyof BoxProps>
export const SvgBox = (props: SvgBoxProps) => <Box as='svg' {...props} />

type LineBoxProps = BoxProps &
  Omit<React.SVGProps<SVGLineElement>, keyof BoxProps>
export const LineBox = (props: LineBoxProps) => <Box as='line' {...props} />

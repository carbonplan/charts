import React from 'react'
import { useChart } from './chart'

const Point = ({ x, y, children, align='left', verticalAlign='top', width }) => {
  const { x: _x, y: _y, pl, pr, pt, pb, apl, apr, apt, apb } = useChart()

  let position, verticalPosition

  if (!['left', 'right', 'center'].includes(align)) {
    throw new Error(`'${align}' is not a recognized alignment, must be left, right, or center`)
  }

  if (!['top', 'bottom'].includes(verticalAlign)) {
    throw new Error(`'${verticalAlign}' is not a recognized vertical alignment, must be top or bottom`)
  }

  if (align === 'center' && !width) {
    throw new Error(`center alignment requires specifying a width`)
  }

  if (align === 'left') {
    position = {
      left: `${_x(x)}%`,
    }
  }

  if (align === 'center') {
    position = {
      left: `${_x(x - width/2)}%`,
      right: `${100 - _x(x + width/2)}%`,
    }
  }

  if (align === 'right') {
    position = {
      right: `${100 - _x(x)}%`,
    }
  }

  if (verticalAlign === 'top') {
    verticalPosition = {
      top: `${_y(y)}%`,
    }
  }

  if (verticalAlign === 'bottom') {
    verticalPosition = {
      bottom: `${100 - _y(y)}%`,
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        height: `calc(100% - ${apt + pt + pb + apb}px)`,
        width: `calc(100% - ${apl + pl + pr + apr}px)`,
        left: `${apl + pl}px`,
        top: `${apt + pt}px`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          ...position,
          ...verticalPosition
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Point

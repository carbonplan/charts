import { Box } from 'theme-ui'

const GridSample = ({ children }) => {
  return (
    <Box
      sx={{
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '1px',
        py: [3],
        my: [2],
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'mono',
        fontSize: [2, 2, 2, 3],
      }}
    >
      {children}
    </Box>
  )
}

const FontSample = ({ color, label }) => {
  return (
    <Box sx={{ color: color }}>
      <Box sx={{ fontSize: [4], fontFamily: 'body' }}>{label}</Box>
      <Box
        sx={{
          fontSize: [2],
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>
    </Box>
  )
}

const ColorSample = ({ color, hex, label, border }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        mr: [5],
        mt: [3],
        mb: [3],
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          borderRadius: '50px',
          borderStyle: 'solid',
          borderWidth: border ? '1px' : '0px',
          borderColor: 'primary',
        }}
      ></Box>
      <Box
        sx={{
          mt: [3],
          color: label ? 'primary' : color,
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >
        {label ? label : color}
      </Box>
      <Box
        sx={{
          mt: [0],
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >
        #{hex}
      </Box>
    </Box>
  )
}

export { GridSample, ColorSample, FontSample }

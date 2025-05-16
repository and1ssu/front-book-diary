import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    px: 2,
  },
  themeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  paper: {
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    mt: 1,
    width: '100%',
  },
  submitButton: {
    mt: 3,
    mb: 2,
  },
  registerLink: {
    textAlign: 'center',
  },
} as Record<string, SxProps<Theme>>;
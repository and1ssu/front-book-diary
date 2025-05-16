import type { SxProps, Theme } from '@mui/material';

export const styles = {
  root: {
    maxWidth: 600,
    mx: 'auto',
    p: 3,
  },
  header: {
    mb: 3,
  },
  backButton: {
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  formControl: {
    minWidth: 120,
  },
  submitButton: {
    mt: 2,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
} as Record<string, SxProps<Theme>>;
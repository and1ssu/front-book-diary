import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: 2,
  },
  toolbar: {
    display: 'flex',
    gap: 2,
  },
  drawer: {
    width: 240,
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  main: {
    flexGrow: 1,
    p: 3,
  },
};
import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    width: '100%',
  },
  tableContainer: {
    mt: 2,
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: 'primary.main',
    '& th': {
      color: 'white',
    },
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'action.hover',
    },
    '&:hover': {
      backgroundColor: 'action.selected',
    },
  },
  actionButton: {
    mr: 1,
  },
  emptyState: {
    mt: 4,
    textAlign: 'center',
  },
};
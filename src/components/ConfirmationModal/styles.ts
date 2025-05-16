import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  },
  title: {
    mb: 2,
  },
  message: {
    mb: 3,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
  },
};
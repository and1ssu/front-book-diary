import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { styles } from './styles';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styles.modalContent}>
        <Typography id="modal-title" variant="h6" component="h2" sx={styles.title}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={styles.message}>
          {message}
        </Typography>
        <Box sx={styles.buttons}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Rating,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { bookService } from '../../services/book';
import { useNotification } from '../../contexts/NotificationContext';
import { ConfirmationModal } from '../ConfirmationModal';
import { styles } from './styles';
import type { Book } from '../../types/book';

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const loadBooks = async () => {
    try {
      const books = await bookService.getAll();
      setBooks(books);
    } catch {
      showNotification('Erro ao carregar livros', 'error');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await bookService.delete(id);
      showNotification('Livro excluído com sucesso!', 'success');
      loadBooks();
    } catch {
      showNotification('Erro ao excluir livro', 'error');
    }
    setDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const openDeleteModal = (id: number) => {
    setBookToDelete(id);
    setDeleteModalOpen(true);
  };

  return (
    <Box sx={styles.root}>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table sx={styles.table}>
          <TableHead sx={styles.tableHead}>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Avaliação</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={styles.emptyState}>
                    Nenhum livro cadastrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id} sx={styles.tableRow}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <Rating
                      value={book.rating}
                      readOnly
                      precision={0.5}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {book.notes || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(book.id)}
                      sx={styles.actionButton}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => openDeleteModal(book.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setBookToDelete(null);
        }}
        onConfirm={() => bookToDelete && handleDelete(bookToDelete)}
        title="Excluir Livro"
        message="Tem certeza que deseja excluir este livro?"
      />
    </Box>
  );
}
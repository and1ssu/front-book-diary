import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Rating,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { bookService } from '../../services/book';
import { useNotification } from '../../contexts/NotificationContext';
import { styles } from './styles';
import type { Book } from '../../types/book';

interface BookOptions {
  genres: Array<{ value: string; label: string }>;
  statuses: Array<{ value: string; label: string }>;
}

export function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [book, setBook] = useState<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    author: '',
    genre: '',
    status: '',
    rating: 0,
    notes: '',
  });
  const [options, setOptions] = useState<BookOptions>({
    genres: [],
    statuses: [],
  });

  useEffect(() => {
    loadOptions();
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadOptions = async () => {
    try {
      const data = await bookService.getOptions();
      setOptions(data);
    } catch {
      showNotification('Erro ao carregar opções', 'error');
    }
  };

  const loadBook = async () => {
    try {
      const book = await bookService.getById(Number(id));
      setBook(book);
    } catch {
      showNotification('Erro ao carregar livro', 'error');
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await bookService.update(Number(id), book);
        showNotification('Livro atualizado com sucesso!', 'success');
      } else {
        await bookService.create(book);
        showNotification('Livro cadastrado com sucesso!', 'success');
      }
      navigate('/');
    } catch {
      showNotification('Erro ao salvar livro', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        {id ? 'Editar Livro' : 'Novo Livro'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          required
          fullWidth
          label="Título"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          label="Autor"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Gênero</InputLabel>
          <Select
            required
            name="genre"
            value={book.genre}
            label="Gênero"
            onChange={handleChange}
          >
            {options.genres.map((genre) => (
              <MenuItem key={genre.value} value={genre.value}>
                {genre.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Status</InputLabel>
          <Select
            required
            name="status"
            value={book.status}
            label="Status"
            onChange={handleChange}
          >
            {options.statuses.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={styles.ratingContainer}>
          <Typography component="legend">Avaliação</Typography>
          <Rating
            name="rating"
            value={book.rating}
            onChange={(_, newValue) => {
              setBook((prev) => ({
                ...prev,
                rating: newValue || 0,
              }));
            }}
            precision={0.5}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Nota"
          name="notes"
          value={book.notes}
          onChange={handleChange}
          placeholder="Adicione uma breve nota sobre o livro..."
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.submitButton}
        >
          {id ? 'Atualizar' : 'Cadastrar'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={styles.backButton}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
}
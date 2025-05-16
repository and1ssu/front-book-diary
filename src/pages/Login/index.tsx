import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  IconButton,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { authService } from '../../services/auth';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import { RegisterModal } from '../../components/RegisterModal';
import { styles } from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      showNotification('Login realizado com sucesso!', 'success');
      navigate('/');
    } catch {
      showNotification('Erro ao fazer login. Verifique suas credenciais.', 'error');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={styles.container}
    >
      <Box sx={styles.themeButton}>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      <Paper
        elevation={3}
        sx={styles.paper}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Book Diary
        </Typography>
        <Typography component="h2" variant="h6" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.submitButton}
          >
            Entrar
          </Button>
          <Box sx={styles.registerLink}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setRegisterModalOpen(true)}
            >
              Não tem uma conta? Cadastre-se
            </Link>
          </Box>
        </Box>
      </Paper>

      <RegisterModal
        open={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </Container>
  );
}
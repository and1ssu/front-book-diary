import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './pages/Layout';
import { Login } from './pages/Login';
import { BookForm } from './components/BookForm';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { authService } from './services/auth';
import { styles } from './App/styles';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Box sx={styles.loginContainer}>
                  <Login />
                </Box>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <Layout>
                    <BookForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <BookForm />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

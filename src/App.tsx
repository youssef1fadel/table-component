import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TableManager from './components/TableManager';

// Create a theme instance with Inter font
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TableManager />
    </ThemeProvider>
  );
}

export default App;

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UnitManager from './components/UnitManager';

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
      <UnitManager />
    </ThemeProvider>
  );
}

export default App;

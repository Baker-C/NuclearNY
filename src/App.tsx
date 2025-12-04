import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LayoutScreen } from '@/screens/Layout';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LayoutScreen />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;


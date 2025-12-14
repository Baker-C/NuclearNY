import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { NavBarProvider } from '@/providers/NavBarProvider';
import { LayoutScreen } from '@/screens/Layout';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <NavBarProvider>
          <LayoutScreen />
        </NavBarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;


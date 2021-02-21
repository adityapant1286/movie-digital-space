import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer, Slide } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import { dark, light } from './theme/theme';
import MediaHeader from './components/header/mediaHeader.component';
import Media from './components/main/media/media.component'

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const currentTheme = createMuiTheme({
    palette: {
        type: darkMode ? "dark" : "light",
        primary: {
            main: darkMode ? dark.palette.primary.main : light.palette.primary.main,
        },
        secondary: {
            main: darkMode ? dark.palette.secondary.main : light.palette.secondary.main,
        },
        background: {
            default: darkMode ? dark.palette.background.default : light.palette.background.default,
        },
        text: {
            primary: darkMode ? dark.palette.text.primary : light.palette.text.primary,
            secondary: darkMode ? dark.palette.text.secondary : light.palette.text.secondary,
            disabled: darkMode ? dark.palette.text.disabled : light.palette.text.disabled,
            hint: darkMode ? dark.palette.text.hint : light.palette.text.hint,
        }
    },
  });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <ToastContainer position="top-right"
                      autoClose={6000}
                      limit={5}
                      transition={Slide}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      draggable={false}
                      pauseOnFocusLoss
                      pauseOnHover
                      />

      <header>
        <MediaHeader toggleDarkMode={handleDarkModeToggle} />
      </header>

      <main>
        <Media />
      </main>

      <footer></footer>
    </ThemeProvider>
  );
}

export default App;

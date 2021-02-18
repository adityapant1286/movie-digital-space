import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer, Slide } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import { darkTheme, defaultTheme } from './src/theme/theme';

function App() {

  const [theme, setTheme] = useState(true);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // const handleSidebarToggle = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const appliedTheme = createMuiTheme(!theme ? darkTheme : defaultTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
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
      </header>

      <main>
      </main>

      <footer></footer>
    </ThemeProvider>
  );
}

export default App;

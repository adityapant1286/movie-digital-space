/* 
    Copyright (C) 2021  
    Author: Aditya Pant
    Email: aditya.java6@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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

import React from 'react';
import Header from './header';
import MainCards from './mainCards';
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CardItemDetail from './cardItemDetail'
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: !prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<MainCards/>}/>
          <Route path="/:id" element={<CardItemDetail/>}/>
        </Routes>
      </Router>
     
      
    </ThemeProvider>
  );
}

export default App;

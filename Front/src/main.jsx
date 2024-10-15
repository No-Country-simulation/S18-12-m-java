import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from "@mui/material";
import theme from "../theme.js";
import Muestras from "./components/muestras.jsx";
import Box from "@mui/material/Box";
import {NotificationProvider} from "./shared/services/notistack.service.jsx";
import {GlobalContextProvider} from "./shared/context/GlobalContext.jsx";
import {GlobalThemeContextProvider} from "./shared/theme/GlobalThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <NotificationProvider>
          <GlobalContextProvider>
              <GlobalThemeContextProvider>
                  <ThemeProvider theme={theme}>
                      <Box sx={{ px: 2 }}>
                          <App />
                          <Muestras />
                      </Box>
                  </ThemeProvider>
              </GlobalThemeContextProvider>
            </GlobalContextProvider>
      </NotificationProvider>
  </StrictMode>
);

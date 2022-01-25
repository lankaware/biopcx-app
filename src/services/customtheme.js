import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    //  primary: {
    //      main: '#f00'
    //  },
    // secondary: {
    //     main: '#0f0'
    // },
    info: {
      main: '#f00'
    },
  },
  typography: {
    // fontFamily: 'Comic Sans MS'
  },
  shape: {
    // borderRadius: 30
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderBottom: 'none',
        },
      },
    },
    // MuiInput: {
    //   defaultProps: {
    //     sx: {
    //       height: '2rem',
    //     },
    //   },
    // },
  },
})




// const GlobalStyle = createGlobalStyle `body {
//     font-family: sans-serif;
//   }
//   #root {
//     margin: 10%;
//   }
// `;


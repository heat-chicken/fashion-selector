// src/themes/customTheme.js
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    background: {
      default: '#F5F5F5', // Light grey
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 20px',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
          },
        },
      },
    },
  },
});

export default customTheme;


// // customTheme.js
// import { createTheme } from '@mui/material/styles';

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#000000', // Black
//     },
//     secondary: {
//       main: '#FFFFFF', // White
//     },
//     background: {
//       default: '#F5F5F5', // Light grey
//     },
//     text: {
//       primary: '#000000',
//       secondary: '#666666',
//     },
//   },
//   typography: {
//     fontFamily: '"Helvetica Neue", Arial, sans-serif',
//     h1: {
//       fontSize: '2.5rem',
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: '2rem',
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.5,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 0,
//           padding: '10px 20px',
//           textTransform: 'uppercase',
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 0,
//           },
//         },
//       },
//     },
//   },
// });

// export default customTheme;

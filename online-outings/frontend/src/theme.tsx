import { createGlobalStyle } from 'styled-components'
import { createMuiTheme } from '@material-ui/core/styles';

const FOREGROUND_COLOR = '#4c4c4c'
const BACKGROUND_COLOR = '#fff'
const ACCENT_COLOR = '#a0d8ff'

const GlobalStyle = createGlobalStyle`
    :root {
        --background-color: ${BACKGROUND_COLOR};
        --foreground-color: ${FOREGROUND_COLOR};
        --accent-color: ${ACCENT_COLOR};
    }

    html {
        font-family: 'typeface-roboto';
        background-color: var(--background-color);
        color: var(--foreground-color);
        font-size: 16px;
    }

    a {
        /* text-decoration: none; */
        color: var(--foreground-color);

        &:hover {
            /* text-decoration: none; */
        }

        &:visited {
            color: var(--foreground-color);
        }
    }
`

const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: FOREGROUND_COLOR
        },
        secondary: {
            main: ACCENT_COLOR
        }
    }
})

export {
    GlobalStyle,
    materialTheme
}
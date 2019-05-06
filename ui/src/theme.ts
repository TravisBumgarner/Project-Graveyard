import { css, createGlobalStyle } from 'styled-components'

const theme = {
    color: {
        primary: '#000',
        secondary: '#fff',
        hover: '#0066ff'
    },
    icon: {
        size: '2rem'
    },
    border: {
        thickness: '10px'
    },
    font: {
        header: "font-family: 'Oswald', sans-serif",
        body: "font-family: 'Montserrat', sans-serif"
    }
}

const SCREEN_WIDTHS = {
    desktop: 1200,
    tablet: 768,
    phone: 376
}

const media = Object.keys(SCREEN_WIDTHS).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${SCREEN_WIDTHS[label] / 16}em) {
            ${css(...args)}
        }
    `

    return acc
}, {})

const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${theme.color.secondary};
        font-size: 16px;
        ${media.tablet`font-size: 14px;`}
    }
`

export { GlobalStyle }
export default theme

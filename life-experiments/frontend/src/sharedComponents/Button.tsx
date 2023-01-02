import styled from 'styled-components'

type ButtonProps = {
    variation: 'INTERACTION' | 'WARNING'
    disabled?: boolean
}

const Button = styled.button<ButtonProps>`
    font-size: 1rem;
    border: 2px solid;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    height: 2.5rem; // To Match Inputs
    
    &:hover {
    cursor: pointer;
    }
`

export default Button

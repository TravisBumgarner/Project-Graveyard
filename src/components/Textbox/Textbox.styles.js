import styled from 'styled-components'

// REFACTOR - is this 100% twice with flex around parent best?
const TextBoxWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TextArea = styled.textarea`
    flex: 1 1;
`

const Label = styled.label`
`

export {
    TextArea,
    Label,
    TextBoxWrapper,
}
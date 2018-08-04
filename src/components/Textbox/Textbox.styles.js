import styled from 'styled-components'

// REFACTOR - is this 100% twice with flex around parent best?
const TextBoxWrapper = styled.div`
    width: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
`

const Label = styled.label`
`

export {
    TextArea,
    Label,
    TextBoxWrapper,
}
import styled from 'styled-components'

import { DefaultPageWrapper } from '../../theme'

import {
    Card
} from '../../components'

const CreateSnippetWrapper = DefaultPageWrapper.extend`
    flex-direction: column;
    display: flex;
    width: 80%;
    height: 50%;
`

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const FullSizeCard = styled(Card)`
    flex: 1 1;
`

export {
    CreateSnippetWrapper,
    ControlsWrapper,
    FullSizeCard,
}


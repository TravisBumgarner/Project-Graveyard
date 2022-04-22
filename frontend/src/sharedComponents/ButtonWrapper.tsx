import React from 'react'
import styled from 'styled-components'

type ButtonWrapperProps = {
    left?: JSX.Element[]
    right?: JSX.Element[]
}

const ButtonWrapperWrapper = styled.div`
    display: flex;

    div {
        width: calc(100% / 2);
    }

    div:nth-child(1) {
        text-align: left;
    }

    div:nth-child(2){
        text-align: right;
    }

`

const ButtonWrapper = ({ left, right }: ButtonWrapperProps) => {
    return (
        <ButtonWrapperWrapper>
            <div>{left}</div>
            <div>{right}</div>
        </ButtonWrapperWrapper>
    )
}

export default ButtonWrapper

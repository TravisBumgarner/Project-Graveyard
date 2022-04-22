import React from 'react'
import styled from 'styled-components'

type ButtonWrapperProps = {
    left?: JSX.Element[]
    center?: JSX.Element[]
    right?: JSX.Element[]
}

const ButtonWrapperWrapper = styled.div`
    display: flex;

    div {
        width: calc(100% / 3);
    }

    div:nth-child(1) {
        text-align: left;
    }

    div:nth-child(2){
        text-align: center;
    }

    div:nth-child(3){
        text-align: right;
    }

`

const ButtonWrapper = ({ left, center, right }: ButtonWrapperProps) => {
    return (
        <ButtonWrapperWrapper>
            <div>{left}</div>
            <div>{center}</div>
            <div>{right}</div>
        </ButtonWrapperWrapper>
    )
}

export default ButtonWrapper

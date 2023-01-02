import React from 'react'
import styled from 'styled-components'
import { GitHub, Twitter } from '@material-ui/icons'

import { Text } from 'shared'
import logo from '../../favicon.png'


const LargeHeader = styled.h1`
    margin: 0;
    font-size: 2em;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1em 0;

    div {
        width: 50vw;
    }

    div:nth-child(2){
        text-align: right;
        font-size: 1em;

        a {
            margin-left: 1em;
        }
    }

    @media (max-width: 550px) {
        flex-direction: column;
        text-align: center;
        
        div {
            width: 100vw;
        }

        div:nth-child(2){
            text-align: center;
            margin-top: 0.5em;

            a {
                margin: 0 0.5em;
            }
        }


    }
`

const Title = () => {
    return <TitleWrapper>
        <div>
            <LargeHeader><img style={{ display: 'inline-block', height: "28px" }} src={logo} /> Online Outings</LargeHeader>
        </div>
        <div>
            <a href="https://forms.gle/omHLMwCqBJ9JhcVBA" target="_blank">Submit a Link!</a>
            <a target="_blank" href="https://github.com/TravisBumgarner/online-outings"><GitHub /></a>
            <a target="_blank" href="https://twitter.com/travis_the_makr"><Twitter /></a>
        </div>
    </TitleWrapper>
}

export default Title
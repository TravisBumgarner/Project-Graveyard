import React from 'react'

import { Heading, colors, List, } from 'sharedComponents'
import styled from 'styled-components'

import home1 from '../../static/home1.png'
import home2 from '../../static/home2.png'
import home3 from '../../static/home3.png'
import home4 from '../../static/home4.png'

const ContentWrapper = styled.div`
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border-color: ${colors.PRIMARY.base};
`

const Img = styled.img`
    margin-right: 1em;
    box-sizing: border-box;
    width:100%;
`

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem 0;
    justify-content: space-between;

    ${Heading.H3} {
        width: 10%;
    }

    ${ContentWrapper}{
        width: 85%;
    }
`

const content: { title: string, content: JSX.Element }[] = [
    {
        title: 'Practice writing and speaking!',
        content: <Img src={home1} />
    },
    {
        title: 'Submit Your Work for Feedback!',
        content: <Img src={home2} />
    },
    {
        title: 'Give Others Feedback!',
        content: <Img src={home3} />
    },
    {
        title: 'Review Your Feedback and Keep Going!',
        content: <Img src={home4} />
    },
    {
        title: 'New Features Coming Soon!',
        content: <List.UnorderedList>
            <List.ListItem>Export to your favorite Flash Card Application</List.ListItem>
            <List.ListItem>Want another feature? Request it with the feedback form below.</List.ListItem>
        </List.UnorderedList>
    }

]

const Home = () => (
    <div>
        <Heading.H2>Welcome!</Heading.H2>
        {
            content.map(({ title, content }) => {
                return (
                    <HomeWrapper>
                        <Heading.H3>
                            {title}
                        </Heading.H3>
                        <ContentWrapper>
                            {content}
                        </ContentWrapper>
                    </HomeWrapper>
                )
            })
        }

    </div>
)

export default Home

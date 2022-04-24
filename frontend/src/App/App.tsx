import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getIdToken, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'
import styled from 'styled-components'

import Theme from 'theme'
import { ExternalLink, Heading, Loading, LanguageDropdown } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from 'context'
import {
    ForgottenPassword,
    Home,
    ConditionalRoute,
    Login,
    Logout,
    Header,
    StudentDashboard,
    Context,
    Signup,
    Profile,
    ReviewerDashboard,
    Error,
    Footer,
    AlertMessage,
    Worksheet,
    Reviewers,
    CompletedReview,
    AddWorksheet,
    EditWorksheet,
    AddWorksheetEntry,
    EditWorksheetEntry
} from './components'
import { auth } from '../firebase'

const BetaTestAnnouncementWrapper = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    background-color: yellow;
    height: 50px;
    margin: 0;
    padding: 5px;
    z-index: 999;
`

const BetaSpaceHolder = styled.div`
    height: 50px;
`

const BetaTest = () => (
    <BetaTestAnnouncementWrapper>
        <Heading.H3>
            Beta Testers! <ExternalLink href="https://forms.gle/FSFHBxhuPCCMZRYx9">Your feedback form is here</ExternalLink>.
        </Heading.H3>
    </BetaTestAnnouncementWrapper>
)

const App = () => {
    const { state } = React.useContext(context)

    if (state.hasErrored) {
        return <Error />
    }

    if (state.currentUser === undefined) {
        return <Loading fullscreen />
    }

    return (
        <>
            {state.message ? <AlertMessage /> : null}
            <BetaTest />
            <BetaSpaceHolder />
            <Header />
            <LanguageDropdown label="lang" />
            <Routes>
                <Route
                    path="/worksheet/new"
                    element={(
                        <ConditionalRoute
                            authedComponent={<AddWorksheet />}
                        />
                    )}
                />
                <Route
                    path="/worksheet/:worksheetId/add"
                    element={(
                        <ConditionalRoute
                            authedComponent={<AddWorksheetEntry />}
                        />
                    )}
                />
                <Route
                    path="/worksheet/:worksheetId/:worksheetEntryId/edit"
                    element={(
                        <ConditionalRoute
                            authedComponent={<EditWorksheetEntry />}
                        />
                    )}
                />
                <Route
                    path="/worksheet/edit/:worksheetId"
                    element={(
                        <ConditionalRoute
                            authedComponent={<EditWorksheet />}
                        />
                    )}
                />
                <Route
                    path="/worksheet/:worksheetId"
                    element={(
                        <ConditionalRoute
                            authedComponent={<Worksheet />}
                        />
                    )}
                />
                <Route
                    path="/reviewer/dashboard"
                    element={(
                        <ConditionalRoute
                            authedComponent={<ReviewerDashboard />}
                        />
                    )}
                />
                <Route
                    path="/profile/:userId"
                    element={(
                        <ConditionalRoute
                            authedComponent={<Profile />}
                        />
                    )}
                />
                <Route
                    path="/signup"
                    element={(
                        <ConditionalRoute
                            authedComponent={<StudentDashboard />}
                            unauthedComponent={<Signup />}
                        />
                    )}
                />
                <Route
                    path="/login"
                    element={(
                        <ConditionalRoute
                            authedComponent={<StudentDashboard />}
                            unauthedComponent={<Login />}
                        />
                    )}
                />
                <Route
                    path="/logout"
                    element={(
                        <ConditionalRoute
                            authedComponent={<Logout />}
                            unauthedComponent={<Home />}
                        />
                    )}
                />
                <Route
                    path="/forgottenpassword"
                    element={(
                        <ConditionalRoute
                            authedComponent={<StudentDashboard />}
                            unauthedComponent={<ForgottenPassword />}
                        />
                    )}
                />
                <Route
                    path="/student/dashboard"
                    element={(
                        <ConditionalRoute
                            authedComponent={<StudentDashboard />}
                            unauthedComponent={<Home />}
                        />
                    )}
                />
                <Route
                    path="/reviewers"
                    element={(
                        <ConditionalRoute
                            authedComponent={<Reviewers />}
                            unauthedComponent={<Home />}
                        />
                    )}
                />
                <Route
                    path="/student/review/:worksheetId"
                    element={(
                        <ConditionalRoute
                            authedComponent={<CompletedReview />}
                        />
                    )}
                />
                <Route path="/error" element={<Error />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </>
    )
}

const WrappedApp = () => {
    const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { state, dispatch } = React.useContext(context)

    React.useEffect(() => {
        onAuthStateChanged(auth, async (firebase) => {
            try {
                if (!firebase) {
                    dispatch({
                        type: 'USER_LOGGED_IN',
                        data: {
                            currentUser: null,
                        },
                    })
                    return
                }

                const token = await getIdToken(firebase)
                const { data: phraseADay }: { data: TPhraseADayUser } = await axios.get(`${__API_ENDPOINT__}/whoami`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                })
                dispatch({
                    type: 'USER_LOGGED_IN',
                    data: {
                        currentUser: {
                            phraseADay,
                            firebase,
                        },
                    },
                })
            } catch (error) {
                dispatch({ type: 'HAS_ERRORED' })
            }
        })
    }, [])

    React.useEffect(() => {
        const getAuthedClient = async () => {
            const token = await getIdToken(state.currentUser.firebase)
            const authLink = setContext((_, { headers }) => ({
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            }))

            const httpLink = createHttpLink({
                uri: `${__API_ENDPOINT__}/graphql`,
            })

            const authedClient = new ApolloClient({
                cache: new InMemoryCache(),
                link: authLink.concat(httpLink),
            })
            setClient(authedClient)
            setIsLoading(false)
        }

        const getUnauthedClient = async () => {
            const httpLink = createHttpLink({
                uri: `${__API_ENDPOINT__}/graphql`,
            })

            const unauthedClient = new ApolloClient({
                cache: new InMemoryCache(),
                link: httpLink,
            })
            setClient(unauthedClient)
            setIsLoading(false)
        }

        if (state.currentUser) {
            getAuthedClient()
        } else {
            getUnauthedClient()
        }
    }, [state.currentUser])

    if (isLoading) {
        return <Loading fullscreen />
    }

    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    )
}

const ContextWrapper = () => (
    <Context>
        <>
            <Theme.GlobalStyle />
            <WrappedApp />
        </>
    </Context>
)

export default ContextWrapper

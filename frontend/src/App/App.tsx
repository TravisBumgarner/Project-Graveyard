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

import Theme from 'theme'
import { Loading } from 'sharedComponents'
import {
    ForgottenPassword,
    Home,
    ConditionalRoute,
    Login,
    Logout,
    Header,
    StudentDashboard,
    Context,
    context,
    Signup,
    Profile,
    ReviewDashboard,
    Error,
    Footer,
    AlertMessage,
    Worksheet
} from './components'
import Review from './components/StudentDashboard/components/Review'
import { TPhraseADayUser } from './types'
import { auth } from '../firebase'

const App = () => {
    const { state } = React.useContext(context)

    if (state.currentUser === undefined) {
        return <Loading fullscreen />
    }

    return (
        <>
            {state.message ? <AlertMessage /> : null}
            <Header />
            <Routes>
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
                            authedComponent={<ReviewDashboard />}
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
                    path="/student/review/:worksheetId"
                    element={(
                        <ConditionalRoute
                            authedComponent={<Review />}
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

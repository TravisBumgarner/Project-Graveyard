import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  NormalizedCacheObject
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getIdToken, onAuthStateChanged, User } from 'firebase/auth'
import axios from 'axios'

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
  StyleExploration,
  ReviewWorksheet,
  Error,
  Footer
} from './components'
import { Worksheet } from './components/StudentDashboard/components';
import { TPhraseADayUser } from './types';
import { auth } from '../firebase';
import { GlobalStyle } from 'theme';
import { Paragraph } from './components/StyleExploration';
import Review from './components/StudentDashboard/components/Review';

const App = () => {
  const { state } = React.useContext(context)

  if (state.currentUser === undefined) {
    return <Paragraph>Loading...</Paragraph>
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/reviewer/review/:worksheetId" element={<ConditionalRoute authedComponent={<ReviewWorksheet />} />} />
        <Route path="/reviewer/dashboard" element={<ConditionalRoute authedComponent={<ReviewDashboard />} />} />
        <Route path="/profile" element={<ConditionalRoute authedComponent={<Profile />} />} />
        <Route path="/signup" element={<ConditionalRoute authedComponent={<StudentDashboard />} unauthedComponent={<Signup />} />} />
        <Route path="/login" element={<ConditionalRoute authedComponent={<StudentDashboard />} unauthedComponent={<Login />} />} />
        <Route path="/logout" element={<ConditionalRoute authedComponent={<Logout />} unauthedComponent={<Home />} />} />
        <Route path="/forgottenpassword" element={<ConditionalRoute authedComponent={<StudentDashboard />} unauthedComponent={<ForgottenPassword />} />} />
        <Route path="/stylesheet" element={<StyleExploration />} />
        <Route path="/student/dashboard" element={<ConditionalRoute authedComponent={<StudentDashboard />} unauthedComponent={<Home />} />} />
        <Route path="/student/worksheet/:worksheetId" element={<ConditionalRoute authedComponent={<Worksheet />} />} />
        <Route path="/student/review/:worksheetId" element={<ConditionalRoute authedComponent={<Review />} />} />
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
          type: "USER_LOGGED_IN", data: {
            currentUser: null
          }
        })
        return
      }

      const token = await getIdToken(firebase)
      const { data: phraseADay }: { data: TPhraseADayUser } = await axios.get(__API_ENDPOINT__ + '/whoami', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ""
        }
      })
      dispatch({
        type: "USER_LOGGED_IN", data: {
          currentUser: {
            phraseADay,
            firebase
          }
        }
      })
    })
  }, [])

  React.useEffect(() => {
    const getAuthedClient = async () => {
      const token = await getIdToken(state.currentUser.firebase)
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });

      const httpLink = createHttpLink({
        uri: __API_ENDPOINT__ + '/graphql',
      });

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
      });
      setClient(client)
      setIsLoading(false)
    }

    const getUnauthedClient = async () => {
      const httpLink = createHttpLink({
        uri: __API_ENDPOINT__ + '/graphql',
      });

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
      });
      setClient(client)
      setIsLoading(false)
    }

    if (state.currentUser) {
      getAuthedClient()
    } else {
      getUnauthedClient()
    }


  }, [state.currentUser])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  )
}

const ContextWrapper = () => {
  return (
    <Context>
      <>
        <GlobalStyle />
        <WrappedApp />
      </>
    </Context>
  )
}

export default ContextWrapper

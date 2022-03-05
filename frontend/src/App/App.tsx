import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
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
  UserDashboard,
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
import { Worksheet } from './components/UserDashboard/components';
import { TPhraseADayUser, TWorksheet, TWorksheetEntry } from './types';
import { auth } from '../firebase';
import { GlobalStyle } from 'theme';
import { Paragraph } from './components/StyleExploration';
import Review from './components/UserDashboard/components/Review';

const HYDRATE_APP = gql`
query HydrateApp {
  worksheet {
    title,
    id,
    description,
    date,
    knownLanguage,
    newLanguage,
    userId,
    status,
    user {
      username
    }
  }
  worksheetEntries {
    id,
    knownLanguageText,
    newLanguageText,
    worksheetId,
    audioUrl
  }
}
`


const App = () => {
  const { state, dispatch } = React.useContext(context)
  useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[], worksheetEntries: TWorksheetEntry[] }>(HYDRATE_APP, { onCompleted: (data) => dispatch({ type: "HYDRATE_APP", data: { worksheets: data.worksheet, worksheetEntries: data.worksheetEntries } }) })
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
        <Route path="/signup" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Signup />} />} />
        <Route path="/login" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Login />} />} />
        <Route path="/logout" element={<ConditionalRoute authedComponent={<Logout />} unauthedComponent={<Home />} />} />
        <Route path="/forgottenpassword" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<ForgottenPassword />} />} />
        <Route path="/stylesheet" element={<StyleExploration />} />
        <Route path="/student/dashboard" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Home />} />} />
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

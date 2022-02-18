import * as React from 'react'
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
  Header,
  UserDashboard,
  Context,
  Navigation,
  context,
  Worksheet as WorksheetComponent,
  Signup,
  Profile,
  ReviewDashboard,
  StyleExploration,
  ReviewWorksheet
} from './components'
import { PandaAppUser, Worksheet, WorksheetEntry } from './types';
import { auth } from '../firebase';
import { GlobalStyle } from 'theme';

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
  }
  worksheetEntries {
    id,
    knownLanguageText,
    newLanguageText,
    worksheetId
  }
}
`


const Message = () => {
  const { state, dispatch } = React.useContext(context)
  const handleSubmit = () => {
    dispatch({ type: "DELETE_MESSAGE" })
  }

  if (state.message) {
    return (
      <div style={{ zIndex: '999', backgroundColor: 'white', border: '2px solid black' }}>
        <h1>{state.message}</h1>
        <button onClick={handleSubmit}>Ok</button>
      </div>
    )
  }
  return null
}

const App = () => {
  const { state, dispatch } = React.useContext(context)
  useQuery<{ worksheet: Worksheet[], worksheetEntries: WorksheetEntry[] }>(HYDRATE_APP, { onCompleted: (data) => dispatch({ type: "HYDRATE_APP", data: { worksheets: data.worksheet, worksheetEntries: data.worksheetEntries } }) })
  return (
    <>
      <Message />
      <Header />
      <Navigation />
      <Routes>
        <Route path="/worksheet/:worksheetId" element={<ConditionalRoute authedComponent={<WorksheetComponent />} />} />
        <Route path="/review/:worksheetId" element={<ConditionalRoute authedComponent={<ReviewWorksheet />} />} />
        <Route path="/review-dashboard" element={<ConditionalRoute authedComponent={<ReviewDashboard />} />} />
        <Route path="/profile" element={<ConditionalRoute authedComponent={<Profile />} />} />
        <Route path="/signup" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Signup />} />} />
        <Route path="/login" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Login />} />} />
        <Route path="/forgottenpassword" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<ForgottenPassword />} />} />
        <Route path="/stylesheet" element={<StyleExploration />} />
        <Route path="/user-dashboard" element={<ConditionalRoute authedComponent={<UserDashboard />} unauthedComponent={<Home />} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

const WrappedApp = () => {
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { state, dispatch } = React.useContext(context)

  React.useEffect(() => {
    onAuthStateChanged(auth, async (firebase) => {
      if (!firebase) return

      const token = await getIdToken(firebase)
      const { data: panda }: { data: PandaAppUser } = await axios.get('http://localhost:5001/whoami', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ""
        }
      })
      dispatch({
        type: "USER_LOGGED_IN", data: {
          currentUser: {
            panda,
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
        uri: 'http://localhost:5001/graphql',
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
        uri: 'http://localhost:5001/graphql',
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

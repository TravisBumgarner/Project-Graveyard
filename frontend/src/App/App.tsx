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
import { getIdToken } from 'firebase/auth'

import {
  ForgottenPassword,
  Home,
  ConditionalRoute,
  Login,
  Header,
  Dashboard,
  Context,
  Navigation,
  context,
  Worksheet as WorksheetComponent,
  Signup,
  Profile,
  StyleExploration
} from './components'
import { Worksheet, WorksheetEntry } from './types';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

const HYDRATE_APP = gql`
query HydrateApp {
  worksheet {
    title,
    id,
    description,
    date,
    knownLanguage,
    newLanguage
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
        <Route path="/profile" element={<ConditionalRoute authedComponent={<Profile />} />} />
        <Route path="/signup" element={<ConditionalRoute authedComponent={<Dashboard />} unauthedComponent={<Signup />} />} />
        <Route path="/login" element={<ConditionalRoute authedComponent={<Dashboard />} unauthedComponent={<Login />} />} />
        <Route path="/forgottenpassword" element={<ConditionalRoute authedComponent={<Dashboard />} unauthedComponent={<ForgottenPassword />} />} />
        <Route path="/stylesheet" element={<StyleExploration />} />
        <Route path="/" element={<ConditionalRoute authedComponent={<Dashboard />} unauthedComponent={<Home />} />} />
      </Routes>
    </>
  )
}

const WrappedApp = () => {
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { state, dispatch } = React.useContext(context)
  console.log('app', state.worksheets)
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async currentUser => {
      dispatch({ type: "USER_AUTHED", data: { currentUser } })

      const token = currentUser ? await getIdToken(currentUser) : ''
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
      return unsubscribe
    })

  }, [])

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
      <WrappedApp />
    </Context>
  )
}

export default ContextWrapper

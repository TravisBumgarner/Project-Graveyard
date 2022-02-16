import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { Home, Context, Navigation, context, Worksheet as WorksheetComponent } from './components'
import { Worksheet, WorksheetEntry } from './types';

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});

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

const App = () => {
  const { state, dispatch } = React.useContext(context)
  useQuery<{ worksheet: Worksheet[], worksheetEntries: WorksheetEntry[] }>(HYDRATE_APP, { onCompleted: (data) => dispatch({ type: "HYDRATE_APP", data: { worksheets: data.worksheet, worksheetEntries: data.worksheetEntries } }) })

  if (!state.appHydrated) return <div>Loading</div>

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/worksheet/:worksheetId" element={<WorksheetComponent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Context>
          <App />
        </Context>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default WrappedApp

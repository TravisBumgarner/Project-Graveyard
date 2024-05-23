import { context } from 'Context'
import { useContext, useMemo } from 'react'
import { EActivePage } from 'types'
import { About, Error, Home } from '../pages'

const Router = () => {
  const { state: { activePage } } = useContext(context)
  const page = useMemo(() => {
    switch (activePage) {
      case EActivePage.Home:
        return <Home />
      case EActivePage.About:
        return <About />
      default:
        return <Error />
    }
  }, [activePage])

  return page
}

export default Router

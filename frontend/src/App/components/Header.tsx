import React from 'react'

import { context } from '.'

const Header = () => {
    const { state } = React.useContext(context)


    return (
        <div>
            <h1>Panda!!</h1>
            {state.currentUser ? <p>Welcome {state.currentUser.panda.userName}</p> : <p>You should login</p>}
        </div>
    )
}

export default Header
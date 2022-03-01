import React from 'react'

import { context } from '.'

const Header = () => {
    const { state } = React.useContext(context)


    return (
        <div>
            <h1>Flash Sentences</h1>
            {state.currentUser ? <p>Welcome {state.currentUser.panda.username}</p> : <p>You should login</p>}
        </div>
    )
}

export default Header
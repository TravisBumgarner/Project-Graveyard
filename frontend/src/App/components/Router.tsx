import React from 'react'
import { Routes, Route } from 'react-router'

import { Charts, Journal, Home } from '../pages'

const Router = () => {
    return (
        <Routes>
            <Route
                path="/charts"
                element={<Charts />}
            />
            <Route
                path="/journal"
                element={<Journal />}
            />
            <Route
                path="/*"
                element={<Home />}
            />
        </Routes>
    )
}

export default Router

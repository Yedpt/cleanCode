import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Nav'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout

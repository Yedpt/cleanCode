import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import Noticias from '../pages/Noticias'
import NoticiaDetalle from '../pages/NoticiaDetalle'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Perfil from '../pages/Perfil'

export const routes = createBrowserRouter([{
    path : '/',
    element: <Layout/>,
    children:[
        {
            index:true,
            element: <Home/>
        },
        {
            path: 'noticias',
            element: <Noticias/>
        },
        {
            path: 'noticias/:id',
            element: <NoticiaDetalle/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'registro',
            element: <Registro/>
        },
        {
            path: 'perfil',
            element: <Perfil/>
        }


    ]
}])

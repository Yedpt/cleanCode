import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import Noticias from '../pages/Noticias'
import NoticiaDetalle from '../pages/NoticiaDetalle'

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
        }


    ]
}])

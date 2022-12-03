

import React from 'react'

import { createRoot } from 'react-dom/client'



import App from 'src/screens/App'


import 'src/index.scss'



import { ROOT_ELEMENT_ID } from './constants/main'





const baseContainer: HTMLElement | null = document.getElementById(ROOT_ELEMENT_ID)






/**
 * Обёртка для рендеринга React-компонент
 * @param {React.ReactNode} children
 * @param {HTMLElement} container
 */
export const makeRendering = (children: React.ReactNode, container = baseContainer): void => {

    const root = createRoot(container as HTMLElement)

    root.render(children)
}



makeRendering(<App />)




import React from 'react'

import { createPortal } from 'react-dom'



import { ROOT_ELEMENT_ID } from 'src/constants/main'





interface ComponentWithChildren {
    children: React.ReactNode
}

interface PortalWrapperProps extends ComponentWithChildren {
    portal?: HTMLElement | null
}



const root = document.getElementById(ROOT_ELEMENT_ID)



const PortalWrapper = (props: PortalWrapperProps): React.ReactPortal => {

    const { children, portal } = props

    const rootPortal = React.useMemo<HTMLDivElement>(() => {

        return document.createElement('div')
    }, [])


    React.useEffect(() => {

        root?.appendChild(rootPortal)

        return () => {

            rootPortal && root?.removeChild(rootPortal)
        }
    }, [rootPortal])


    const basePortal = React.useMemo<React.ReactPortal>(() => {

        return createPortal(children, ((portal || rootPortal) as Element))

    }, [rootPortal])


    return basePortal
}



export default PortalWrapper

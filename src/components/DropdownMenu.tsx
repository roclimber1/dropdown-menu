


import React from 'react'


import { DROPDOWN_MENU_POPUP_WIDTH } from 'src/constants/main'


import styled from 'styled-components'

import PortalWrapper from 'src/components/PortalWrapper'






const DropdownMenuPopup = styled.section`
    width: ${DROPDOWN_MENU_POPUP_WIDTH}px;

    font-family: 'Montserrat', sans-serif;

    position: absolute;
    border: 1px solid #666;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;

    background: #fff;
    text-align: center;
    z-index: 1;

    display: inline-grid;
`



const DropdownMenuWrapper = styled.section`
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
`



enum MOUSE_EVENT {
    MOUSEOVER = 'mouseover',
    MOUSEOUT = 'mouseout',
    CLICK = 'click'
}


interface DropdownMenuProps {
    menuItems?: Array<JSX.Element>
    target: JSX.Element
}



const DefaultMenuBlock = (): JSX.Element => {

    return <React.Fragment>

        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
    </React.Fragment>
}






const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {

    const { target, menuItems = [(<DefaultMenuBlock key={'menu-item-block'} />)]} = props

    const wrapper = React.useRef<HTMLDivElement>(null)


    const [show, setShow] = React.useState<boolean>(false)
    const [popupStyle, setPopupStyle] = React.useState<React.CSSProperties>({})



    const handleMouseEvent = (event: MouseEvent): void => {

        const { type, target } = event ?? {}
        const style: React.CSSProperties = calculatePopupPosition()


        switch (type) {

            case MOUSE_EVENT.MOUSEOVER:

                setPopupStyle(style)
                setShow(true)

                break

            case MOUSE_EVENT.MOUSEOUT:

                setShow(false)

                break

            case MOUSE_EVENT.CLICK:

                if (!(target as HTMLElement)?.closest('button')) {

                    setShow(false)
                }

                break
        }
    }


    React.useEffect(() => {

        wrapper.current?.addEventListener(MOUSE_EVENT.MOUSEOVER, handleMouseEvent)
        wrapper.current?.addEventListener(MOUSE_EVENT.MOUSEOUT, handleMouseEvent)
        document.addEventListener(MOUSE_EVENT.CLICK, handleMouseEvent)


        return () => {

            wrapper.current?.removeEventListener(MOUSE_EVENT.MOUSEOVER, handleMouseEvent)
            wrapper.current?.removeEventListener(MOUSE_EVENT.MOUSEOUT, handleMouseEvent)
            document.removeEventListener(MOUSE_EVENT.CLICK, handleMouseEvent)
        }
    }, [target])




    function calculatePopupPosition(): React.CSSProperties {

        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = (wrapper.current as HTMLElement) ?? {}

        const position: React.CSSProperties = {
            top: offsetTop,
            left: offsetWidth + offsetLeft
        }

        if ((offsetWidth + offsetLeft) > window.innerWidth - DROPDOWN_MENU_POPUP_WIDTH) {

            position.left = offsetLeft - offsetWidth / 2 - DROPDOWN_MENU_POPUP_WIDTH
        }

        if ((offsetHeight + offsetTop) > window.innerHeight - DROPDOWN_MENU_POPUP_WIDTH) {

            delete position.top
            position.bottom = window.innerHeight - offsetTop - offsetHeight
        }

        return position
    }



    const handleClick: React.MouseEventHandler<Element> = () => {

        setShow((prevState: boolean) => !prevState)

        const style: React.CSSProperties = calculatePopupPosition()

        setPopupStyle(style)
    }



    const TargetBlock: React.FC = (props) => {

        return React.cloneElement(target, {
            ...target.props,
            ...props,
            onClick: (event: React.MouseEvent<Element>) => {

                handleClick(event)
            }
        })
    }


    const menuItemsBlock = React.useMemo<Array<JSX.Element>>(() => {

        return menuItems.map(
            (item, index) => (React.cloneElement(item, {
                key: `menu-item-${index}`,
                ...item.props,
                onClick: (event: React.MouseEvent<Element>) => {

                    setShow(false)
                    item.props.onClick(event)
                }
            }))
        )
    }, [menuItems])



    return (<DropdownMenuWrapper ref={wrapper}>


        {show && <PortalWrapper>

            <DropdownMenuPopup style={popupStyle}>

                {menuItemsBlock}
            </DropdownMenuPopup>
        </PortalWrapper>}


        <TargetBlock />

    </DropdownMenuWrapper>)
}




export default DropdownMenu




import React from 'react'


import { DROPDOWN_MENU_POPUP_MARGIN, DROPDOWN_MENU_POPUP_WIDTH, SCROLL_BAR_SIZE } from 'src/constants/main'

import { checkScrollbars } from 'src/utils/main'


import styled from 'styled-components'

import PortalWrapper from 'src/components/PortalWrapper'








const DropdownMenuPopup = styled.section`
    width: ${DROPDOWN_MENU_POPUP_WIDTH}px;

    position: absolute;
    border: 1px solid #666;
    border-radius: 5px;
    margin: ${DROPDOWN_MENU_POPUP_MARGIN}px;
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
    CLICK = 'click',
    SCROLL = 'scroll'
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



interface TargetBlockProps {
    onClick?: React.MouseEventHandler
}




function DropdownMenu<TargetProps extends TargetBlockProps>(props: DropdownMenuProps): JSX.Element {

    const { target, menuItems = [(<DefaultMenuBlock key={'menu-item-block'} />)]} = props

    const wrapper = React.useRef<HTMLDivElement>(null)


    const [show, setShow] = React.useState<boolean>(false)
    const [popupStyle, setPopupStyle] = React.useState<React.CSSProperties>({})

    const [visible, setVisible] = React.useState<boolean>(true)




    const handleMouseEvent = (event: Event): void => {

        const { offsetX, offsetY } = (event as MouseEvent) ?? {}
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = (wrapper.current as HTMLElement) ?? {}

        const condition = !(((offsetX > offsetLeft) && (offsetX < offsetLeft + offsetWidth))
        && ((offsetY > offsetTop) && (offsetY < offsetTop + offsetHeight)))


        if (condition) {

            setShow(false)
        }
    }


    const getViewPortCondition = (element: HTMLElement): boolean => {

        const { top, left, bottom, right } = element.getBoundingClientRect()

        const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth)


        const condition = (top < 0) || (left < 0) || (bottom > windowHeight) || (right > windowWidth)

        return condition
    }


    const handleScroll = (): void => {

        const wrapperCondition = getViewPortCondition(wrapper.current as HTMLElement)

        if (wrapperCondition) {

            setVisible(false)
        } else {

            setVisible(true)
        }
    }


    React.useEffect(() => {

        document.addEventListener(MOUSE_EVENT.CLICK, handleMouseEvent)
        document.addEventListener(MOUSE_EVENT.SCROLL, handleScroll)

        return () => {
            document.removeEventListener(MOUSE_EVENT.CLICK, handleMouseEvent)
            document.removeEventListener(MOUSE_EVENT.SCROLL, handleScroll)
        }
    }, [target])




    const calculatePopupPosition = (event: React.MouseEvent): React.CSSProperties => {

        const { clientX = 0, clientY = 0, pageX = 0, pageY = 0 } = event
        const { offsetHeight: height, offsetLeft, offsetTop } = (wrapper.current as HTMLElement)

        const offsetY = pageY - clientY
        const offsetX = pageX - clientX

        const y = offsetTop - offsetY
        const x = offsetLeft - offsetX

        const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth)

        const { horizontal, vertical } = checkScrollbars()


        const position: React.CSSProperties = {
            top: y + height - DROPDOWN_MENU_POPUP_MARGIN * 2 + offsetY,
            left: x + offsetX
        }

        if (x > windowWidth - DROPDOWN_MENU_POPUP_WIDTH) {

            position.left = x - DROPDOWN_MENU_POPUP_WIDTH + offsetX + DROPDOWN_MENU_POPUP_MARGIN + (vertical ? SCROLL_BAR_SIZE : 0)
        }

        if (y > windowHeight - DROPDOWN_MENU_POPUP_WIDTH) {

            delete position.top
            position.bottom = windowHeight - y - DROPDOWN_MENU_POPUP_MARGIN * 2 - offsetY - (horizontal ? SCROLL_BAR_SIZE : 0)
        }

        return position
    }


    const preparePopup = (event: React.MouseEvent): void => {

        const style: React.CSSProperties = calculatePopupPosition(event)

        setPopupStyle(style)
    }


    const handleClick: React.MouseEventHandler<Element> = (event) => {

        setShow((prevState: boolean) => {

            const newState = !prevState

            if (newState) {

                preparePopup(event)
            }

            return newState
        })
    }



    const TargetBlock = (): JSX.Element => {


        const clonesProps: TargetProps = {
            ...target.props,
            onClick: handleClick
        }

        return React.cloneElement(target, clonesProps)
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

        {show && visible && <PortalWrapper>

            <DropdownMenuPopup style={popupStyle}>

                {menuItemsBlock}
            </DropdownMenuPopup>
        </PortalWrapper>}


        <TargetBlock />

    </DropdownMenuWrapper>)
}




export default DropdownMenu

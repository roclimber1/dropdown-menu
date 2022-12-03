


import React from 'react'

import { Menu, Copy, Delete, Edit, Feather, Gift, Trash2 } from 'react-feather'


import Button from 'src/components/Button'
import DropdownMenu from 'src/components/DropdownMenu'

import SpaceBlock from 'src/components/SpaceBlock'



import styled from 'styled-components'



import type { ButtonProps } from 'src/components/Button'






const MainBlock = styled.section`
    height: 98vh;
    width: 98vw;
`


const WrapperTop = styled.section`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
`




enum MENU_ITEM {
    COPY = 'copy',
    DELETE = 'delete',
    EDIT = 'edit',
    FEATHER = 'feather',
    GIFT = 'gift'
}



const MENU_ITEMS: Array<ButtonProps> = [
    {
        icon: <Copy />,
        title: 'Copy',
        name: MENU_ITEM.COPY
    },
    {
        icon: <Trash2 />,
        title: 'Delete',
        name: MENU_ITEM.DELETE
    },
    {
        icon: <Edit />,
        title: 'Edit',
        name: MENU_ITEM.EDIT
    },
    {
        icon: <Feather />,
        title: 'Feather',
        name: MENU_ITEM.FEATHER
    },
    {
        icon: <Gift />,
        title: 'Gift',
        name: MENU_ITEM.GIFT
    }
]



const App = (): JSX.Element => {


    const [title, setTitle] = React.useState<string>('')


    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        const { name } = (event.target as HTMLInputElement) ?? {}


        switch (name) {

            case MENU_ITEM.COPY:

                setTitle(`COPY ${name}`)

                break

            case MENU_ITEM.DELETE:

                setTitle(`DELETE ${name}`)

                break

            case MENU_ITEM.EDIT:

                setTitle(`EDIT ${name}`)

                break

            default:

                setTitle(name)
        }
    }


    const menuItems = React.useMemo<Array<JSX.Element>>(() => {

        return MENU_ITEMS.map((item, index) => <Button
            {...item}
            onClick={handleClick}
            key={`sbt-menu-item-${index}`}
        />)
    }, [])



    return (<React.Fragment>

        <MainBlock>

            <WrapperTop>

                <DropdownMenu
                    target={<Button icon={<Menu />} />}
                    menuItems={menuItems}
                />




                <DropdownMenu
                    target={<Button icon={<Menu />} />}
                />

            </WrapperTop>


            <SpaceBlock title={title} />


            <WrapperTop>

                <DropdownMenu
                    target={<Button icon={<Menu />} />}
                />




                <DropdownMenu
                    target={<Button icon={<Menu />} />}
                    menuItems={menuItems}
                />

            </WrapperTop>


        </MainBlock>

    </React.Fragment>)
}




export default App

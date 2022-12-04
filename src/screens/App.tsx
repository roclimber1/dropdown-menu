


import React from 'react'

import { Menu, Copy, Briefcase, Edit, Feather, Gift, Trash2, Command, GitHub } from 'react-feather'


import Button from 'src/components/Button'
import DropdownMenu from 'src/components/DropdownMenu'

import SpaceBlock from 'src/components/SpaceBlock'



import styled from 'styled-components'



import type { ButtonProps } from 'src/components/Button'






const MainBlock = styled.section`
    height: 98vh;
    width: 97em;
    padding: 1em;
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

                setTitle(`${name?.toLocaleUpperCase()}`)
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

                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Menu />} />}
                    menuItems={menuItems}
                />


                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Command />} />}
                />


                <DropdownMenu<ButtonProps>
                    target={<Button icon={<GitHub />} />}
                />


                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Briefcase />} />}
                    menuItems={menuItems}
                />

            </WrapperTop>


            <SpaceBlock height={68} title={title} />


            <WrapperTop>

                <DropdownMenu<ButtonProps>
                    target={<Button icon={<GitHub />} />}
                />


                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Briefcase />} />}
                    menuItems={menuItems}
                />

                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Menu />} />}
                    menuItems={menuItems}
                />


                <DropdownMenu<ButtonProps>
                    target={<Button icon={<Command />} />}
                />

            </WrapperTop>


        </MainBlock>

    </React.Fragment>)
}




export default App

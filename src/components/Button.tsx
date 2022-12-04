
import React from 'react'


import styled from 'styled-components'







const BaseButton = styled.button`
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;

    background: none;
    border: 1px solid #666;
    border-radius: 5px;

    margin: 5px;
    padding: 10px;

    font-weight: bold;
    color: #666;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
    background: #ccc;
    border: 1px solid #fffc;
    color: #fff;
    }

    &:active {
    opacity: 0.7;
    }
`


export interface ButtonProps {
    title?: string
    icon?: JSX.Element
    name?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}




const Button: React.FC<ButtonProps> = (props) => {

    const { title = '', icon = null, name = '', onClick } = props


    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        onClick && onClick(event)
    }


    return (<BaseButton
        name={name}
        onClick={handleClick}
    >
        {title}
        {icon}
    </BaseButton>)
}


export default Button

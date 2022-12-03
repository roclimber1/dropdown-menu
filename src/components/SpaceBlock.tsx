
import React from 'react'


import styled from 'styled-components'





interface SpaceProps {
    title: string
    className?: string
}


const Space: React.FC<SpaceProps> = ({ title, className }) => {

    return <div className={className}>
        {title}
    </div>
}


const SpaceBlock = styled(Space)`
    height: 33em;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Montserrat', sans-serif;
`


export default SpaceBlock

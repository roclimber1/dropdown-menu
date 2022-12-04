
import React from 'react'


import styled from 'styled-components'





interface SpaceProps {
    title?: string
    className?: string
    height?: number
}


const Space: React.FC<SpaceProps> = ({ title = '', className }) => {

    return <div className={className}>
        {title}
    </div>
}


const SpaceBlock = styled(Space)`
    height: ${(props: SpaceProps) => props.height ? props.height : 37}em;

    display: flex;
    align-items: center;
    justify-content: center;
`


export default SpaceBlock

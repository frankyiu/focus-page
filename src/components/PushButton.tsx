import React from "react"
import styled from "styled-components"

interface PushButtonAttribute extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    active: boolean
}


function PushButton({active=false, children, ...props}: PushButtonAttribute) {
    

    const StyledButton = styled.button`
        width: 100px;
        background: gray;
        padding: 0px;
        border: none;
        border-radius: 5px;
        transform: translateY(6px);

        &:active .front {
            transform: translateY(-2px);
        }
    `

    const FrontSpan = styled.span<{$active?: boolean}>`
        background: white;
        display: block;
        padding: 8px 24px;
        border-radius: 5px;
        transform: ${props => props.$active ? 'translateY(-2px)': 'translateY(-6px)'};
    `

    return (

        <StyledButton {...props} >
            <FrontSpan $active={active} className="front">
                {children}
            </FrontSpan> 
        </StyledButton>
    )
}

export default React.memo(PushButton)
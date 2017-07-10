import React, { Component } from 'react'
import { Title } from './title'
import styled, { keyframes } from 'styled-components'

export default (props) => {
    return (
        <Wrapper>
            <BiggerTitle>
                {props.text? props.text: 'Loading'}
                <Span>.</Span><Span>.</Span><Span>.</Span>
            </BiggerTitle>
        </Wrapper>
    )
}

const BiggerTitle = Title.extend`
    font-size: 5rem;
`

const Blink = keyframes`
    0% {
        opacity: .2;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: .2;
    }
`

const Span = styled.span`
    font-size: 5rem;
    animation-fill-mode: both;
    animation: ${Blink} 1.4s linear infinite;
    &:nth-child(2) {
        animation-delay: .2s;
    }
    &:nth-child(3) {
        animation-delay: .4s;
    }
`

const Wrapper = styled.div`
    margin-top: 15%;
    text-align: center;
    color: #FF0322;
`
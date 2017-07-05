import styled from 'styled-components'

export const Title = styled.h1`
 color: #FF0322;
 font-size: 20px;
 font-size: 2.2rem;
 line-height: 2;
 font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
`

export const InfoTitle = Title.extend`
  font-size: 1.8rem;
  color: #FF0322;
`

export const H2 = Title.extend`
  color: #9B9B9B;
  font-size: 2.0rem;
`

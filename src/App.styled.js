import styled from "styled-components";

export const AppStyled = styled.div`
  width: 1000px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  color: #4f4f4f;
  font-weight: light;
`;

export const ConnectorStyled = styled.div`
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  color: #7a7a7a;
  span {
    position: absolute;
    top: -15px;
    left: calc(50% - 100px);
    display: block;
    width: 200px;
    text-align: center;
    pointer-events: none;
  }
`;

export const ConnectorImageStyled = styled.img`
  width: 100%;
  height: 100%;
`;

export const TestStyled = styled.img`
  object-fit: cover;
`;

export const GridStyled = styled.div`
  position: relative;
  width: 1000px;
  height: 1000px;
  position: relative;
  background-color: #e9e9e9;
  margin-bottom: 10px;
  ${ConnectorStyled} {
    cursor: pointer;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    position: absolute;
    &:hover {
      width: 50px;
      height: 50px;
      transition: all 0.2s ease-in;
      z-index: 1;
      color: #4f4f4f;
    }
  }
`;

export const InterestingConnectorListStyled = styled.div`
  position: relative;
  width: 1000px;
  min-height: 100px;
  border: 1px solid red;
  display: flex;
  align-items: flex-start;
  ${ConnectorStyled} {
    position: static;
    width: auto;
    span {
      display: none;
    }
  }
`;

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h1,
  h2 {
    margin: 0;
    font-weight: 100;
    font-size: 2em;
  }
`;

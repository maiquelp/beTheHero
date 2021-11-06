import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Power, X, Trash2, RefreshCw } from '@styled-icons/feather'

export const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
`;

export const Span = styled.span`
    font-size: 20px;
    margin-left: 24px;
`;

export const Img = styled.img`
    height: 64px;
`;

export const StyledLink = styled(Link)`
    &.button {
        width: 260px;
        margin-left: auto;
        margin-top: 0;
    }
`;

export const PowerButton = styled(Power)`
    width: 20px;
    height: 20px;
    color: #e02041;
    stroke-width: 3;
`;

export const XButton = styled(X)`
    width: 20px;
    height: 20px;
    color: #a8a8b3;
    stroke-width: 3;
`;

export const Loading = styled(RefreshCw)`
    animation: rotation 2s infinite linear;
    width: 50px;
    height: 50px;
    color: #a8a8b3;
    stroke-width: 3;
    top: 50%;
    left: 50%;
    z-index: 1000;
    position: absolute;
`;

export const Trash2Button = styled(Trash2)`
    width: 20px;
    height: 20px;
    color: #e02041;
    stroke-width: 2;
`;

export const Button = styled.button`
    height: 60px;
    width: 60px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: border-color 0.2s;
    &:hover {
        border-color: #999;
    }
`;

export const H1 = styled.h1`
    margin-top: 80px;
    margin-bottom: 24px;
`;

export const Ul = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    list-style: none;
`;

export const Li = styled.li`
    background: #fff;
    padding: 14px;
    border-radius: 8px;
    position: relative;
`;

export const Trash = styled.button`
    background: #fff;
    position: absolute;
    right: 14px;
    top: 14px;
    border: 0;
    :hover {
        opacity: 0.8;
    }
`;

export const Delete = styled.button`
    background: #fff;
    position: absolute;
    right: 46px;
    top: 14px;
    border: 0;
`;

export const Strong = styled.strong`
    display: block;
    margin-bottom: 10px;
    color: #41414d;
`;

export const P = styled.p`
    color: #737380;
    line-height: 21px;
    font-size: 16px;
    & + strong {
        margin-top: 14px;
    }
`;
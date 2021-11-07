import styled from 'styled-components';
import { LogIn } from '@styled-icons/feather';

export const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Section = styled.section`
    width: 100%;
    max-width: 350px;
    margin-right: 30px;
`;

export const Form = styled.form`
    margin-top: 10%;
`;

export const LoginButton = styled(LogIn)`
    width: 20px;
    height: 20px;
    color: #e02041;
    stroke-width: 3;
`;

export const Input = styled.input`
    margin-top: 8px;
`;

export const H1 = styled.h1`
    font-size: 32px;
    margin-bottom: 32px;
    color: #41414d;
`;

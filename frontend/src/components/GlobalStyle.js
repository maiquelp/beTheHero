import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    /* @ import migrated to index.html due styled-components warning */
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        font: 400 14px Roboto, sans-serif;
        background: #e0f0f5;
        -webkit-font-smoothing: antialiased; 
    }

    input, button, textarea, select {
        font: 400 18px Roboto, sans-serif;
    }

    button {
        cursor: pointer;
    }

    form input, select {
        width: 100%;
        height: 60px;
        color: #333;
        border: 1px solid #dcdce6;
        border-radius: 8px;
        padding: 0 24px;
        background-color: #fff;
    }

    select:required:invalid {
        color: #737380;
    }

    form textarea {
        width: 100%;
        min-height: 140px;
        height: 60px;
        color: #333;
        border: 1px solid #dcdce6;
        border-radius: 8px;
        padding: 16px 24px;
        line-height: 24px;
        resize: vertical;
    }

    h1{
        color: #41414d;
    }

    .button {
        width: 100%;
        height: 60px;
        background: #e02041;
        border: 0;
        border-radius: 8px;
        color: #fff;
        font-weight: 700;
        margin-top: 16px;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        line-height: 60px;
        transition: filter 0.2s;
    }

    .button:hover {
        filter: brightness(90%);
    }

    .button:disabled {
        opacity: 0.5;
    }

    .back-link {
        display: flex;
        align-items: center;
        margin-top: 22px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: 600;
        transition: opacity 0.2s;
    }

    .back-link:hover {
        opacity: 0.8;
    }

    .back-link sgv {
        margin-right: 8px;
    }

    input:focus, select:focus, textarea:focus {
        border: 1px solid #338FFF;
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

`;


import React from 'react';
import { Spinner } from './Spinner';

const ReqButton = props => {
    return (
        <button className="button" type="submit" disabled={props.loading}>
            {props.loading && <Spinner />}
            {props.loading && <span>{props.loadingText}</span>}
            {!props.loading && <span>{props.text}</span>}
        </button>
    )
}

export default ReqButton;
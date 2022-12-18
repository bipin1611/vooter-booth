import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast';
import {useSelector} from "react-redux";
import config from '../config.json'

function AlertMessage() {
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);


    const chainId = useSelector(state => state.provider.chainId)
    const isPending = useSelector(state => state.vote.transaction.isInProgress)
    const isError = useSelector(state => state.vote.transaction.isFail)
    const isSuccess = useSelector(state => state.vote.transaction.isSuccess)
    const account = useSelector(state => state.provider.account)
    const events = useSelector(state => state.vote.events)

    useEffect(() => {
        if ((isPending || isError || isSuccess || events[0]) && account)
            setShowA(true);
    }, [isPending, isError,isSuccess, account])


    return (
        <div className='notification'>
            {isPending ? (
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>

                        <strong className="me-auto text-info">Transaction is In-Progress...!!</strong>

                    </Toast.Header>
                </Toast>
            ) : isError ? (
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>

                        <strong className="me-auto text-danger">Transaction will fail....!!</strong>
                    </Toast.Header>
                </Toast>
            ) : !isError && events[0] ? (
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>

                        <strong className="me-auto text-success">Transaction Successful!!....!!</strong>

                    </Toast.Header>
                    <Toast.Body>

                        <a
                            href={config[chainId] ? `${config[chainId].exploreURL}/tx/${events[0].transactionHash}` : '#'}
                            target='_blank'
                            rel='noreferrer'
                        >
                            {events[0].transactionHash.slice(0, 30) + '.............'}
                        </a>
                    </Toast.Body>
                </Toast>
            ) : (
                <p></p>
            )}

        </div>
    );
}

export default AlertMessage;
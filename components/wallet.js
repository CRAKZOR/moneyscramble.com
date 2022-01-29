import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';

import { useEffect, useState } from 'react';

const Wallet = (props) => {
    const { loading, wallet, formatter, handleDelete, handleScramble, handleClear } = props;

    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        if (wallet.length) {
            let newTotal=0;
            wallet.forEach(cash => {
                newTotal+=cash.float;
            })
            setTotal(newTotal);
        } else {
            setTotal(0);
        }
    }, [wallet]);

    return (
        <Col className="p-3 p-lg-5" xl={8}>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h1 className="display-6 m-2">
                        <i className="bi bi-wallet2"></i> Wallet
                    </h1>
                    { total > 0 && 
                        <ButtonGroup>
                            <Button type="button" variant="outline-secondary" onClick={() => handleClear()}>
                                <i className="bi bi-stars"></i> Clear
                            </Button> 
                            <Button type="button" variant="outline-secondary" onClick={() => handleScramble()}>
                                { loading ? 
                                    <Spinner animation="border" variant="light" size="sm" /> :
                                    <i className="bi bi-dice-3-fill"></i>
                                }
                                {' '}Scramble
                            </Button> 
                        </ButtonGroup>
                    }
                </Card.Header>
                <Card.Body className="p-0">
                    {
                        wallet.length ? (
                            <ListGroup variant="flush">
                                {
                                    wallet.map((cash, i) => 
                                        <ListGroup.Item key={cash.id} className="text-end">
                                            <div className="float-start">
                                                {i+1}.
                                            </div>
                                            <code>{cash.amount}</code>
                                            <CloseButton type="button" className="ms-3" aria-label="Close" onClick={() => handleDelete(cash.id)}></CloseButton>
                                        </ListGroup.Item>
                                    )
                                } 
                            </ListGroup>
                        ) : <p className="text-muted lead m-0 py-3">There is nothing here :(</p>
                    }


                </Card.Body>
                <Card.Footer className="text-muted small">
                    { total ?
                        <Card.Text className="lead text-end">
                            <span className="float-start">Total: </span>{formatter.format(total.toString())}
                        </Card.Text> :
                        <em><small>Add money from the form above.</small></em>
                    }
                </Card.Footer>
            </Card>
        </Col>

    )
}

export default Wallet;
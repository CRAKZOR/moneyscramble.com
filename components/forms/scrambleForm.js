import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ScrambleForm = (props) => {
    const { handleSubmit, loading } = props;

    const defaultForm = {
        id: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2),
        amount: ''
    }

    // const randomDollar = Math.floor(Math.random() * 190 + 10);
    // const randomCents = Math.floor(Math.random() * 90 + 10);
    const placeholder = `Enter an amount, ex: 100.50`

    const [ form, setForm ] = useState(defaultForm);

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.amount) {
            handleSubmit(form);
            setForm(defaultForm);
        }
    }
    return (
        <Form onSubmit={onSubmit} className="justify-content-center gy-3">
            <Col>
                <InputGroup className="justify-content-center">
                    <InputGroup.Text id="form-amount-prepend">$</InputGroup.Text>
                    <FloatingLabel
                        controlId="form-amount"
                        label={placeholder}
                    >
                        <Form.Control
                            as={CurrencyInput}
                            size="lg"
                            type="text"
                            decimalsLimit={2}
                            name="amount"
                            placeholder={placeholder}
                            value={form.amount}
                            onValueChange={(value, name) => setForm({ ...form, [name]: value })}
                        />
                    </FloatingLabel>
                    <Button type="submit" variant="primary" id="form-amount-prepend">
                        Add To Wallet
                    </Button>
                </InputGroup>
            </Col>
        </Form>
    )
}

export default ScrambleForm;
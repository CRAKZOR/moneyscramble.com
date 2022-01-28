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
        amount: '',
        float: 0,
    }

    // const randomDollar = Math.floor(Math.random() * 190 + 10);
    // const randomCents = Math.floor(Math.random() * 90 + 10);
    const placeholder = `Enter an amount`

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
                    <FloatingLabel
                        controlId="form-amount"
                        label={placeholder}
                    >
                        <Form.Control
                            autoFocus
                            disabled={loading}
                            as={CurrencyInput}
                            size="lg"
                            type="text"
                            decimalsLimit={2}
                            name="amount"
                            placeholder={placeholder}
                            value={form.amount}
                            onValueChange={(value, name, obj) => setForm({ ...form, [name]: value, float: obj.float })}
                            step={10}
                        />
                    </FloatingLabel>
                    <Button type="submit" variant="primary" id="form-amount-prepend" className="d-none d-sm-block" d-disabled={loading}>
                        Add To Wallet
                    </Button>
                    <Button type="submit" variant="primary" id="form-amount-prepend" className="d-sm-none" d-disabled={loading}>
                        Add
                    </Button>
                </InputGroup>
            </Col>
        </Form>
    )
}

export default ScrambleForm;
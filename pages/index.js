
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Wallet from '../components/wallet';
import ScrambleForm from '../components/forms/scrambleForm';

const formatter = require('../utils').formatter

const Home = (props) => {
  const { site } = props;

  const [ wallet, setWallet ] = useState([
    // {
    //   id: '',
    //   amount: ''
    // }
  ]);

  const [ loading, setLoading ] = useState(false);
  const scrambleMoney = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      alert("coming soon");
      setLoading(false);
    }
  }, [loading])

  const addMoney = (form) => {
    form.amount = formatter.format(form.amount);
    setWallet([...wallet, form]);
  };

  const removeMoney = (id) => {
    const cloneWallet = wallet.filter(x => x.id !== id);
    setWallet([...cloneWallet]);
  };



  return (
    <Container fluid>
      <Row className="justify-content-center text-center py-5 bg-light">
        <Col xs={12}>
          <h1 className="display-4 text-capitalize">
            <i className="bi bi-currency-exchange"></i> {site.name}
          </h1>
        </Col>
        <Col>
          <p>Randomize money distribution</p>
        </Col>
        <ScrambleForm 
          handleSubmit={addMoney}
          loading={loading}
        />
      </Row>
      <Row className="justify-content-center g-3 text-center">
        <Wallet
          wallet={wallet}
          formatter={formatter}
          handleDelete={removeMoney}
          handleScramble={scrambleMoney}
          loading={loading}
        />
      </Row>
    </Container>
  )
};

export default Home;


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
    //    id: '',
    //    amount: ''
    //    float: ''
    // }
  ]);

  const [ loading, setLoading ] = useState(false);

  const scrambleMoney = () => {

    const sortedWallet = [...wallet].sort((a,b) => {
      return a.float - b.float;
    });

    let average = 0
    sortedWallet.forEach(e => { average+= e.float })
    average=Math.floor(average/sortedWallet.length);

    const getRandomAmount = (amt) => {
      // let randomizedAmnt = 0;
      // let balancer = 2;
      // const threshold = amt*0.65;   // 50% of original amount 
      // console.log(threshold);
      // do {
      //   const randomDiff = Math.round( ( ( Math.random() * ( sortedWallet[0].float/sortedWallet.length ) ) + sortedWallet[sortedWallet.length-1].float/balancer)*100)/100;
      //   randomizedAmnt=Math.round((amt-randomDiff)*100)/100;
      //   balancer++;
      // } while (randomizedAmnt <= 0);

      const randomDiff = Math.round( ( ( Math.random() * ( sortedWallet[0].float/8 ) ) + sortedWallet[0].float/2)*100)/100;
      const randomizedAmnt=Math.round((amt-randomDiff)*100)/100;

      return randomizedAmnt;
    }

    let total = 0;
    let newTotal = 0;
    let newWallet = [];

    for (const [i, cash] of sortedWallet.entries()) {
      total+=cash.float;

      const newAmount = getRandomAmount(cash.float);
      newTotal+=newAmount;
      newWallet.push({
        ...cash,
        amount: formatter.format(newAmount),
        float: newAmount
      });

      if (i === (sortedWallet.length-1)) {
        const totalDiff = Math.round((total-newTotal)*100)/100;
        // const randomIndex = Math.floor(Math.random()*newWallet.length);
        newTotal+=totalDiff;
        newWallet.sort((a,b) => {
          return a.float - b.float;
        });
        const updatedAmount = Math.round((newWallet[0].float + totalDiff)*100)/100;
        newWallet[0]={
          ...newWallet[0],
          amount: formatter.format(updatedAmount),
          float: updatedAmount
        }

      }
      setWallet(newWallet);
      
    }

  };

  useEffect(() => {
    if (loading) {
      // scramble money
      scrambleMoney();
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

  const clearMoney = (id) => {
    setWallet([]);
  };



  return (
    <Container fluid>
      <Row className="justify-content-center text-center pt-5 pb-5 mb-3 bg-light">
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
        { wallet.length ? (
          <Wallet
            wallet={wallet}
            formatter={formatter}
            handleDelete={removeMoney}
            handleClear={clearMoney}
            handleScramble={() => setLoading(true)}
            loading={loading}
          />
        ) : (
          <Col className="p-3 p-lg-5" md={8}>
            <h1 className="display-6">Let's Start Scrambling</h1>
            <p className="mb-0">Begin by adding funds from the form above. Funds will appear in a wallet. Funds can be scrambled! Continue to scramble! Scramble some more!</p>
          </Col>
        )}
      </Row>
    </Container>
  )
};

export default Home;

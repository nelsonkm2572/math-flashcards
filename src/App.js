import React, {useEffect} from 'react';
import './App.css';
import {Card} from './Card';
import {useSelector, useDispatch} from 'react-redux';
import {loadCards, startAddingCard} from './actions';

function App() {
  const cards = useSelector(state => state.cards);
  const isWaiting = useSelector(state => state.isWaiting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCards());
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingCard(0, 0, '+'));
  }

  return (
    <div className="cards-root">
      <div className="welcome-header">
        <div className="welcome-header-title">
          <header>Welcome to Math Cards!</header>
          <div className="help-text">
            <p>To add a flashcard, click the card icon to the right.</p>
            <p>Click the gear icon to edit a flashcard edit.</p>
            <p>Use +, -, x, or / as operators and a max of 3 digits per number.</p>
          </div>
        </div>
        <span className="welcome-header-maker" onClick={onAdd}><img className="welcome-header-maker-img" src="/newCard.png" alt="New Card"></img></span>
        {isWaiting && <div className="loading"></div>}
      </div>
      {cards.map(card => <Card key={card.id} card={card} />)}
    </div>
  );
}

export default App;
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, enterFlipMode, leaveEditMode, leaveFlipMode, startSavingCard, startDeletingCard} from './actions';

export function Card(props) {
    const card = props.card;
    const dispatch = useDispatch();
    const [firstNumber, setFirstNumber] = useState(card.firstNumber);
    const [secondNumber, setSecondNumber] = useState(card.secondNumber);
    const [operator, setOperator] = useState(card.operator);
    const [answer] = useState(card.answer);
    const [color] = useState(card.color);

    const onEdit = () => {
        dispatch(enterEditMode(card));
    };

    const onFlip = () => {
        dispatch(enterFlipMode(card));
    };

    const onCancelFlip = () => {
        dispatch(leaveFlipMode(card));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(card));
    };

    const onSave = () => {
        if(firstNumber > -1000 && firstNumber < 1000 && secondNumber > -1000 && secondNumber < 1000 && (operator === '+' || operator === '-' || operator === 'x' || operator === '/')) {
            dispatch(startSavingCard({
                id: card.id,
                firstNumber,
                secondNumber,
                operator,
                answer,
                color,
            }));
        }
    };

    const onDelete = () => {
        dispatch(startDeletingCard(card));
    };

    if(card.isEditing) {
        return (
            <div className="card" style={{backgroundColor: card.color}}>
                <input type="number" className="card-front-numbers-edit" value={firstNumber} onChange={e =>
                    setFirstNumber(e.target.value)} style={{backgroundColor: card.color}}/>
                <input type="text" className="card-front-operator-edit" value={operator} onChange={e =>
                    setOperator(e.target.value)} placeholder="+,-,x,/" style={{backgroundColor: card.color}} maxLength="1"/>
                <input type="number" className="card-front-numbers-edit" value={secondNumber} onChange={e =>
                    setSecondNumber(e.target.value)} style={{backgroundColor: card.color}}/>
                <div className="card-edit-buttons">
                    <span onClick={onSave} className="card-edit-buttons-save"><img className="card-edit-buttons-save-img" src="/save.png" alt="Save Flashcard"></img></span>
                    <span onClick={onCancel} className="card-edit-buttons-cancel"><img className="card-edit-buttons-cancel-img" src="/cancel.png" alt="Cancel Editing Flashcard"></img></span>
                    <span onClick={onDelete} className="card-edit-buttons-delete"><img className="card-edit-buttons-delete" src="/delete.png" alt="Delete Flashcard"></img></span>
                </div>
            </div>
        ); 
    } else {
        if(card.isFlipped) {
            return (
                <div className="card" style={{backgroundColor: card.color}}>
                    <span>{card.answer.toFixed(2)}</span>
                    <span className="card-front-flip" onClick={onCancelFlip}><img className="card-front-flip-img" src="/arrow.png" alt="Flip the Card"></img></span>
                </div>
            );
        } else
        return (
            <div className="card" style={{backgroundColor: card.color}}>
                <span className="card-front-numbers">{card.firstNumber}</span>
                <span className="card-front-operator">{card.operator}</span>
                <span className="card-front-numbers">{card.secondNumber}</span>
                <span className="card-front-edit" onClick={onEdit}><img className="card-front-edit-img" src="/gear.png" alt="Edit the Card"></img></span>
                <span className="card-front-flip" onClick={onFlip}><img className="card-front-flip-img" src="/arrow.png" alt="Flip the Card"></img></span>
            </div>
        ); 
    }
}
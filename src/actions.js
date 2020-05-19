export const Action = Object.freeze({
    LoadCard: 'LoadCard',
    FinishAddingCard: 'FinishAddingCard',
    FinishSavingCard: 'FinishSavingCard',
    FinishDeletingCard: 'FinishDeletingCard',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    EnterFlipMode: 'EnterFlipMode',
    LeaveFlipMode: 'LeaveFlipMode',
    StartWaiting: 'StartWaiting',
});

export function startWaiting() {
    return {
        type: Action.StartWaiting,
    }
}

export function loadCard(cards) {
    cards.forEach(card => {
        if(card.operator === '+') {
            card.color = '#FF7F27';
        } else if(card.operator === '-') {
            card.color = '#00A2E8';
        } else if(card.operator === 'x') {
            card.color = '#ED1C24';
        } else if(card.operator === '/') {
            card.color = '#22B14C';
        }
    });
    
    return {
        type: Action.LoadCard,
        payload: cards,
    };
}

export function finishAddingCard(card) {
    return {
        type: Action.FinishAddingCard,
        payload: card,
    };
}

export function finishSavingCard(card) {
    return {
        type: Action.FinishSavingCard,
        payload: card,
    };
}

export function finishDeletingCard(card) {
    return {
        type: Action.FinishDeletingCard,
        payload: card,
    };
}

export function enterEditMode(card) {
    return {
        type: Action.EnterEditMode,
        payload: card,
    };
}

export function enterFlipMode(card) {
    return {
        type: Action.EnterFlipMode,
        payload: card,
    };
}

export function leaveEditMode(card) {
    return {
        type: Action.LeaveEditMode,
        payload: card,
    };
}

export function leaveFlipMode(card) {
    return {
        type: Action.LeaveFlipMode,
        payload: card,
    };
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}
const host = 'https://math-card-service.duckdns.org:8442';

export function loadCards() {
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/cards`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(loadCard(data.cards));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startAddingCard(firstNumber, secondNumber, operator) {
    let answer = 0;    
    const card = {firstNumber, secondNumber, operator, answer};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    };
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/card`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                   card.id = data.id;
                   dispatch(finishAddingCard(card));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startSavingCard(card) {
    if(card.operator === '+') {
        card.answer = parseFloat(card.firstNumber) + parseFloat(card.secondNumber);
        card.color = '#FF7F27';
    } else if(card.operator === '-') {
        card.answer = parseFloat(card.firstNumber) - parseFloat(card.secondNumber);
        card.color = '#00A2E8';
    } else if(card.operator === 'x') {
        card.answer = parseFloat(card.firstNumber) * parseFloat(card.secondNumber);
        card.color = '#ED1C24';
    } else if(card.operator === '/') {
        card.answer = parseFloat(card.firstNumber) / parseFloat(card.secondNumber);
        card.color = '#22B14C';
    }
    
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    };
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/cards/${card.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(finishSavingCard(card));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startDeletingCard(card) {
    const options = {
        method: 'DELETE',
    };
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/cards/${card.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                   dispatch(finishDeletingCard(card));
                }
            })
            .catch(e => console.error(e));
    };
}
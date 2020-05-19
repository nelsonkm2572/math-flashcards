import {Action} from "./actions";

const initialState = {
    isWaiting: false,
    isFlipped: false,
    cards: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.LoadCard:
            return {
                ...state,
                isWaiting: false,
                cards: action.payload,
            };
        case Action.FinishAddingCard:
            return {
                ...state,
                isWaiting: false,
                cards: [{...action.payload, isEditing: true}, ...state.cards],
            };
        case Action.EnterEditMode:
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        return {...card, isEditing: true};
                    } else {
                        return card;
                    }
                }),
            };
        case Action.EnterFlipMode:
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        return {...card, isFlipped: true};
                    } else {
                        return card;
                    }
                }),
            };
        case Action.LeaveEditMode:
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        return {...card, isEditing: undefined};
                    } else {
                        return card;
                    }
                }),
            };
        case Action.LeaveFlipMode:
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        return {...card, isFlipped: undefined};
                    } else {
                        return card;
                    }
                }),
            };
        case Action.FinishSavingCard:
            return {
                ...state,
                isWaiting: false,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return card;
                    }
                }),
            };
        case Action.FinishDeletingCard:
            return {
                ...state,
                isWaiting: false,
                cards: state.cards.filter(card => card.id !== action.payload.id),
            };
        case Action.StartWaiting:
            return {
                ...state,
                isWaiting: true,
            }
        default:
            return state;
    }
}

export default reducer;
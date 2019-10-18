import React from 'react';

export const CTX = React.createContext();

/* 
    {
        from: 'user'
        msg: 'hi'
        topic: 'general'
    }

    state {
        topic1: [
            {msg}, {msg}, {msg}
        ]
        topic2: [

        ]
    }

*/

const initState = {
    general: [
        {from: 'Robin', msg: 'Okurt'},
        {from: 'Francy', msg: 'Finna Gonna Wanna..'},
        {from: 'Nova', msg: 'Shut the fuck up'},
    ],
    topic2: [
        {from: 'Juice', msg: 'Alms..'},
        {from: 'Chris', msg: 'UH!...'},
        {from: 'Caleb', msg: 'Fuck did I do'},
    ]
}

function reducer(state, action) {
    const{from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [action.payload.topic]: [
                    ...state[action.payload.topic],
                    {from, msg}
                ]
            }
        default:
            return state
    }
}

export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState)

    return(
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )

}
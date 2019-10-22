import React from 'react';
import io from 'socket.io-client';

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
        { from: 'Robin', msg: 'Okurt' },
        { from: 'Francy', msg: 'Finna Gonna Wanna..' },
        { from: 'Nova', msg: 'Shut the fuck up' },
    ],
    topic2: [
        { from: 'Juice', msg: 'Alms..' },
        { from: 'Chris', msg: 'UH!...' },
        { from: 'Caleb', msg: 'Fuck did I do' },
    ]
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
        socket.emit('chat message', value);
}

export default function Store(props) {

    if (!socket) {
        socket = io(':3001')
    }

    const user = 'Caleb' + Math.random(100).toFixed(2)

    const [allChats] = React.useReducer(reducer, initState)

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )

}
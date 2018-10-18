// import { Action } from './types'

// export function signalRInvokeMiddleware(store: any) {
//     return (next: any) => async (action: any) => {
//         switch (action.type) {
//             case "SEND_COUNTER_UPDATE":
//                 connection.invoke('SendCounterUpdate');
//                 break;
//             case "SIGNALR_DECREMENT_COUNT":
//                 connection.invoke('DecrementCounter');
//                 break;
//         }

//         return next(action);
//     }
// }

// export function signalRRegisterCommands(store: any, callback: Function) {

//     connection.on('SendCounterUpdate', data => {
//         store.dispatch({ type: 'SEND_COUNTER_UPDATE' })
//         console.log("Count has been incremented");
//     })

//     connection.on('DecrementCounter', data => {
//         store.dispatch({ type: 'DECREMENT_COUNT' })
//         console.log("Count has been decremented");
//     })

//     connection.start().then(callback());

// }
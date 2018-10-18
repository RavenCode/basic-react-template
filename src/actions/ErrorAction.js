// import { Action } from './types'

// export const GET_ERROR = 'GET_ERROR'
// export const SET_ERROR = 'SET_ERROR'

// export function getAllErrors( instanceID, typeID, aggregateID ) {
//     let instanceData = {}
//     let instances = []

//     await fetch(('https://gocfire-alpha.appspot.com/api/Errors/' + instanceID + '/' + typeID + '/' + aggregateID), {
//         method: 'GET'
//     })
//         .then((response) => response.json())
//         .then((responseJson) => {

//             for (var i = 0; i < responseJson.length; i++) {
//                     instanceData = {
//                         instanceId: responseJson[i].instanceId,
//                         typeId: responseJson[i].typeId, // this will be used for multi select
//                         errorType: responseJson[i].errorType, // this will be used for multi select
//                         errorMessage: responseJson[i].errorMessage,
//                         stackTrace: responseJson[i].stackTrace,
//                         aggregationValue1: responseJson[i].aggregateGroup1Name,
//                         aggregationValue2: responseJson[i].aggregateGroup2Name,
//                         belongsToAggregations: responseJson[i].belongsToAggregations,
//                     }
//                 console.log(instanceData)

//                     instances.push(instanceData)
//             }

//         }).catch((error) => {
//             console.log(error)
//         })

//     return instanceData
// }
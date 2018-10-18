import { Action } from './types'

export const GET_AGGREGATE = 'GET_AGGREGATE'
export const SET_AGGREGATE = 'SET_AGGREGATE'

let counter = 0;

/**
 * @return {*} aggregateData
 * @param {*} instanceID
 */
export async function getAggregateInformation( instanceID, environmentType, aggregationLevel ) {
    let aggregateData = {}
    let aggregates = []

    await fetch(('https://gocfire-alpha.appspot.com/api/Aggregation/' + instanceID + '/' + environmentType +'/' + aggregationLevel), {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJson) => {

            // aggregateData = {
            //     aggID: responseJson.id,
            //     // friendlyName: responseJson.friendlyName,
            //     // errorType: '0', // DEV, LOCAL, STG, PROD
            //     // stackTrace: responseJson.stacktrace,
            //     // timestamp: responseJson.timestamp,
            //     aggValue: responseJson.aggregationLevel, // this will be used for multi select
            //     aggValueId: responseJson.aggregationValueIdentifier, // this will be used for multi select
            //     errorMessage: responseJson.aggregationPreview,
            //     count: responseJson.errorCount,
            //     pinned: responseJson.pinned,
            //     // tags: responseJson.tags,
            // }

            for (var i = 0; i < responseJson.length; i++) 
            {
                aggregateData = {
                    aggID: responseJson[i].id,
                    aggValue: responseJson[i].aggregationLevel, // this will be used for multi select
                    aggValueId: responseJson[i].aggregationValueIdentifier, // this will be used for multi select
                    errorMessage: responseJson[i].aggregationPreview,
                    count: responseJson[i].errorCount,
                    pinned: responseJson[i].pinned,
                }

                aggregates.push(createData(aggregateData.aggID, aggregateData.aggValue, aggregateData.aggValueId, aggregateData.errorMessage, aggregateData.count, aggregateData.pinned))
            }
            
        }).catch((error) => {
            console.log(error)
        })

    return aggregates
}

function createData(aggId, aggValue, aggValueId, errorMessage, count, pinned) {
    counter += 1;
    return { id: aggId, aggValue, aggValueId, errorMessage, count, pinned };
}

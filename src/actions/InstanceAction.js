import { Action } from './types'

export const GET_INSTANCE = 'GET_INSTANCE'
export const SET_INSTANCE = 'SET_INSTANCE'

let counter = 0;

/**
 * @return {*} instanceData
 * @param {*} instanceID
 */
export async function getInstanceInformation( instanceID) {
    let instanceData = {}
    let instances = []

    await fetch(('https://gocfire-alpha.appspot.com/api/Instance'), {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJson) => {

            for (var i = 0; i < responseJson.length; i++) {
                if (responseJson[i].id = instanceID)
                {
                    instanceData = {
                        id: responseJson[i].id,
                        name: responseJson[i].name, // this will be used for multi select
                        owner: responseJson[i].owner, // this will be used for multi select
                        email: responseJson[i].email,
                        aggregateGroup1Name: responseJson[i].aggregateGroup1Name,
                        aggregateGroup2Name: responseJson[i].aggregateGroup2Name,
                    }
                }
            }

        }).catch((error) => {
            console.log(error)
        })

    return instanceData
}

import * as API from '../utils/integrations'
import * as ActionsTypes from './types'
import predict from '../utils/math'

export const predictFromFrontend = (interactions,peopleCount,attendance,drinkMin,drinkMax) => {
    return (dispatch) => {
        dispatch({
            type: ActionsTypes.PREDICT,
            prediction: predict(interactions,peopleCount,attendance/100,drinkMin,drinkMax)
        })
    }
}

export const predictFromBackend = (interactions,peopleCount,attendance,drinkMin,drinkMax) => {
    return (dispatch) => {
        API.predict(interactions,peopleCount,attendance,drinkMin,drinkMax).then(response => {
            dispatch({
                type: ActionsTypes.PREDICT,
                prediction: JSON.parse(response.replace(/'/g,"\""))
            })
        })
    }
}
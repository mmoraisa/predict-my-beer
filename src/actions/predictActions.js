import * as API from '../utils/integrations'
import * as ActionsTypes from './types'

export const predict = (interactions,peopleCount,attendance,drinkMin,drinkMax) => {
    return (dispatch) => {
        API.predict(interactions,peopleCount,attendance,drinkMin,drinkMax).then(response => {
            dispatch({
                type: ActionsTypes.PREDICT,
                prediction: JSON.parse(response.replace(/'/g,"\""))
            })
        })
    }
}
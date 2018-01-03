import * as ActionsTypes from '../actions/types'

function predictReducer(state = [], action){
    const { prediction, type } = action

    switch(type){
        case ActionsTypes.PREDICT:
            return prediction
        default:
            return state
    }
}

export default predictReducer
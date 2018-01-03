import * as ActionsTypes from '../actions/types'

function predictReducer(state = [], action){
    const { prediction, type } = action

    switch(type){
        case ActionsTypes.PREDICT:
            return eval(prediction)
        default:
            return state
    }
}

export default predictReducer
// Import action types


// Defining Initial State
const initialState={
    name:"Hershal"
}

export default function(state= initialState,action){
    const {type,payload}=action
    switch(type){
        default:
            return state
    }
}
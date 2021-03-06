import {combineReducers} from 'redux';
import {ADD_UNIT_GROW_BED, ADD_VEGET_GROW_BED, DEL_UNIT_GROW_BED, DEL_VEGET_GROW_BED,ADD_GROW_BED, DEL_GROW_BED, SET_IS_USER_AUTHENTICATED, SET_USER_INFO, FLUSH_OUT_STATE_DATA, SET_INITIAL_STATE} from '../Actions/research.actions.js';

const initialState = {
    units : [],
    numUnit : 0,
    user : {
        isUserAuthenticated : false,
        info : {}
    },
    appData : {
    
    }
}

var clone = (obj) => {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function ResearchReducers(state = initialState, action) {
    
    switch (action.type) {
        case SET_INITIAL_STATE : {
            let newState = clone(action.state);
            return newState; 
        }
        case ADD_UNIT_GROW_BED : {
            let newPayload = clone(action.payload);
            newPayload.pos.unit = state.numUnit;
            // Khoi tao 4 Bed trong Units, dong bo thong so status
            // voi Unit
            let i;
            
            let newState = clone(state);
            newState.units.push(newPayload);
            newState.numUnit = state.numUnit + 1;
            console.log(newState); 
            return newState;
        }
        case DEL_UNIT_GROW_BED : { 
            let newState = clone(state);
            newState.units.splice(action.pos.unit, 1);
            newState.numUnit = newState.units.length;
            let i;
            for(i = action.pos.unit; i < newState.numUnit; i++) {
                newState.units[i].pos.unit--;
            }
            console.log(newState);
            // Defer Process Index Element
            return newState;
        }

        case ADD_GROW_BED : {
            let newState = clone(state);
            let newPayload = clone(action.payload);
            newPayload.pos.bed = newState.units[newPayload.pos.unit].numBed++;
            newState.units[newPayload.pos.unit].numBed++;
            newState.units[newPayload.pos.unit].beds.push(newPayload);
            return newState;
        }

        case DEL_GROW_BED : {
            let newState = clone(state);
            let unit = newState.units[action.pos.unit];
            unit.beds.splice(action.pos.bed, 1);
            unit.numBed--;
            let  newNumbed = newState.units[action.pos.unit].numBed;
            for(let i = action.pos.bed; i < newNumbed; i++) {
                unit.beds[i].pos.bed--; 
            }

            return newState;
        }
        case ADD_VEGET_GROW_BED : {
            let newState = clone(state); 
            let newPayload = clone(action.payload); 
            newPayload.pos.veget = newState.units[newPayload.pos.unit].beds[newPayload.pos.bed].numVeget;
            console.log(action.payload);
            newState.units[newPayload.pos.unit].beds[newPayload.pos.bed].numVeget++;
            newState.units[newPayload.pos.unit].beds[newPayload.pos.bed].vegets.push(newPayload);
            return newState;
        }
        case DEL_VEGET_GROW_BED : {
            let newState = clone(state); 
            let vegets = newState.units[action.pos.unit].beds[action.pos.bed].vegets;
            newState.units[action.pos.unit].beds[action.pos.bed].numVeget--;
            vegets.splice(action.pos.veget, 1);
            
            let i;
            for (i = action.pos.bed  ; i < newState.units[paction.pos.unit].beds[action.pos.bed].numVeget ; i++) {
                vegets[i].pos.veget--;
            }
            // Defer Process Index Element
            return newState;
        }
        
        case SET_IS_USER_AUTHENTICATED : {
            let newState = clone(state);
            newState.user.isUserAuthenticated = action.value;
            return newState;
        }
        case SET_USER_INFO : {
            let newState = clone(state);
            newState.user.info = clone(action.payload);
            return newState;
        } 
        case FLUSH_OUT_STATE_DATA : {
            let newState = clone(state);
            newState.numUnit = 0;
            newState.units = [];
            return newState;
        }
        default : 
            return state;
                
    }
}

 
export default ResearchReducers;

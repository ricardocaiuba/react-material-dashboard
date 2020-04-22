import { combineReducers } from 'redux';

import { tarefaReducer } from './tarefasReducer';
import { mensagenReducer } from './mensagensReducer';

const mainReducer = combineReducers({
  tarefas: tarefaReducer,
  messages: mensagenReducer
});

export default mainReducer;

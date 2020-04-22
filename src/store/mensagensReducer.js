const INITIAL_STATE = {
  message: '',
  showMessage: false
};

export const ACTIONS = {
  SHOW_MESSAGE: 'MESSAGE_SHOW',
  HIDDEN_MESSAGE: 'MESSAGE_HIDDEN'
};

export function mensagenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.SHOW_MESSAGE:
      return { ...state, message: action.message, showMessage: true };

    case ACTIONS.HIDDEN_MESSAGE:
      return { ...state, message: '', showMessage: false };

    default:
      return state;
  }
}

export function mostrarMensagem(msg) {
  return {
    type: ACTIONS.SHOW_MESSAGE,
    message: msg
  };
}

export function esconderMensagem() {
  return {
    type: ACTIONS.HIDDEN_MESSAGE
  };
}

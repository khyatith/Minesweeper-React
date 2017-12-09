import Store from './Store';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MinesweeperConstants from '../constants/MinesweeperConstants';

let _state;

const resetState = () => {
	_state = {
		level: null
	};
};

resetState();

const _setLevel = (level) => {
	_state.level = level;
    switch(level) {
        case '1':
            _state.mineCount = 10;
            _state.rowCount = 9;
            _state.colCount = 9;
            break;
        case '2':
            _state.mineCount = 40;
            _state.rowCount = 16;
            _state.colCount = 16;
            break;
        case '3':
            _state.mineCount = 100;
            _state.rowCount = 16;
            _state.colCount = 30;
            break;
    }
}

class MinesweeperStore extends Store {
    getState() {
        return _state;
    }
    resetState() {
        return resetState();
    }
}

let mineSweeperInstance = new MinesweeperStore();

mineSweeperInstance.dispatchToken = AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MinesweeperConstants.SET_LEVEL:
            _setLevel(action.level);
            break;
        case MinesweeperConstants.RESET_STATE:
            resetState();
            break;
    }
    mineSweeperInstance.emitChange();   
});

export default mineSweeperInstance;

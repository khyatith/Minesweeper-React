import MinesweeperConstants from '../constants/MinesweeperConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const MinesweeperActions = {
    setLevel(level) {
        AppDispatcher.dispatch({
            actionType: MinesweeperConstants.SET_LEVEL,
            level
        });
    },
    resetState() {
        AppDispatcher.dispatch({
            actionType: MinesweeperConstants.RESET_STATE
        });
    }
};

export default MinesweeperActions;
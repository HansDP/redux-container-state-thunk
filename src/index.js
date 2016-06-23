
export default ({ dispatch, getState, globalDispatch, getGlobalState }) => (next) => (action) => {

    if (typeof action === 'function') {
        return action(dispatch, getState, globalDispatch, getGlobalState)
    }

    return next(action)
}
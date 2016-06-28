
export default ({ localDispatch, getLocalState, globalDispatch, getGlobalState }) => (next) => (action) => {

    if (typeof action === 'function') {
        return action(localDispatch, getLocalState, globalDispatch, getGlobalState)
    }

    return next(action)
}
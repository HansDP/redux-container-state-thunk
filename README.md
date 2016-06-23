# [redux-container-state-thunk](https://github.com/HansDP/redux-container-state-thunk)

**Note:** Work in progress. This project is not ready to be used

Provides local thunk middleware for containers in [redux-container-state](https://github.com/HansDP/redux-container-state)

The idea behind thunk middleware is based upon the great work of [redux-thunk](https://github.com/gaearon/redux-thunk).

## Example usage

```javascript
import React from 'react'
import { view } from 'redux-container-state'
import localThunk from 'redux-container-state-thunk'


const increment = () => {
  return {
    type: 'INCREMENT_COUNTER'
  }
}

const incrementAsync = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000)
  }
}

const counterUpdater = updater((state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER': 
      return state + 1
    default:
      return state
  }
})

export default view(localThunk)(({model, dispatch}) => (
  <div>
    <button onClick={ () => dispatch(incrementAsync()) }>Start counter</button>
    Current count: { model }
  </div>
))

```

The 'INCREMENT_COUNTER' action will be dispatched within the scope of the view


### Getting a hold of the global dispatcher instead of the local dispatcher

**Note:** This has not been validated yet (but it should work like this)

If you need to get both a local and global dispatch methods, you should add `redux-thunk` to your store middleware.

```javascript

    const storeFactory = compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)

    const store = storeFactory(rootReducer)
    ....
```

In your local action creators, you now can chain local thunk with the global thunk (redux-thunk)

```javascript
    const localActionCreator = () => (localDispatch, localGetState) => (globalDispatch, globalGetState) => {
      localDispatch({ type: 'LOCAL_INCREMENT' })
      globalDispatch({ type: 'GLOBAL_INCREMENT' })
    }
```


## Installation & Usage

You can install `redux-container-state-thunk` via npm.

```
npm install redux-container-state-thunk --save
```
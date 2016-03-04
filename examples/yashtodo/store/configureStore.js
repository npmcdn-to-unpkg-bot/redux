import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

function configureStore(initialState) {
    const logger = createLogger({level: 'log'})
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, logger)
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

const store = configureStore()

export default store
import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
const PersistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(PersistConfig, rootReducer)
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, logger))
export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)

import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import lottoReducer from './reducers/lotto';
import listReducer from './reducers/list';
import configReducer from './reducers/config';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['lotto', 'list']
}

const listPersistConfig = {
    key: 'list',
    storage: AsyncStorage,
    blacklist: ['show', 'error']
}

const rootReducer = combineReducers({
    lotto: lottoReducer,
    config: configReducer,
    list: persistReducer(listPersistConfig, listReducer)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
export const persistor = persistStore(store);

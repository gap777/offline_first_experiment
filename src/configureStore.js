import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware } from 'redux'
import {simpleReducer} from './reducers'
import PouchDB from 'pouchdb'
import PouchSync from 'pouch-websocket-sync'

// const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
// const clientEvents = ['connect', 'disconnect', 'reconnect'];

// const initialState = {
//     todos: [],
//     syncState: {
//         text: 'unknown'
//     }
// }

export default function configureStore() {

    const db = new PouchDB('entries');

    const syncClient = PouchSync.createClient()

    const sync = syncClient
        .connect('ws://localhost:3001')
        .on('error', function(err) { console.log(err);})
        .sync(db, {remoteName: 'entries-server'})

    // syncEvents.forEach(function(event) {
    //     sync.on(event, function() {
    //         store.dispatch({type: types.SET_SYNC_STATE, text: event});
    //     })
    // })
    //
    // clientEvents.forEach(function(event) {
    //     syncClient.on(event, function() {
    //         store.dispatch({type: types.SET_SYNC_STATE, text: event});
    //     })
    // })

    let store;
    const pouchMiddleware = PouchMiddleware({
        path: '/entries',
        db,
        actions: {
            remove: doc => store.dispatch({type: 'DELETE_ENTRY', id: doc._id}),
            insert: doc => store.dispatch({type: 'ADD_ENTRY', text: doc}),
            update: doc => store.dispatch({type: 'UPDATE_ENTRY', text: doc}),
        }
    })

    var initialState = [];
    store = createStore(
        simpleReducer,
        initialState,
        applyMiddleware(pouchMiddleware)
    )

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextReducer = require('../reducers')
    //         store.replaceReducer(nextReducer)
    //     })
    // }

    return store
}

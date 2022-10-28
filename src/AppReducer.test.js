// import { reduce, initialState, ACTION } from './App';

// describe('App Reducer Tests', () => {
//   it('Adds to count state', () => {
//     let state = reduce(initialState.count, 0);

//     expect(state.count).toEqual(0);

//     state = reduce(state, {type: 'COUNT', payload: 100});
//     expect(state.count).toEqual(100);
//   });

//   it('updates RequestBody with an object', () => {
//     let state = reduce(initialState.requestParam, {});

//     expect(state).toBeTruthy();

//     state = reduce(state, {type: ACTION.REQUEST_PARAMS, payload: {test: 'hello!'}});
//     expect(Object.keys(state)).toEqual('test');
//     expect(state.test).toEqual('hello!');
//   });

//   it('Updates Response data with an object', () => {
//     let state = reduce(initialState.response_data, {});

//     expect(state).toBeTruthy();

//     state = reduce(state, {type: ACTION.RESPONSE_DATA, payload: {test: 'hello!'}});
//     expect(Object.keys(state)).toEqual('test');
//     expect(state.test).toEqual('hello!');
//   });

//   it('It adds to state history array', () => {
//     let state = reduce(initialState.history, []);

//     expect(state).not.toBeTruthy();
//     expect(state.length).toEqual(0);

//     state = reduce(state, {type: ACTION.SET_HISTORY, payload: [...state, 'fnjagnrjwoa;']});
//     expect(state[0]).toEqual('fnjagnrjwoa;');
//     expect(state.length).toEqual(1);
//   });
// })
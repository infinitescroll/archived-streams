# Streams

## Local dev setup

```bash
npm install
npm run dev
```

## Notes

In the first example we are going to display a digital clock that updates every second. The first render is happening in the server and then the browser will take over. To illustrate this, the server rendered clock will have a different background color (black) than the client one (grey).

The Redux `Provider` is implemented in `pages/_app.js`. Since the `MyApp` component is wrapped in `withReduxStore` the redux store will be automatically initialized and provided to `MyApp`, which in turn passes it off to `react-redux`'s `Provider` component.

`index.js` have access to the redux store using `connect` from `react-redux`.
`counter.js` and `examples.js` have access to the redux store using `useSelector` and `useDispatch` from `react-redux@^7.1.0`

On the server side every request initializes a new store, because otherwise different user data can be mixed up. On the client side the same store is used, even between page changes.

The example under `components/counter.js`, shows a simple incremental counter implementing a common Redux pattern. Again, the first render is happening in the server and instead of starting the count at 0, it will dispatch an action in redux that starts the count at 1. This continues to highlight how each navigation triggers a server render first and then a client render when switching pages on the client side

For simplicity and readability, Reducers, Actions, and Store creators are all in the same file: `store.js`

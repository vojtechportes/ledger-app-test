# ledger-app-test

Deployed here: https://expo.io/@vojtechportes/ledger-app-test

Few notes

1) There are few ETH address in store by default, so you don't need to search for them and also so you see how it looks like in history list, without adding them... if it is production version and not technical assignment, I would remove them, of course
2) I didn't try the app on iOS, because I don't have any Apple device, but I hope it will work
3) I used TypeScript, yet in some cases, espetially in case of react-native and styled-components, the types are kind of "any". If I have more time, I would do it properly (I would actually go deeeper into type definitions, play with it etc.)...
4) For address history, I used redux, I would probably do the same for asset conversions, if I know all their names in fist place. Also, I would rather fetch certain ammount of transactions (so I can do pagination properly) and total balance from two different endpoints if there is such options. This way, I am fetching huge ammounts of data I really don't need...

import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Routine.js').Routine[]} */
  routines: [],
  /** @type {import('./models/Move.js').Move[]} */
  moves: [],
  /** @type {import('./models/ListEntry.js').ListEntry[]} */
  listEntries: [], 
  /** @type {import('./models/Move.js').Move | null} */
  activeMove: null,
  /** @type {import('./models/Routine.js').Routine | null} */
  activeRoutine: null,
  /** @type {import('./models/Move.js').Move[]} */
  myFavoriteMoves: [],
   /** @type {import('./models/Routine.js').Routine[]} */
  myFavoriteRoutines: []
 
})

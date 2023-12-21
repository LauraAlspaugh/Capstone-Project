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
  /** @type {import('./models/Routine.js').Routine | null} */
  selectedRoutine: null,
  /** @type {import('./models/Move.js').Move[]} */
  myFavoriteMoves: [],
  /** @type {import('./models/Routine.js').Routine[]} */
  myFavoriteRoutines: [],
  /** @type {import('./models/Routine.js').Routine[]} */
  myRoutines: [],
  noFavRoutines: false,
  editRoutine: false,

  settings: {},

  finishedMove: false,
  routineIsFinishedPlaying: false,
  selectedPic: null,
  transitionSounds: [
    { name: 'Ascend', audio: new Audio('/sounds/gamepack1-main-horrible-finish_By_adamgoik.wav') },
    { name: 'Chimes', audio: new Audio('/sounds/meinl-ch27-chimes_By_dpoggioli.wav') },
    { name: 'Ding', audio: new Audio('/sounds/chimes-14_By_bliind.wav') },
    { name: 'Gong', audio: new Audio('/sounds/gong_bymondfisch89_By_yudena.ogg') },
    { name: 'Marimba', audio: new Audio('/sounds/g2_By_joesh2.wav') },
    { name: 'Singing Bowl', audio: new Audio('/sounds/singing-bowl-gong_By_zambolino.wav') },
    { name: 'Solfeggio Wind Chimes', audio: new Audio('/sounds/solfeggio-wind-chimes-mi-528-hz-single-cut_By_the_very_real_horst__.wav') }
  ],
  activeTransitionSound: { name: 'Ding', audio: new Audio('//sounds/chimes-14_By_bliind.wav') },

})

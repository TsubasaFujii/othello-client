import {atom} from 'recoil';

export const gameState = atom({
  key: 'gameState',
  default: {
    board: [],
    isPlaying: false,
    isPlayerTurn: null,
    available: [],
    isPending: false,
    code: null,
    result: null,
  },
});
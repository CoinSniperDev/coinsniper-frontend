// Used when debugging game, limits coins to 10
export const DEBUG_MODE = 1;

export const TIMER_DURATION = 3; // question time in seconds

export enum GamePhase {
  Start = 'start',
  Quiz = 'quiz',
  GameOver = 'gameover',
}

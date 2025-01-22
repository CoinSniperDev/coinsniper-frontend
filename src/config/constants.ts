// Used when debugging game, limits coins to 10
export const DEBUG_MODE = 1;

// Gameplay related consts
export const TIMER_DURATION = 3; // question time in seconds

export enum GamePhase {
  Start = 'start',
  Quiz = 'quiz',
  GameOver = 'gameover',
}

// Storage variables
export const SESSION_REPLAY_COUNT = 'session_replay_count';

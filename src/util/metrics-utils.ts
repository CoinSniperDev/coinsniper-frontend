import ReactGA from 'react-ga4';

// Util class to manage Google Analytics metrics
export enum GAEventCategory {
  GAME = 'game',
  LINK = 'external_link',
}

// Define actions as a TypeScript type for better intellisense
export type GAEventAction =
  | 'start_game'
  | 'game_over_timer_expired'
  | 'game_over_wrong_answer'
  | 'play_again'
  | 'click_coingecko';

// Utility function to log events
export const logGAEvent = (category: GAEventCategory, action: GAEventAction, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    value,
    label,
  });
};

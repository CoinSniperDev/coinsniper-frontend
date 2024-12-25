/**
 * Represents a single coin object.
 */
export interface Coin {
  name: string;
  symbol: string;
  imageUrl: string; // Relative path to an image in public/coins
}

export const coinsList: Coin[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    imageUrl: '/coins/btc.png',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    imageUrl: '/coins/eth.png',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    imageUrl: '/coins/bnb.png',
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    imageUrl: '/coins/doge.png',
  },
  {
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    imageUrl: '/coins/steth.png',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    imageUrl: '/coins/sol.png',
  },
  {
    name: 'Ripple',
    symbol: 'XRP',
    imageUrl: '/coins/xrp.png',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    imageUrl: '/coins/usdt.png',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    imageUrl: '/coins/usdc.png',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    imageUrl: '/coins/ada.png',
  },
];

import { Share, Stock } from './interfaces';

export const mockShares: Share[] = [
   {
      id: 0,
      name: 'Apple'
   },
   {
      id: 1,
      name: 'Google'
   },
   {
      id: 2,
      name: 'Amazon'
   },
   {
      id: 3,
      name: 'Coca Cola'
   }
];

export const mockStocks: Stock[] = [
   {
      enterPrice: 222,
      exitPrice: 333,
      id: '1676403986217',
      shares: 5,
      enterDate: 1676412000000,
      exitDate: 1677448800000
   },
   {
      enterPrice: 3333,
      exitPrice: 4444,
      id: '1676403997914',
      shares: 2,
      enterDate: 1676584800000,
      exitDate: 1677189600000
   }
];

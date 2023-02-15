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
      enterPrice: 6666, exitPrice: 111, id: '1676403986217', shareId: 0, enterDate: 1676412000000, exitDate: 1677448800000
   },
   {
      enterPrice: 3333, exitPrice: 222, id: '1676403997914', shareId: 2, enterDate: 1676584800000, exitDate: 1677189600000
   }
];

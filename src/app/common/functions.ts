export function calculatePnL(enterPrice: number, exitPrice: number, quantity: number): number {
   return (exitPrice - enterPrice) * quantity;
}

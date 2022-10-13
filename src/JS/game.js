export function getPlayerColor(order, id) {
    const number = order.findIndex(player => player.id === id) + 1;
    const color = number === 1 ? 'white' : 'black';
    return {number, color};
}
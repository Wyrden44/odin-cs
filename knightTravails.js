class ChessBoard {
    constructor() {
        this.knightMoves = [[2, 1], [2, -1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [1, -2], [-1, -2]];
    }
    checkOutOfBounds(x, y) {
        if (x < 0 || x > 7) return true;
        if (y < 0 ||y > 7) return true;
        return false;
    }

    getValidKnightMoves(x, y) {
        let valid = [];
        for (let [ xMove, yMove ] of this.knightMoves) {
            if (!this.checkOutOfBounds(x+xMove, y+yMove)) {
                valid.push([x+xMove, y+yMove]);
            }
        }
        return valid;
    }
}

function knightMoves(startingPos, targetPos) {
    const chessBoard = new ChessBoard();
    // search shortest possible path with bfs
    const queue = [[startingPos]];
    const visited = new Array(8).fill(null).map(() => new Array(8).fill(false)); 
    while (queue.length > 0) {
        const path = queue.shift();
        let [ x, y ] = path[path.length-1];
        
        for (let newPos of chessBoard.getValidKnightMoves(x, y)) {
            if (newPos[0] === targetPos[0] && newPos[1] === targetPos[1]) {
                // found shortest path
                return [...path, newPos];
            }
            if (!visited[newPos[0]][newPos[1]]) {
                queue.push([...path, newPos]);
                visited[newPos[0]][newPos[1]] = true;
            }
        }
    }
    return "No path found!"
}

console.log(knightMoves([0,0],[2,7]));
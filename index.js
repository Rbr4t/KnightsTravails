import Move from './move.js'

function generateMoves(positionx, positiony) {
    let moves = []

    // thanks some random guy for pointing out how to calculate positions, I had it a bit wrong and couldn't find out what was causing it

    /* 
        1. (x-1, y+2) ==> (-1, +2)
        2. (x+1, y+2) ==> (+1, +2)
        3. (x+2, y+1) ==> (+2, +1)
        4. (x+2, y-1) ==> (+2, -1)
        5. (x+1, y-2) ==> (+1, -2)
        6. (x-1, y-2) ==> (-1, -2)
        7. (x-2, y-1) ==> (-2, -1)
        8. (x-2, y+1) ==> (-2, +1) 
    */
    moves.push([positionx - 1, positiony + 2])
    moves.push([positionx + 1, positiony + 2])

    moves.push([positionx + 2, positiony + 1])
    moves.push([positionx + 2, positiony - 1])

    moves.push([positionx + 1, positiony - 2])
    moves.push([positionx - 1, positiony - 2])

    moves.push([positionx - 2, positiony - 1])
    moves.push([positionx - 2, positiony + 1])

    function checkIfValidMove(move) {
        if(move[0] < 0 || move[1] < 0) {
            return false
        } else if(move[0] > 8 || move[1] > 8) {
            return false
        }
        return true
    }
    moves = moves.filter(checkIfValidMove)
    return moves

}

let path = [];
function fullpath(node) {
    if(node === null) {
        return 0
    } else {
        path.push(node.position);
        return fullpath(node.parent)
    }
}

function knightMoves(start, end) {
    let queue = [];
    queue.push(new Move(null, start))
    while(queue.length!==[]) {
        
        const current = queue.shift()
        
        if(current.position[0] === end[0] && current.position[1] === end[1] ) {
            fullpath(current)
            return path.reverse()
            
        } else {
            const new_moves = generateMoves(current.position[0], current.position[1])
            new_moves.forEach(e => {
                current.children.push(new Move(current, e))
            })

            current.children.forEach(c => {
                queue.push(c)
            })

        }
    }
}

console.log(knightMoves([0,0],[1,2]))

console.log(knightMoves([0,0],[3,3]))

console.log(knightMoves([3,3],[0,0]))

console.log(knightMoves([3,3],[4,3]))

console.log(knightMoves([8, 1],[1,8]))


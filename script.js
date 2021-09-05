let currentUser = 1
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
const sectionArray = ['block_0', 'block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6', 'block_7', 'block_8']


// Places and X or and O based on who the current use is
function placeChoice(id) {
    // Checks to see if space is occupied
    if (document.querySelector(`#block_${id}`).innerHTML !== '') {
        console.log('Space occupied')
        // Sets space selected based on the current player
    } else {
        if (currentUser === 1) {
            board[id] = currentUser;
            document.getElementById(`block_${id}`).innerHTML = 'X';
            document.getElementById(`block_${id}`).className = 'block occupied';
        } else {
            board[id] = currentUser;
            document.getElementById(`block_${id}`).innerHTML = 'O';
            document.getElementById(`block_${id}`).className = 'block occupied';
        }
        // Checks board for win after every move made
        if (checkWinState()) {
            console.log('You Win!')
            // Displays a red X or O dependig on which user won the game
            if (currentUser === 1) {
                document.getElementById('x-win').style.display = 'block';
            } else {
                document.getElementById('o-win').style.display = 'block';
            }
            document.getElementById('play-area').className = 'play-area blur'
            // Disables css hovers and onclicks when game is 
            for (let i = 0; i < 9; i++) {
                document.getElementById(`block_${i}`).onclick = null;
                document.getElementById(`block_${i}`).className = 'block-done';
            }
        } else {
            // Changes user after a move is made
            changeUser();
            console.log('Player Switched')

        }

    }
}

function buffer(id) {
    placeChoice(id);
    setTimeout(() => compMove(), 500)
}

function compMove() {
    console.table(board)
    let freeArray = [];
    board.forEach((square, squareIndex) => {
        if (square === 0) {
            freeArray.push(squareIndex)
        }
    })

    let randomFreeSquare = freeArray[Math.floor(Math.random() * freeArray.length)];
    placeChoice(randomFreeSquare);
}

// Wipes the board clean of markers
function resetBoard() {
    currentUser = 1;
    document.getElementById('play-area').className = 'play-area';
    document.getElementById('o-win').style.display = 'none';
    document.getElementById('x-win').style.display = 'none';
    for (let i = 0; i < 9; i++) {
        document.querySelector(`#block_${i}`).innerHTML = '';
        // document.getElementById(`block_${i}`).onclick = () => placeChoice(i);
        document.getElementById(`block_${i}`).className = 'block';
        board[i] = '';
    }
    showActivePlayer();
}
// Changes the current user
function changeUser() {

    if (currentUser === 2) {
        currentUser = 1;
    } else { currentUser = 2; }
    showActivePlayer()
}

// Check whether the game has been won
function checkWinState() {



    function shortCut(num1, num2, num3) {
        return (
            array[num1] === currentPlayer &&
            array[num2] === currentPlayer &&
            array[num3] === currentPlayer
        )
    }

    // Horizontal Win Conditions
    if ((board[0] === currentUser &&
        board[1] === currentUser &&
        board[2] === currentUser) ||

        (board[3] === currentUser &&
            board[4] === currentUser &&
            board[5] === currentUser) ||

        (board[6] === currentUser &&
            board[7] === currentUser &&
            board[8] === currentUser) ||
        // Vertical Win Conditions
        (board[0] === currentUser &&
            board[3] === currentUser &&
            board[6] === currentUser) ||

        (board[1] === currentUser &&
            board[4] === currentUser &&
            board[7] === currentUser) ||

        (board[2] === currentUser &&
            board[5] === currentUser &&
            board[8] === currentUser) ||
        // Diagonal Win Conditions
        (board[0] === currentUser &&
            board[4] === currentUser &&
            board[8] === currentUser) ||

        (board[2] === currentUser &&
            board[4] === currentUser &&
            board[6] === currentUser)) {

        return true;
    };
    return false;
}


function showActivePlayer() {
    if (currentUser === 1) {
        document.querySelector('#currentPlayer').innerHTML = 'USER';
    } else {
        document.querySelector('#currentPlayer').innerHTML = 'CPU';
    }


}

showActivePlayer();
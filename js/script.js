const GameBoard = (() => {

	let board = ['','','','x','','','','',''];

	const clear = function () {
		this.board = ['','','','','','','','',''];
	}

	const move = function (player, position) {
		this.board.splice(position, 1, player.side)
	}

	return { board, clear, move };

})();

const DisplayController = (() => {

	const renderBoard = function () {
		let board = '';

		for(i = 0; i < GameBoard.board.length; i++){
			board += `<div class="cell col-4">${GameBoard.board[i].toUpperCase()}</div>`
		}

		return board;
	}

	return { renderBoard }
})();

const playerFactory = (name, side) => {
	return { name, side }
};

const Game = (() => {

	let currentPlayer = undefined;
	let player1 = playerFactory("Player 1", "X");
	let player2 = playerFactory("Player 2", "O");

	const create = function () {
		currentPlayer = player1;
		_render();
		_setListeners();
	}

	const _render = function () {
		document.getElementById('board').innerHTML = DisplayController.renderBoard();
	}

	const _setListeners = function () {
		
		document.getElementById("board").addEventListener('click', function(e) {
			if(e.target && e.target.matches("div.cell")) {
				_makeMove(e.target);
			}
		}, false);

	}

	const _makeMove = function (cell) {
		if(cell.innerHTML) { alert("You need to pick an empty spot on the board!"); }
		else { 
			var i = 0;
			while((cell = cell.previousSibling) != null){
				i++;
			}
			GameBoard.move(currentPlayer, i);
		}
		_update();
	}

	const _update = function () {
		currentPlayer = (currentPlayer === player1 ? player2 : player1);
		console.log(player2)
		_render();
	}

	const _checkWin = function () {

	}

	return { create }

})();

$(document).ready(function() { 
	Game.create() 
});

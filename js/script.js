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

const Player = (name, side) => {
	return { name, side }
};

const Game = (() => {

	const create = function () {
		_render();
		_setListeners();
	}

	const _render = function () {
		document.getElementById('board').innerHTML = DisplayController.renderBoard();
	}

	const _setListeners = function () {
		
		document.getElementById("board").addEventListener('click', function(e) {
			if(e.target && e.target.matches("div.cell")) {
				makeMove(e.target);
			}
		}, false);

	}

	const makeMove = function (cell) {
		if(cell.innerHTML) { alert("You need to pick an empty spot on the board!"); }
	}

	return { create }

})();

$(document).ready(function() { 
	Game.create() 
});

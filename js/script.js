const GameBoard = (() => {

	let board = ['','','','','','','','',''];

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
			i = _getIndexOfCell(cell);
			GameBoard.move(currentPlayer, i);
			_update();
		}
	}

	const _getIndexOfCell = function (cell) {
		var i = 0;
		while((cell = cell.previousSibling) != null){
			i++;
		}
		return i;
	}

	const _update = function () {
		_render();
		if (_checkWin()){
			alert(`${currentPlayer}.name has won!`);
		}
		else{
			currentPlayer = (currentPlayer === player1 ? player2 : player1);
		}
	}

	const _checkWin = function () {
		const winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[7,5,3],[1,4,7],[2,5,8],[3,6,9]];

		for(var i = 0; i < winConditions.length; i++){
			var counter = 0;
			for(var j = 0; j < winConditions[i].length; j++){
				console.log(winConditions[i][j])
				if (document.getElementById("board").childNodes[(winConditions[i][j])-1].innerHTML.toUpperCase() === currentPlayer.side.toUpperCase()){
					
					counter++;
				}
				if(counter == 3) { return true }
			}
		}
		return false
	}

	return { create }

})();

$(document).ready(function() { 
	Game.create() 
});

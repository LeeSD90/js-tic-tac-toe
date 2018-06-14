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
			board += '<div class="cell col-4">X</div>'
		}

		return board;
	}

	return { renderBoard }
})();

const Player = (name, side) => {
	return { name, side }
};

$(document).ready(function() { 
	document.getElementById('board').innerHTML = DisplayController.renderBoard(); 
});

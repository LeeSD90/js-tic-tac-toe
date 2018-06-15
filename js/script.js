const playerFactory = (name, side) => {
	return { name, side }
};

const GameBoard = (() => {

	let board = ['','','','','','','','',''];

	const clear = function () {
		this.board = ['','','','','','','','',''];
	}

	const move = function (player, cell) {
		if(cell.innerHTML) { 
			alert("You need to pick an empty spot on the board!"); 
		}
		else{
			this.board.splice(_getIndexOfCell(cell), 1, player.side)
		}
	}

	const checkWin = function (player) {
		const winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[7,5,3],[1,4,7],[2,5,8],[3,6,9]];

		for(var i = 0; i < winConditions.length; i++){
			var counter = 0;
			for(var j = 0; j < winConditions[i].length; j++){
				if (document.getElementById("board").childNodes[(winConditions[i][j])-1].innerHTML.toUpperCase() === player.side.toUpperCase()){
					counter++;
				}
				if(counter == 3) { return 1 }
			}
		}

		var counter = 0;
		for(var i = 0; i < document.getElementById("board").childNodes.length; i++){ 
			
			if (document.getElementById("board").childNodes[i].innerHTML != ''){
				counter++;
			}
			if(counter == 9) { return -1 }
		}

		return 0;
	}

	const _getIndexOfCell = function (cell) {
		var i = 0;
		while((cell = cell.previousSibling) != null){
			i++;
		}
		return i;
	}

	return { board, clear, move, checkWin };

})();

const Game = (() => {

	var currentPlayer = undefined;
	var player1 = playerFactory("Player 1", "X");
	var player2 = playerFactory("Player 2", "O");
	var playing = false;

	const create = function () {
		document.getElementById("new").style.display = "none";
		document.getElementById("players").style.display = "block";
		document.getElementById("start").style.display = "block";
	}

	const start = function () {
		document.getElementById("players").style.display = "none";
		document.getElementById("start").style.display = "none";
		document.getElementById("restart").style.display = "block";
		player1.name = document.getElementById("p1name").value ? document.getElementById("p1name").value : "Player 1";
		player2.name = document.getElementById("p2name").value ? document.getElementById("p2name").value : "Player 2";
		currentPlayer = player1;
		playing = true;
		_clearListeners();
		_render();
		_setListeners();
	}

	const restart = function () {
		document.getElementById("restart").style.display = "none";
		playing = false;
		GameBoard.clear();
		this.create();
	}

	const _render = function () {
		let board = '';

		for(i = 0; i < GameBoard.board.length; i++){
			board += `<div class="cell col-4">${GameBoard.board[i].toUpperCase()}</div>`
		}
		
		document.getElementById('board').innerHTML = board;
	}

	const _clearListeners = function () {
		var board = document.getElementById("board");
		boardClone = board.cloneNode(true);

		board.parentNode.replaceChild(boardClone, board);
	}

	const _setListeners = function () {

		document.getElementById("board").addEventListener('click', function(e) {
			if(e.target && e.target.matches("div.cell")) {
				if(playing){
					GameBoard.move(currentPlayer, e.target);
					_update();
				} else { alert("Start a new game first!") }
			}
		}, false);

	}

	const _update = function () {
		_render();

		switch(GameBoard.checkWin(currentPlayer)){
			case 1: 
				alert(`${currentPlayer.name} wins!`);
				playing = false;
				break;
			case -1:
				alert("Draw!");
				playing = false;
				break;
			default:
				currentPlayer = (currentPlayer === player1 ? player2 : player1);
		}

	}

	return { create, start, restart }

})();

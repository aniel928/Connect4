class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}

	/** 
	 * Returns active player.
	 * @return {Object} 	player - The active player.
	 */
	get activePlayer() {
		return this.players.find(player => player.active);
	}

	/** 
	 * Checks if there a winner on the board after each token drop.
	 * @param   {Object}    Targeted space for dropped token.
	 * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
	 */

	checkForWin(target){
		console.log(target);
	    const owner = target.token.owner;
	    let win = false;

	    // vertical
	    for (let x = 0; x < this.board.columns; x++ ){
	        for (let y = 0; y < this.board.rows - 3; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x][y+1].owner === owner && 
	                this.board.spaces[x][y+2].owner === owner && 
	                this.board.spaces[x][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // horizontal
	    for (let x = 0; x < this.board.columns - 3; x++ ){
	        for (let y = 0; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x+1][y].owner === owner && 
	                this.board.spaces[x+2][y].owner === owner && 
	                this.board.spaces[x+3][y].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 0; y < this.board.rows - 3; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y+1].owner === owner && 
	                this.board.spaces[x-2][y+2].owner === owner && 
	                this.board.spaces[x-3][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 3; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y-1].owner === owner && 
	                this.board.spaces[x-2][y-2].owner === owner && 
	                this.board.spaces[x-3][y-3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    return win;
	}

	/**
	 * Creates two player objects.
	 * @return {array} 	An array of two player objects.
	 */
	createPlayers() {
		const player1 = new Player('Player 1', 1, '#e15258', true);
		const player2 = new Player('Player 2', 2, '#e59a13');

		return [player1, player2];
	}

	/** 
	 * Displays game over message.
	 * @param {string} message - Game over message.      
	 */
	gameOver(msg) {
		document.getElementById('game-over').style.display = 'block';
		document.getElementById('game-over').textContent = msg;
	}

	handleKeyDown(event) {
		if (this.ready) {
			switch (event.key){
				case 'ArrowLeft':
					this.activePlayer.activeToken.moveLeft();
					break;
				case 'ArrowRight':
					this.activePlayer.activeToken.moveRight(this.board.columns);
					break;
				case 'ArrowDown': 
					this.playToken();
					break;
				default:
					// do nothing
					break;
			}	
		}
		
	}

	/** 
	 */
	playToken() {
		let activeToken = this.activePlayer.activeToken;
		let col = this.board.spaces[activeToken.columnLocation];
		let target = null;
		let game = this;

		for (let space of col) {
			if (space.token == null) {
				target = space;
			}
		}

		if (target != null) {
			game.ready = false;
			activeToken.drop(target, function() {
				game.updateGameState(activeToken, target);	
			});
		}
	}

	startGame() {
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
	}

	/** 
	 * Switches active player. 
	 */
	 switchPlayers() {
	 	for (let player of this.players) {
	 		player.active = !player.active;
	 	}
	 }
	/** 
	 * Updates game state after token is dropped. 
	 * @param   {Object}  token  -  The token that's being dropped.
	 * @param   {Object}  target -  Targeted space for dropped token.
	 */
	 updateGameState(token, target) {
	 	target.mark(token);

	 	console.log(this);

	 	if (this.checkForWin(target)) {
	 		this.gameOver(`${target.owner.name} wins!`);
	 	} else {
	 		this.switchPlayers();
	 		if (this.activePlayer.checkTokens()) {
	 			this.activePlayer.activeToken.drawHTMLToken();
	 			this.ready = true;
	 		} else {
	 			this.gameOver("No more tokens");
	 		}
	 	}

	 }
}
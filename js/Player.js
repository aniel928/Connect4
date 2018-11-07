class Player {
	constructor(name, id, color, active = false) {
		this.name = name;
		this.id = id;
		this.color = color;
		this.active = active;
		this.tokens = this.createTokens(21);
	}
	
	/**
	 * Check if a player has any undropped tokens left
	 * @return {Boolean} 
	 */
	checkTokens() {
		return this.unusedTokens.length ? true : false;
	}

	/**
	 * Creates token objects for players.
	 * @param 	{integer}	num - Number of token objects to be created.
	 * @returns	{Array}		An array of hte newly created token objects.
	 */
	createTokens(num) {
		const tokens = [];

		for (let i = 0; i < num; i++){
			let token = new Token(this, i);
			tokens.push(token);	
		}

		return tokens;
	}

	/**
	 * Gets the active token by returning the first token in the array of unused tokens.
	 * @return {Object} First token object in teh array of unused tokens.
	 */
	get activeToken() {
		return this.unusedTokens[0];
	}

	/**
	 * Gets all tokens that haven't been dropped.
	 * @return {array} Array of unused tokens.
	 */
	get unusedTokens() {
		return this.tokens.filter(token => !token.dropped);
	}
}
class Board {
	constructor() {
		this.rows = 6;
		this.columns = 7;
		this.spaces = this.createSpaces();
	}

	/**
	 * Generates 2D array of spaces.
	 * @return {array} 	An array of space objects.
	 */
	createSpaces() {
		const spaces = [];

		for (let i = 0; i < this.columns; i++) {
			const spaceCol = [];
			
			for (let j = 0; j < this.rows; j++) {
				let space = new Space(i, j);
				spaceCol.push(space);
			}

			spaces.push(spaceCol);
		}

		return spaces;
	}

	drawHTMLBoard() {
		for (let column of this.spaces) {
			for (let space of column) {
				space.drawSVGSpace();
			}
		}
	}
}
// priority: 0

function arrConvert(element) {
	let array = Array.isArray(element) ? element : [element]
	return array
}

function createRecipe(event, id, recipe) {
	typeof id == "string" ? event.custom(recipe).id(id) : event.custom(recipe);
}

global.recipes = {
	createaddition: {
		/** createaddition:charging
		 * @param {Internal.RecipesEventJS_} event
		 * @param {Internal.ItemStack_} output
		 * @param {Internal.ItemStack_} input
		 * @param {number} energy
		 * @param {string} id
		 */
		charging: (event, output, input, energy, id) => {
			createRecipe(event, id, {
				type: "createaddition:charging",
				input: Ingredient.of(input),
				result: Ingredient.of(output),
				energy: typeof energy == "number" ? energy : 10000
			})
		}
	}
}
// priority: 0

function arrConvert(element) {
	let array = Array.isArray(element) ? element : [element]
	return array
}

function ingredientOfNoCount(item) {
	let ingredient = Ingredient.of(item)
	let json
	if (ingredient.withCount(1).tag === undefined) {
		json = { item: ingredient.id }
		if (ingredient.getNbt() != null) json["nbt"] = ingredient.getNbt()
		if (!isNaN(ingredient.getChance())) json["chance"] = ingredient.getChance()
	} else {
		json = { tag: ingredient.withCount(1).tag }
	}
	return json
}

function ingredientOfAlwaysIngredient(item) {
	let ingredient = Ingredient.of(item)
	let json
	if (ingredient.withCount(1).tag === undefined) {
		json = { ingredient: { item: ingredient.id } }
		if (ingredient.getNbt() != null) json["ingredient"]["nbt"] = ingredient.getNbt()
		if (!isNaN(ingredient.getChance())) json["ingredient"]["chance"] = ingredient.getChance()
	} else {
		json = { ingredient: { tag: ingredient.withCount(1).tag } }
	}
	json["count"] = ingredient.getCount()
	return json
}

function ingredientOfAlwaysChance(item) {
	let ingredient = Item.of(item)
	let json = { item: ingredient.id }
	json["count"] = ingredient.getCount()
	json["chance"] = isNaN(ingredient.getChance()) ? 1.0 : ingredient.getChance()
	if (ingredient.getNbt() != null) json["nbt"] = ingredient.getNbt()
	return json
}

function ingredientsConvert(items) {
	let ingredients = []
	items.forEach(item => { ingredients.push(Ingredient.of(item)) })
	return ingredients
}

function fluidConvert(fluid) {
	if (typeof fluid == "string") fluid = Fluid.of(fluid, 1000)
	return { fluid: fluid.id, amount: fluid.getAmount() }
}

function fluidsConvert(fluidArray) {
	let fluids = []
	fluidArray.forEach(fluid => { fluids.push(fluidConvert(fluid)) })
	return fluids
}

function fluidConvertWithTag(fluidArray, typeNames, amountName) {
	Array.isArray(typeNames) ? typeNames = arrConvert(typeNames).slice(0, 2) : typeNames = ["fluid", "tag"]
	typeNames = typeNames.concat(["fluid", "tag"].slice(typeNames.length, 2))
	if (typeof amountName != "string") amountName = "amount"

	let fluid = {}
	fluidArray[0].substring(0, 1) === "#" ? fluid[typeNames[1]] = fluidArray[0].substring(1) : fluid[typeNames[0]] = fluidArray[0]
	fluid[amountName] = typeof fluidArray[1] == "number" ? fluidArray[1] : 1000
	return fluid
}

function fluidConvertOnlyTag(fluidArray) {
	return { tag: fluidArray[0], amount: typeof fluidArray[1] == "number" ? fluidArray[1] : 1000 }
}

function fluidsConvertWithTag(fluidArray, typeNames, amountName) {
	let fluids = []
	fluidArray.forEach(fluid => {
		fluids.push(fluidConvertWithTag(arrConvert(fluid), typeNames, amountName))
	})
	return fluids
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
		},
		liquid_burning: (event, input, time, is_super, id) => {
			createRecipe(event, id, {
				type: "createaddition:liquid_burning",
				input: fluidConvertWithTag(arrConvert(input), ["fluid", "fluidTag"]),
				burnTime: typeof time == "number" ? time : 200,
				superheated: typeof is_super == "boolean" ? is_super : false
			})
		}
	},
	create_new_age: {
		energising: (event, output, input, energy, id) => {
			createRecipe(event, id, {
				type: "create_new_age:energising",
				energy_needed: typeof energy == "number" ? energy : 10000,
				ingredients: arrConvert(ingredientOfNoCount(input)),
				results: arrConvert(ingredientOfNoCount(output))
			})
		}
	}
}
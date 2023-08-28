// packmode: notworking

const ItemDescription = Java.loadClass("com.simibubi.create.foundation.item.ItemDescription$Modifier");
const TooltipModifier = Java.loadClass("com.simibubi.create.foundation.item.TooltipModifier");
const Palette = Java.loadClass("com.simibubi.create.foundation.item.TooltipHelper$Palette");

ItemEvents.tooltip((event) => {
	/**
	 * @type {Internal.Ingredient_} item
	 */
	Ingredient.of("kubejs:radar").itemIds
	event.addAdvanced("kubejs:radar", (item) => {
		TooltipModifier.REGISTRY.register(
			item.item,
			new ItemDescription(item, Palette.STANDARD_CREATE)
		);
	});

})
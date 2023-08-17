// priority: 0

/**
 * @type {Special.Item[]}
 */
global.deleteItem = [
	/createdeco:.*_slab_vert/,
	"alloyed:steel_sheet_vertical_slab",
	"alloyed:steel_sword",
	"alloyed:steel_pickaxe",
	"alloyed:steel_axe",
	"alloyed:steel_shovel",
	"alloyed:steel_hoe",
	"alloyed:steel_helmet",
	"alloyed:steel_chestplate",
	"alloyed:steel_leggings",
	"alloyed:steel_boots",
	"ad_astra:hammer",
	"ad_astra:compressor",
	"alloyed:steel_casing",
]

ServerEvents.recipes(e => {
	/**
	 * @param {Special.Item} output
	 * @param {Special.Item} input
	 * @param {object} options
	 * @param {number} options.energy
	 * @param {string} options.id
	 */
	let charging = (output, input, options) => {
		const defaultOptions = {
			energy: 10000,
			id: null
		};
		Object.assign(defaultOptions, options)
		const mergedOptions = defaultOptions;

		if (mergedOptions.id == null) {
			e.custom(
				{
					type: "createaddition:charging",
					input: { item: input, count: 1 },
					result: { item: output, count: 1 },
					energy: mergedOptions.energy
				}
			);
		} else {
			e.custom(
				{
					type: "createaddition:charging",
					input: { item: input, count: 1 },
					result: { item: output, count: 1 },
					energy: mergedOptions.energy
				}
			).id(mergedOptions.id);
		};
	};

	// 松明
	e.replaceOutput({ id: "immersiveengineering:crafting/torch" }, "minecraft:torch", "realistictorches:unlit_torch")
	e.replaceOutput({ id: "delightful:torch_from_animal_oil_bottle" }, "minecraft:torch", "realistictorches:unlit_torch")
	e.replaceOutput({ id: "minecraft:torch" }, "minecraft:torch", "realistictorches:unlit_torch")
	e.remove({ id: "realistictorches:unlit_torch" })

	// adastraの松明
	e.remove({ id: "ad_astra:recipes/soul_torch" })
	e.shaped("minecraft:soul_torch", [
		"S",
		"I"
	], {
		"S": "#minecraft:soul_fire_base_blocks",
		"I": "realistictorches:unlit_torch"
	});

	// enigmaticunity:bright_source_generator
	e.remove({ id: "enigmaticunity:bright_source_generator" })
	charging("enigmaticunity:bright_source_generator", "enigmaticunity:dim_source_generator", { energy: 10000, id: "enigmaticunity:bright_source_generator" })

	// enigmaticunity:iridescent_source_generator
	e.remove({ id: "enigmaticunity:iridescent_source_generator" })
	charging("enigmaticunity:iridescent_source_generator", "enigmaticunity:bright_source_generator", { energy: 20000, id: "enigmaticunity:iridescent_source_generator" })

	// enigmaticunity:bright_source_producer
	e.remove({ id: "enigmaticunity:bright_source_producer" })
	charging("enigmaticunity:bright_source_producer", "enigmaticunity:dim_source_producer", { energy: 10000, id: "enigmaticunity:bright_source_producer" })

	// enigmaticunity:iridescent_source_producer
	e.remove({ id: "enigmaticunity:iridescent_source_producer" })
	charging("enigmaticunity:iridescent_source_producer", "enigmaticunity:bright_source_producer", { energy: 20000, id: "enigmaticunity:iridescent_source_producer" })

	// createindustry:sawdust_block
	e.remove({ id: "createindustry:compacting/sawdust_block" })
	e.shaped("createindustry:sawdust_block", [
		"##",
		"##"
	], {
		"#": "#forge:dusts/wood"
	})

	// immersive:tools
	e.replaceInput({ id: "immersiveengineering:crafting/hammer" }, "iron_ingot", "#forge:ingots/steel")
	e.replaceInput({ id: "immersiveengineering:crafting/wirecutter" }, "iron_ingot", "#forge:ingots/steel")
	e.replaceInput({ id: "immersiveengineering:crafting/screwdriver" }, "#forge:rods/iron", "#forge:rods/steel")

	// aquatictorches:aquatic_torch
	e.remove({ id: "aquatictorches:aquatic_torch" })
	e.shapeless("aquatictorches:aquatic_torch", ["realistictorches:lit_torch", "minecraft:glow_ink_sac"])

	// 特定のレシピを削除
	let removeRecipeID = [
		"alloyed:pressing/steel_sheet",
		"createindustry:sequenced_assembly/heavy_plate",
		"createindustry:mixing/gun_powder",
		"createindustry:crafting/steel_ingot_from_block",
		"createindustry:crafting/aluminum_from_block",
		"createindustry:crafting/aluminum_block",
	]
	removeRecipeID.forEach(element => {
		e.remove({ id: element })
	});

	// アイテムを削除
	global.deleteItem.forEach(element => {
		e.remove({ output: element })
		e.remove({ input: element })
	});
});

ServerEvents.tags("item", e => {
	e.add("forge:storage_blocks/steel", "createindustry:steel_block")
	e.add("forge:storage_blocks/cast_iron", "createindustry:cast_iron_block")
	e.add("forge:storage_blocks/aluminum", "createindustry:aluminum_block")
	e.add("forge:plates/steel", "createindustry:heavy_plate")
	e.add("forge:coal_coke", "createindustry:coal_coke")
	e.add("forge:dusts/sulfur", "createindustry:sulfur_powder")
	e.add("forge:dusts/saltpeter", "createindustry:saltpeter")
	e.add("forge:dusts/wood", "createindustry:sawdust")
	e.add("forge:rods/steel", "createindustry:rebar")
})

LootJS.modifiers(event => {
	event.addBlockLootModifier("#forge:ores").modifyLoot("#forge:raw_materials", item => {
		const replacement = AlmostUnified.getReplacementForItem(item);
		if (replacement.isEmpty()) {
			return item;
		}
		replacement.setCount(item.getCount());
		return replacement;
	});

	event.addBlockLootModifier("ad_astra:extinguished_torch").replaceLoot("ad_astra:extinguished_torch", "realistictorches:unlit_torch")
});

BlockEvents.rightClicked("ad_astra:extinguished_torch", e => {
	e.block.popItem("realistictorches:unlit_torch")
	e.block.set("air")
	e.cancel()
});

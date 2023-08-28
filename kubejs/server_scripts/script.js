// priority: 1

/**
 * @type {Internal.Ingredient_[]}
 */
global.deleteItem = [
	/^createdeco:.*_slab_vert$/,
	"ad_astra:hammer",
	"ad_astra:compressor",
	"ad_astra:coal_generator",
	"ad_astra:fluid_pipe_duct",
	"ad_astra:ostrum_fluid_pipe",
	"ad_astra:desh_fluid_pipe",
	"ad_astra:desh_cable",
	"ad_astra:extinguished_torch",
	"cgm:workbench",
]

/**
 * @type {Special.RecipeType[]}
 */
global.deleteRecipeType = [
	"ad_astra:compressing",
	"cgm:workbench",
]

/**
 * @type {Special.Enchantment[]}
 */
const deleteEnchantType = [
	"cgm:quick_hands",
	"cgm:accelerator",
	"cgm:collateral",
	"cgm:fire_starter",
	"cgm:lightweight",
	"cgm:over_capacity",
	"cgm:reclaimed",
	"cgm:puncturing",
	"cgm:trigger_finger"
]


ServerEvents.recipes(e => {
	const { minecraft, create, immersiveengineering } = e.recipes;
	const { createaddition, } = global.recipes;

	// 松明
	e.replaceOutput({ id: "immersiveengineering:crafting/torch" }, "minecraft:torch", "realistictorches:unlit_torch")
	e.replaceOutput({ id: "delightful:torch_from_animal_oil_bottle" }, "minecraft:torch", "realistictorches:unlit_torch")
	e.replaceOutput({ id: "minecraft:torch" }, "minecraft:torch", "realistictorches:unlit_torch")

	// adastraの松明
	e.remove({ id: "ad_astra:recipes/soul_torch" })
	minecraft.crafting_shaped("minecraft:soul_torch", [
		"S",
		"I"
	], {
		"S": "#minecraft:soul_fire_base_blocks",
		"I": "realistictorches:unlit_torch"
	}).id("ad_astra:crafting/soul_torch")

	// enigmaticunity:bright_source_generator
	e.remove({ id: "enigmaticunity:bright_source_generator" })
	createaddition.charging(e, "enigmaticunity:bright_source_generator", "enigmaticunity:dim_source_generator", 10000, "enigmaticunity:bright_source_generator")

	// enigmaticunity:iridescent_source_generator
	e.remove({ id: "enigmaticunity:iridescent_source_generator" })
	createaddition.charging(e, "enigmaticunity:iridescent_source_generator", "enigmaticunity:bright_source_generator", 20000, "enigmaticunity:iridescent_source_generator")

	// enigmaticunity:bright_source_producer
	e.remove({ id: "enigmaticunity:bright_source_producer" })
	createaddition.charging(e, "enigmaticunity:bright_source_producer", "enigmaticunity:dim_source_producer", 10000, "enigmaticunity:bright_source_producer")

	// enigmaticunity:iridescent_source_producer
	e.remove({ id: "enigmaticunity:iridescent_source_producer" })
	createaddition.charging(e, "enigmaticunity:iridescent_source_producer", "enigmaticunity:bright_source_producer", 20000, "enigmaticunity:iridescent_source_producer")

	// createindustry:sawdust_block
	e.remove({ id: "createindustry:compacting/sawdust_block" })
	minecraft.crafting_shaped("createindustry:sawdust_block", [
		"##",
		"##"
	], {
		"#": "#forge:dusts/wood"
	}).id("createindustry:crafting/sawdust_block")

	// immersive:tools
	e.replaceInput({ id: "immersiveengineering:crafting/hammer" }, "iron_ingot", "#forge:ingots/steel")
	e.replaceInput({ id: "immersiveengineering:crafting/wirecutter" }, "iron_ingot", "#forge:ingots/steel")
	e.replaceInput({ id: "immersiveengineering:crafting/screwdriver" }, "#forge:rods/iron", "#forge:rods/steel")

	// aquatictorches:aquatic_torch
	e.remove({ id: "aquatictorches:aquatic_torch" })
	e.shapeless("aquatictorches:aquatic_torch", ["realistictorches:lit_torch", "minecraft:glow_ink_sac"])

	// radar
	minecraft.crafting_shaped("kubejs:radar", [
		"PPP",
		"ECE",
		"PMP"
	], {
		"P": "#forge:plates/steel",
		"P": 'meetyourfight:phantoplasm',
		"E": 'immersiveengineering:electron_tube',
		"C": 'compass',
		"M": 'create:precision_mechanism'
	}).id("kubejs:crafting/radar")

	// immersive_aircraft
	{
		e.remove({ id: "immersive_aircraft:improved_landing_gear" })
		minecraft.crafting_shaped("immersive_aircraft:improved_landing_gear", [
			"PI",
			"W "
		], {
			"I": "#forge:ingots/iron",
			"P": "#forge:plates/iron",
			"W": "ad_astra:wheel"
		}).id("immersive_aircraft:crafting/improved_landing_gear")
	}

	// ad_astra
	{
		// ad_astra:engine_fan
		e.remove({ id: "ad_astra:recipes/engine_fan" })
		create.mechanical_crafting("ad_astra:engine_fan", [
			" P ",
			"PSP",
			" P "
		], {
			"P": "#forge:plates/steel",
			"S": "#forge:ingots/steel"
		}).id("ad_astra:mechanical_crafting/engine_fan")

		// ad_astra:rocket_nose_cone
		e.remove({ id: "ad_astra:recipes/rocket_nose_cone" })
		create.mechanical_crafting("ad_astra:rocket_nose_cone", [
			" I ",
			" S ",
			"SBS"
		], {
			"I": "minecraft:lightning_rod",
			"S": "#forge:ingots/steel",
			"B": "#forge:storage_block/steel"
		}).id("ad_astra:mechanical_crafting/rocket_nose_cone")

		// ad_astra:engine_frame
		e.replaceInput({ id: "ad_astra:recipes/engine_frame" }, "#forge:rods/iron", "#forge:rods/steel")

		// wheel_rugaer
		create.mixing("3x kubejs:wheel_rubber", ["3x myrtrees:latex", "#forge:dusts/sulfur", "2x #forge:dusts/hop_graphite"]).id("kubejs:mixing/wheel_rubber")

		// ad_astra:wheel
		e.remove({ id: "ad_astra:recipes/wheel" })
		minecraft.crafting_shaped("ad_astra:wheel", [
			"###",
			"#S#",
			"###"
		], {
			"#": "kubejs:wheel_rubber",
			"S": "#forge:plates/steel"
		}).id("ad_astra:crafting/wheel")
	}

	// 削除関連
	{
		// 特定のレシピを削除
		/**
		 * @type {Special.RecipeId}
		 */
		let removeRecipeID = [
			"createindustry:sequenced_assembly/heavy_plate",
			"createindustry:mixing/gun_powder",
			"createindustry:crafting/steel_ingot_from_block",
			"createindustry:crafting/aluminum_from_block",
			"createindustry:crafting/aluminum_block",
			"createindustry:stonecutting/rebar",
			"createindustry:stonecutting/sawdust",
			"immersiveengineering:crafting/coke_to_coal_coke",
			"ad_astra:recipes/steel_ingot_from_blasting_iron_ingot",
			"createdeco:cast_iron_ingot_from_cast_iron_block",
			"createindustry:crafting/cast_iron_block",
			"createindustry:crushing/saltpeter",
		]
		removeRecipeID.forEach(element => {
			e.remove({ id: element })
		})

		// レシピタイプを削除
		global.deleteRecipeType.forEach(element => {
			e.remove({ type: element })
		})
		// アイテムを削除
		global.deleteItem.forEach(element => {
			e.remove({ output: element })
			e.remove({ input: element })
		})
	}
})

ServerEvents.tags("item", e => {
	e.add("forge:storage_blocks/steel", "createindustry:steel_block")
	e.add("forge:storage_blocks/cast_iron", "createindustry:cast_iron_block")
	e.add("forge:storage_blocks/aluminum", "createindustry:aluminum_block")
	e.add("forge:storage_blocks/coal_coke", "createindustry:coal_coke_block")

	e.add("forge:plates/steel", "createindustry:heavy_plate")

	e.add("forge:rods/steel", "createindustry:rebar")

	e.add("forge:dusts/sulfur", "createindustry:sulfur_powder")
	e.add("forge:dusts/saltpeter", "createindustry:saltpeter")
	e.add("forge:dusts/wood", "createindustry:sawdust")

	e.add("forge:coal_coke", "createindustry:coal_coke")
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

	event.addEntityLootModifier("meetyourfight:swampjaw").pool(pool => {
		pool.rolls(1)
		pool.addWeightedLoot([LootEntry.of("immersiveengineering:blueprint", '{blueprint:"baker_rifle"}'), LootEntry.of("immersiveengineering:blueprint", '{blueprint:"walther_ppk"}'), LootEntry.of("immersiveengineering:blueprint", '{blueprint:"lanchester"}')])
	})
	//event.addEntityLootModifier("meetyourfight:bellringer")
	//event.addEntityLootModifier("meetyourfight:dame_fortuna")
	//event.addEntityLootModifier("meetyourfight:rosalyne")

	event.addEntityLootModifier("minecraft:wither").replaceLoot("progressivebosses:nether_star_shard", "hmag:nether_star_fragment")

	event.addBlockLootModifier("ad_astra:extinguished_torch").replaceLoot("ad_astra:extinguished_torch", "realistictorches:unlit_torch")
})

BlockEvents.rightClicked("ad_astra:extinguished_torch", e => {
	e.block.popItem("realistictorches:unlit_torch")
	e.block.set("air")
	e.cancel()
})

MoreJSEvents.filterEnchantedBookTrade(e => {
	e.remove(deleteEnchantType)
})
MoreJSEvents.filterAvailableEnchantments(e => {
	e.remove(deleteEnchantType)
})

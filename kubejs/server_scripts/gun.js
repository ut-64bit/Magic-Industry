// priority: 2

ServerEvents.recipes(e => {
	const { blueprint } = e.recipes.immersiveengineering;

	// Tier 0
	blueprint("moguns:baker_rifle", ["3x immersiveengineering:gunpart_barrel", "immersiveengineering:gunpart_hammer", "2x #forge:ingots/brass", "5x #minecraft:planks"]).blueprint("baker_rifle")
	blueprint("moguns:lanchester", ["2x immersiveengineering:gunpart_barrel", "6x #forge:ingots/steel", "#forge:ingots/brass", "3x #minecraft:planks"]).blueprint("lanchester")
	blueprint("moguns:walther_ppk", ["immersiveengineering:gunpart_barrel", "4x #forge:ingots/steel"]).blueprint("walther_ppk")
	//blueprint("moguns:baker_rifle", ["3x immersiveengineering:gunpart_barrel", "immersiveengineering:gunpart_hammer", "2x #forge:ingots/brass", "5x #minecraft:planks"]).blueprint("baker_rifle")
})
// priority: 0
const $FlintAndSteelItem = Java.loadClass('net.minecraft.world.item.FlintAndSteelItem')
const $Properties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')

StartupEvents.registry("item", event => {
	event.create("wheel_rubber")
	event.create("radar").unstackable().tooltip(Text.translate("item.kubejs.radar.tooltip.summary"))
	event.createCustom('fire_stick',
		() => new $FlintAndSteelItem(
			new $Properties()
				.tab($KubeJS.tab)
				.stacksTo(1)
				.defaultDurability(8)
				.durability(8)
		));
})
// priority: 0

JEIEvents.removeCategories(e => {
    global.deleteRecipeType.forEach(element => {
        e.remove(element);
    });
})

JEIEvents.hideItems(e => {
    global.deleteItem.forEach(element => {
        e.hide(element);
    });
})

ItemEvents.tooltip(tooltip => {
    tooltip.add(global.deleteItem, Text.red("DELETED").underlined().italic())
})
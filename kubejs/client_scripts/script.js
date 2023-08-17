// priority: 0

// Visit the wiki for more info - https://kubejs.com/

let removeCategory = [
    "ad_astra:compressing",
]
JEIEvents.removeCategories(e => {
    removeCategory.forEach(element => {
        e.remove(element)
    });
})

let hideItem = [
    global.deleteItem,
    'ad_astra:extinguished_torch',
]
JEIEvents.hideItems(e => {
    hideItem.forEach(element => {
        e.hide(element)
    });
})
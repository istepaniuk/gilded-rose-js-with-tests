var GildedRose = function () {
  var items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

GildedRose.updateQuality = function (items) {
  items.forEach(updateItem);
  return items;
};

function isAgedBrie(item) {
    return "Aged Brie" == item.name;
}

function isBackstagePass(item) {
    return "Backstage passes to a TAFKAL80ETC concert" == item.name;
}

function isSulfuras(item) {
    return "Sulfuras, Hand of Ragnaros" == item.name;
}

function isAgedBrieOrBackstagePass(item) {
    return isAgedBrie(item) || isBackstagePass(item);
}

function belowMaxQuality(item) {
    return item.quality < 50;
}

function overMinQuality(item) {
    return item.quality > 0;
}

function decreaseQuality(item) {
    item.quality--;
}

function increaseQuality(item) {
    item.quality++;
}

function resetQuality(item) {
    item.quality = 0;
}

function decreaseSellIn(item) {
    item.sellIn--;
}

var updateItem = function(item) {
    if (!isAgedBrieOrBackstagePass(item) && !isSulfuras(item) && overMinQuality(item))
        decreaseQuality(item);

    if (isAgedBrieOrBackstagePass(item) && belowMaxQuality(item))
        increaseQuality(item);

    if (isAgedBrie(item) && belowMaxQuality(item) && item.sellIn < 6)
        increaseQuality(item);

    if (isAgedBrie(item) && belowMaxQuality(item) && item.sellIn < 11)
        increaseQuality(item);

    if (isBackstagePass(item) && belowMaxQuality(item) && item.sellIn < 11)
        increaseQuality(item);

    if (isBackstagePass(item) && belowMaxQuality(item) && item.sellIn < 6)
        increaseQuality(item);

    if (!isSulfuras(item))
        decreaseSellIn(item);

    if (item.sellIn < 0 && !isAgedBrieOrBackstagePass(item) && overMinQuality(item) && !isSulfuras(item))
        decreaseQuality(item);

    if (item.sellIn < 0 && isAgedBrie(item) && belowMaxQuality(item))
        increaseQuality(item);

    if (item.sellIn < 0 && isAgedBrieOrBackstagePass(item))
        resetQuality(item);
}

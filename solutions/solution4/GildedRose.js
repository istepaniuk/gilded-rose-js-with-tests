/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/
var GildedRose = function () {
  var items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item(AGED_BRIE, 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item(SULFURAS, 0, 80));
  items.push(new Item(BACKSTAGE, 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

var AGED_BRIE = "Aged Brie";
var BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
var SULFURAS = "Sulfuras, Hand of Ragnaros";
var MAX_QUALITY = 50;
var MIN_QUALITY = 0;
var FIVE_DAYS = 5;
var TEN_DAYS = 10;

GildedRose.updateQuality = function (items) {
  
  var item;
  for (var i = 0; i < items.length; i++) {

    GildedRose.updateItemQuality(items[i]);

  }
  return items;
};

GildedRose.updateItemQuality = function (item) {

    if (GildedRose.isGoldenItem(item)) {
      GildedRose.increaseQuality(item);
    }
    
    if (GildedRose.isGoldenItem(item) && item.sellIn <= TEN_DAYS) {
      GildedRose.increaseQuality(item);
    }

    if (GildedRose.isGoldenItem(item) && item.sellIn <= FIVE_DAYS) {
      GildedRose.increaseQuality(item);
    }

    if (GildedRose.isNormalItem(item)) {
      GildedRose.decreaseQuality(item);
    }

    if (SULFURAS != item.name) {
      item.sellIn = item.sellIn - 1;
    }

    if (GildedRose.isNormalItem(item) && item.sellIn < 0 ) {
      GildedRose.decreaseQuality(item);
    } 

    if (!GildedRose.isNormalItem(item) && item.sellIn < 0) {
      item.quality = MIN_QUALITY
    }
}

GildedRose.isGoldenItem = function (item) {
  return (AGED_BRIE == item.name || BACKSTAGE == item.name);
}

GildedRose.isNormalItem = function (item) {
  return (AGED_BRIE != item.name && BACKSTAGE != item.name && SULFURAS != item.name);
}

GildedRose.decreaseQuality = function (item) {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1
  }
}

GildedRose.increaseQuality = function (item) {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1
  }
}
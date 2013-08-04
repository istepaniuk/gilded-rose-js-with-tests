/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/
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
  for (var i = 0; i < items.length; i++) {
    GildedRose.updateItem( items[i] );
  }
  return items;
};

var MAX_QUALITY = 50;
var MIN_QUALITY = 0;
var INCREMENT_BY_THREE_LIMIT = 5;
var INCREMENT_BY_TWO_LIMIT = 10;

function isBrie(item){
  return "Aged Brie" == item.name 
}

function isPass(item){
  return "Backstage passes to a TAFKAL80ETC concert" == item.name
}

function isSulfuras(item){
  return "Sulfuras, Hand of Ragnaros" == item.name
}

function decrementQuality(item){
  return item.quality - 1
}

function incrementQuality(item){
   var increment = 1;
   if ((item.sellIn <= INCREMENT_BY_TWO_LIMIT) ) {
      increment = 2;
    }
    if ((item.sellIn <= INCREMENT_BY_THREE_LIMIT)) {
       increment = 3;
    }
    return item.quality + increment; 
}

function decrementSellIn(item){
  return item.sellIn - 1;
}

function isInQualityRange(item){
  return (item.quality > MIN_QUALITY) && (item.quality < MAX_QUALITY )
}

function isIncreasingQualityItem(item){
  return isBrie(item)|isPass(item)
}

function  isDecreasingQualityItem(item){
  return (!isIncreasingQualityItem(item) && !isSulfuras(item) && isInQualityRange(item))
}

function isDecreasingSellInItem(item){
  return !isSulfuras(item)
}

function updateItemSellIn(item){
  var sellIn = item.sellIn;
  if (isDecreasingSellInItem(item)) {
      sellIn = decrementSellIn(item);
  }
  return sellIn;
}

GildedRose.updateItem = function ( item ) {

    if (isDecreasingQualityItem(item)) {
      item.quality = decrementQuality(item)
    } 
    if (isIncreasingQualityItem(item)) {
      item.quality = incrementQuality(item)
    }
    item.sellIn = updateItemSellIn(item);
    if (item.sellIn < 0) {
      if (isIncreasingQualityItem(item)){
        item.quality = 0;
      }
      if (isDecreasingQualityItem(item)) {
        item.quality = decrementQuality(item)
      } 
    }
}
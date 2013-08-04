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

    if (this.hasToDecreaseQuality(items[i])) {
      this.decreaseQuality(items[i]);
    }

    if (!this.hasToDecreaseQuality(items[i])) {
      this.increaseDailyQuality(items[i]);
    }

    if (this.hasToDecreaseSellIn(items[i])) {
      this.decreaseSellIn(items[i]);
    }

    if (this.hasExpired(items[i]) && this.perishWhenExpires(items[i])) {
      this.runOutOfValue(items[i]);
    }

    if (this.hasExpired(items[i]) && !this.perishWhenExpires(items[i])) {
      this.decreaseQuality(items[i]);
    }

  }
  return items;
}

GildedRose.hasToDecreaseQuality = function(item){
  return "Aged Brie" != item.name && "Backstage passes to a TAFKAL80ETC concert" != item.name && "Sulfuras, Hand of Ragnaros" != item.name;
}

GildedRose.increaseDailyQuality = function(item){
  this.increaseQuality(item);

  if (("Aged Brie" == item.name || "Backstage passes to a TAFKAL80ETC concert" == item.name ) && item.sellIn < 11){
    this.increaseQuality(item);
    if(item.sellIn < 6){
      this.increaseQuality(item);
    }
  }
}

GildedRose.increaseQuality = function(item){
  if (item.quality < 50) {
    item.quality++;
  }  
}

GildedRose.decreaseQuality = function(item){
  if(item.quality > 0){
    item.quality--;
  }
}

GildedRose.runOutOfValue = function(item){
  item.quality = 0;
}

GildedRose.hasToDecreaseSellIn = function(item){
  return "Sulfuras, Hand of Ragnaros" != item.name;
}

GildedRose.decreaseSellIn = function(item){
  item.sellIn--;
}

GildedRose.hasExpired = function(item){
  return item.sellIn < 0;
}

GildedRose.perishWhenExpires = function(item){
  return "Aged Brie" == item.name || "Backstage passes to a TAFKAL80ETC concert" == item.name || "Sulfuras, Hand of Ragnaros" == item.name;
}

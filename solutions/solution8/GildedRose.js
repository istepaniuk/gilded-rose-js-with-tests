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
GildedRose.createEnhancedItem = function(item) {
  var enhancedItem = Object.create(item);
  enhancedItem.update = function() {
    if (isSulfuras(item)) {
      return;
    }
    if (isIncreasingQualityItem(item)) {
      updateIncreasingQualityItem(item);
      return;
    }
    updateNormalItem(item);
    return;

    function isAgedBrie (item) {
      return "Aged Brie" == item.name;
    }

    function isBackstagePass(item) {
      return "Backstage passes to a TAFKAL80ETC concert" == item.name;
    }

    function isSulfuras (item) {
      return "Sulfuras, Hand of Ragnaros" == item.name;
    }

    function increaseQuality (item) {
      var maximumQuality = 50;
      if (item.quality < maximumQuality) {
        item.quality += 1;
      }
    }

    function decreaseQuality (item) {
      var minimumQuality = 0;

      if (item.quality > minimumQuality) {
        item.quality -= 1;
      }
    }

    function decreaseSellin (item) {
      item.sellIn -= 1;
    }

    function isIncreasingQualityItem (item) {
      return isAgedBrie(item) || isBackstagePass(item);
    }

    function updateIncreasingQualityItem (item) {
      var increaseBackstagePassQualityByThreeLimit = 5;
      var increaseBackstagePassQualityByTwoLimit = 10;

      decreaseSellin(item);
      increaseQuality(item);
      if (item.sellIn < increaseBackstagePassQualityByThreeLimit) {
        increaseQuality(item);
      }
      if (item.sellIn < increaseBackstagePassQualityByTwoLimit) {
        increaseQuality(item);
      }
      if (item.sellIn < 0) {
        item.quality = 0;
      }
    }

    function updateNormalItem (item) {
      decreaseSellin(item);
      decreaseQuality(item);
      if (item.sellIn < 0) {
        decreaseQuality(item);
      }
    }
  };
  return enhancedItem;
};

GildedRose.updateQuality = function (items) {
  function update_item (item) {
    var enhancedItem = GildedRose.createEnhancedItem(item);
    enhancedItem.update();
  }

  for (var i = 0; i < items.length; i++) {
    update_item(items[i]);
  }
  return items;
};

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



function isAgedBrie(item) {
    return "Aged Brie" == item.name;
}

function isSulfura(item) {
    return "Sulfuras, Hand of Ragnaros" == item.name;
}

function isBackstagePass(item) {
    return "Backstage passes to a TAFKAL80ETC concert" == item.name;
}

function incrementQuality(item) {
    return item.quality + 1
}

function decrementQuality(item) {
    return item.quality - 1
}

function decrementSellIn(item) {
    return item.sellIn - 1
}

function updateQualityItem(item) {

    if (!isAgedBrie(item) && !isBackstagePass(item)) {
      if (item.quality > MIN_QUALITY) {
        if (!isSulfura(item)) {
          item.quality = decrementQuality(item)
        }
      }
    } else {
      if (item.quality < MAX_QUALITY) {
        item.quality = incrementQuality(item)
        if (isAgedBrie(item)) {
            if (item.sellIn < SECOND_DATE) {
              item.quality = incrementQuality(item)
            }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if (isAgedBrie(item)) {
            if (item.sellIn < FIRST_DATE) {
              item.quality = incrementQuality(item)
            }
        }
        if (isBackstagePass(item)) {
          if (item.sellIn < FIRST_DATE) {
            // See revision number 2394 on SVN.
            if (item.quality < MAX_QUALITY) {
              item.quality = incrementQuality(item)
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < SECOND_DATE) {
            if (item.quality < MAX_QUALITY) {
              item.quality = incrementQuality(item)
            }
          }
        }
      }
    }
    if (!isSulfura(item)) {
      item.sellIn = decrementSellIn(item);
    }
    if (item.sellIn < MIN_REMAINING_DAYS) {
      if (!isAgedBrie(item)) {
        if (!isBackstagePass(item)) {
          if (item.quality > MIN_QUALITY) {
            if (!isSulfura(item)) {
              item.quality = decrementQuality(item)
            }
          }
        } else {
          item.quality = MIN_QUALITY;
        }
      } else {
        if (item.quality < MAX_QUALITY) {
          item.quality = incrementQuality(item)
        }
        if (isAgedBrie(item) && item.sellIn <= MIN_REMAINING_DAYS)
            item.quality = MIN_QUALITY;
        }
    }

}

var MIN_QUALITY = 0;
var MAX_QUALITY = 50;
var FIRST_DATE = 11;
var SECOND_DATE = 6;
var MIN_REMAINING_DAYS = 0;

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
        updateQualityItem(items[i])
  }

  return items;
};


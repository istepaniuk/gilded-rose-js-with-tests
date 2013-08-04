describe("GildedRose shop manager", function () {
    var items;
    
    beforeEach(function(){
        items = [];
    });
    
    it("decreases by 1 the quality and remaining sellIn days of regular items", function () {
        items.push(new Item("+5 Dexterity Vest", 10, 20));
        items.push(new Item("Conjured Mana Cake", 3, 6));
        
        items = GildedRose.updateQuality(items);
    
        var expected = [
            {sellIn:9 , quality:19},
            {sellIn:2 , quality:5 }
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });
    
    it("increases the quality by one, of the products that get better as they age", function () {
        items.push(new Item("Aged Brie", 20, 30));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));
        
        items = GildedRose.updateQuality(items);
    
        var expected = [
            {sellIn:19, quality:31 },
            {sellIn:19, quality:31},
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });
    
    it("increases the quality by two, of the products that get better as they age, when there are 10 days or less left", function () {
        items.push(new Item("Aged Brie", 10, 34));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30));
        
        items = GildedRose.updateQuality(items);
    
        var expected = [
            {sellIn:9, quality:36 },
            {sellIn:7, quality:32},
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });
    
    it("increases the quality by three, of the products that get better as they age, when there are 5 days or less left", function () {
        items.push(new Item("Aged Brie", 4, 11));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15));
        
        items = GildedRose.updateQuality(items);
    
        var expected = [
            {sellIn:3, quality:14 },
            {sellIn:4, quality:18},
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });

    it("decreases the quality and the sellIn of the produts twice as fast when we have passed the sellIn date", function () {
        items.push(new Item("+5 Dexterity Vest", 0, 20));
        items.push(new Item("Conjured Mana Cake", 0, 6));

        items = GildedRose.updateQuality(items);
        
        var expected = [
            {sellIn:-1, quality:18},
            {sellIn:-1, quality:4 }
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });
        
    it("updates the quality of Backstage Passes and Brie to zero when we have passed the sellIn date", function () {
        items.push(new Item("Aged Brie", 0, 20));
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));

        items = GildedRose.updateQuality(items);
        
        var expected = [
            {sellIn:-1, quality:0 },
            {sellIn:-1, quality:0 },
        ];
        expected.forEach(function (testCase, idx) {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });
        
    it("does not alter the quality of 'Sulfuras', wich is always 80", function () {
        items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
        
        items = GildedRose.updateQuality(items);
        
        expect(items[0].quality).toBe(80);
        expect(items[0].sellIn).toBe(0);
    });
    
    it("does not increase quality over 50", function () {
        items.push(new Item("Aged Brie", 4, 49));
        
        items = GildedRose.updateQuality(items);
    
        expect(items[0].quality).toBe(50);
        expect(items[0].sellIn).toBe(3);
    });
});

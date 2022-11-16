var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const items = [
      new Item("Spoon of the Death", -4, 20),
      new Item("Elixir of the Mongoose", 0, 7),
      new Item("Overpowered shield", -3, 3),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(-5);
    expect(items[0].quality).toEqual(18);
    expect(items[1].sellIn).toEqual(-1);
    expect(items[1].quality).toEqual(5);
    expect(items[2].sellIn).toEqual(-4);
    expect(items[2].quality).toEqual(1);
  });

  
  it("The Quality of an item is never negative", () => {
    const items = [
      new Item("Spoon of the Death", 8, 0),
      new Item("Elixir of the Mongoose", 3, 0),
      new Item("Overpowered shield", 17, 0),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(7);
    expect(items[0].quality).toEqual(0);
    expect(items[1].sellIn).toEqual(2);
    expect(items[1].quality).toEqual(0);
    expect(items[2].sellIn).toEqual(16);
    expect(items[2].quality).toEqual(0);
  });
  

  it("'Aged Brie' actually increases in Quality the older it gets", () => {
    const items = [
      new Item("Aged Brie", 4, 11),
      new Item("Aged Brie", 17, 25),
      new Item("Aged Brie", 8, 3),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(3);
    expect(items[0].quality).toEqual(12);
    expect(items[1].sellIn).toEqual(16);
    expect(items[1].quality).toEqual(26);
    expect(items[2].sellIn).toEqual(7);
    expect(items[2].quality).toEqual(4);
  });

  it("'The Quality of an item is never more than 50", () => {
    const items = [
      new Item("Aged Brie", 9, 50),
      new Item("Aged Brie", 17, 50),
      new Item("Aged Brie", 20, 50),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(8);
    expect(items[0].quality).toEqual(50);
    expect(items[1].sellIn).toEqual(16);
    expect(items[1].quality).toEqual(50);
    expect(items[2].sellIn).toEqual(19);
    expect(items[2].quality).toEqual(50);
  });

  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", () => {
    const items = [
      new Item("Sulfuras, Hand of Ragnaros", null, 80),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(null);
    expect(items[0].quality).toEqual(80);
    expect(items[1].sellIn).toEqual(0);
    expect(items[1].quality).toEqual(80);
  });  

  it("'Backstage passes', like aged brie, increases in Quality as its SellIn value approaches", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 13, 21),
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 12),
      new Item("Backstage passes to a TAFKAL80ETC concert", 25, 3),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(12);
    expect(items[0].quality).toEqual(22);
    expect(items[1].sellIn).toEqual(7);
    expect(items[1].quality).toEqual(14);
    expect(items[2].sellIn).toEqual(24);
    expect(items[2].quality).toEqual(4);
  }); 

  it("Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 21),
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 12),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(24);
    expect(items[1].sellIn).toEqual(7);
    expect(items[1].quality).toEqual(14);
    expect(items[2].sellIn).toEqual(4);
    expect(items[2].quality).toEqual(13);
  }); 

  it("Quality drops to 0 after the concert", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 7),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 32),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
  
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();  
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
    expect(items[1].sellIn).toEqual(-1);
    expect(items[1].quality).toEqual(0);
    expect(items[2].sellIn).toEqual(-1);
    expect(items[2].quality).toEqual(0);
  }); 

// We have recently signed a supplier of conjured items. This requires an update to our system:

// 	- "Conjured" items degrade in Quality twice as fast as normal items
});
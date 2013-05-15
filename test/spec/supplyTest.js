var AppRouter = Backbone.Router.extend({
  initialize : function() {
    this.logCollection = new LogCollection();
  }
});
window.app = new AppRouter();
var itemData = [{
  'id' : '0',
  'name' : 'ItemA',
  'quantity' : '10',
  'description' : 'ItemA Description',
  'categoryId' : '1',
  'vendorId' : '1',
  'emailThreshold' : '5'
}, {
  'id' : '1',
  'name' : 'ItemB',
  'quantity' : '5',
  'description' : 'ItemB Description',
  'categoryId' : '1',
  'vendorId' : '1',
  'emailThreshold' : '2'
}];

var itemDataBad = [{
  'id' : '0',
  'name' : '<script>alert("die");</script>',
  'quantity' : 'asdfasd',
  'description' : 'ItemA Description',
  'categoryId' : '0',
  'vendorId' : '0',
  'emailThreshold' : '5'
}, {
  'id' : '1',
  'name' : 'ItemB',
  'quantity' : '5',
  'description' : 'ItemB Description',
  'categoryId' : '0',
  'vendorId' : '0',
  'emailThreshold' : '2'
}];

var categoryData = [{
  'id' : '0',
  'categoryName' : 'Supplies',
  'consumable' : '1'
}];

var vendorData = [{
  'id' : '0',
  'vendorName' : 'OfficeMax',
  'url' : 'www.officemax.com'
}];

var goodUser = [{
  'id' : 1,
  'username' : 'Johnson',
  'password' : 'af58bee56989a9a57cb42045a6034a56',
  'roleId' : '',
  'access_token' : '1'
}];

var badUser = [{
  'id' : 2,
  'username' : 'Johnson',
  'password' : 'af58bee56989a9a57cb42045a6034a56',
  'roleId' : '',
  'access_token' : null
}];

describe("Data Storage", function() {

  describe("Get Item Data", function() {

    beforeEach(function() {
      this.itemCollection = new ItemCollection(itemData);
    });

    it("creates items from data", function() {
      expect(this.itemCollection.length).toEqual(2);
    });
  });

  describe("Get Category Data", function() {

    beforeEach(function() {
      this.categoryCollection = new CategoryCollection(categoryData);
    });

    it("creates categories from data", function() {
      expect(this.categoryCollection.length).toEqual(1);
    });
  });

  describe("Get Vendor Data", function() {

    beforeEach(function() {
      this.vendorCollection = new VendorCollection(vendorData);
    });

    it("creates vendors from data", function() {
      expect(this.vendorCollection.length).toEqual(1);
    });
  });
});

describe("Adjustments", function() {
  beforeEach(function() {
    this.item = new Item(itemData[0]);
    window.user = new User(goodUser);
  });

  it("adjusts quantity of item models", function() {
    this.item.adjustQty(3);
    expect(this.item.get('quantity')).toEqual(13);
  });
});

describe("Validation Section", function() {

  describe("String Validate is Valid", function() {
    beforeEach(function() {
      this.item = new Item(itemData[0]);
    });

    it("validates a string", function() {
      expect(this.item.strValidate('paper')).toEqual(false);
    });
  });

  describe("String Validate is Not Valid", function() {
    beforeEach(function() {
      this.item = new Item(itemDataBad[0]);
    });

    it("validates a string", function() {
      expect(this.item.strValidate('<script>alert("die");</script>')).toEqual(true);
    });
  });

  describe("Number Validate is Valid", function() {
    beforeEach(function() {
      this.item = new Item(itemData[0]);
    });

    it("validates an integer", function() {
      expect(this.item.numValidate('8')).toEqual(false);
    });
  });

  describe("Number Validate is Not Valid", function() {
    beforeEach(function() {
      this.item = new Item(itemDataBad[0]);
    });

    it("validates an integer", function() {
      expect(this.item.numValidate('ab')).toEqual(true);
    });
  });

  describe("Validate Good ItemData 1", function() {
    beforeEach(function() {
      this.item = new Item(itemData[0]);
    });

    it("validates the item model", function() {
      expect(this.item.isValid()).toEqual(true);
    });
  });

  describe("Validate Good ItemData 2", function() {
    beforeEach(function() {
      this.item = new Item(itemData[1]);
    });

    it("validates the item model", function() {
      expect(this.item.isValid()).toEqual(true);
    });
  });

  describe("Validate Bad ItemData 1", function() {
    beforeEach(function() {
      this.item = new Item(itemDataBad[0]);
    });

    it("validates the item model", function() {
      expect(this.item.isValid()).toEqual(false);
    });
  });

  describe("Validate Bad ItemData 2", function() {
    beforeEach(function() {
      this.item = new Item(itemDataBad[1]);
    });

    it("validates the item model", function() {
      expect(this.item.isValid()).toEqual(false);
    });
  });

});


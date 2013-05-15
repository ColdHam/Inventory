window.Item = Backbone.Model.extend({
  defaults: {
    'id':null,
    'name':'',
    'quantity':'',
    'description':'',
    'categoryId':'',
    'vendorId':'',
    'categoryName':'',
    'vendorName':'',
    'vendorUrl':''
  },
  
  urlRoot: 'api/'
});

window.ItemCollection = Backbone.Collection.extend({
  model: Item,
  url: 'api/'
});

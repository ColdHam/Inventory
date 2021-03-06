window.Item = Backbone.Model.extend({
  defaults: {
    "id" : null,
    "name" : "",
    "quantity" : "",
    "description" : "",
    "categoryId" : "",
    "vendorId" : "",
    "category" : "",
    "vendor" : "",
  },
  
  urlRoot: "api/"
});

window.ItemCollection = Backbone.Collection.extend({
  model : Item,
  url: "api/"
});

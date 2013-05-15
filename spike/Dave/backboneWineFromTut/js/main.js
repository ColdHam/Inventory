Backbone.View.prototype.close = function() {
  console.log('Closing view' + this);
  
  if (this.beforeClose) {
    this.beforeClose();
  }
  
  this.remove();
  this.unbind();
}

var AppRouter = Backbone.Router.extend({
  
  initialize: function () {
    $('#header').html(new HeaderView().render());
  },
  
  routes: {
    "":"list",
    "items/new": "newItem",
    "items/:id": "itemDetails"
  },
  
  list: function () {
    this.before(function () {
      this.showView('#content', new StartView());
    });
  },
  
  itemDetails: function (id) {
    this.before(function () {
      var item = this.itemList.get(id);
      this.showView('#content', new ItemView({
        model: item
      }));
    });
  },
  
  newItem: function() {
    this.before(function () {
      this.showView('#content', new ItemView({
        model: new Item()
      }));;
    })
  },
  
  showView: function (selector, view) {
    if (this.currentView) this.currentView.close();
    
    $(selector).html(view.render());
    this.currentView = view;
    
    return view;
  },
  
  before: function (callback) {
    if (this.itemList) {
      if (callback) callback.call(this);
    } else {
      this.itemList = new ItemCollection();
      var self = this;
      this.itemList.fetch({
        success: function () {
          var itemlist = new ItemListView({
            model: self.itemList
          }).render();
          $('#sidebar').html(itemlist);
          if (callback) callback.call(self);
        }
      });
    }
  }
});

tpl.loadTemplates(['header', 'item-details', 'item-list-item', 'start'], function() {
  app = new AppRouter();
  Backbone.history.start();
})

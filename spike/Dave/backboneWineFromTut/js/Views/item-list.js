window.ItemListView = Backbone.View.extend({
  
  tagName: 'ul',
  
  initialize: function() {
    var self = this;
    
    this.model.bind( 'reset', this.render, this);
    
    this.model.bind('add', function(item) {
      $(self.el).append(new ItemListItemView({model: item}).render());
    });
  },
  
  render: function() {
    _.each(this.model.models, function(item) {
      $(this.el).append(new ItemListItemView({model : item}).render());
    }, this);
    
    return this.el;
  }
});

window.ItemListItemView = Backbone.View.extend({
  
  tagName: 'li',
  
  initialize : function() {
    this.template = _.template( tpl.get('item-list-item'));
    
    this.model.bind('change', this.render(), this);
    this.model.bind('destroy',this.close(), this);
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    
    return this.el;
  }
});

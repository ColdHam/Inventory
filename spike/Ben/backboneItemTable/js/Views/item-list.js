window.count = 1;
window.ItemListView = Backbone.View.extend({
  
  tagName: 'table',
  
  initialize: function() {
    var self = this;
    
    this.model.bind( 'reset', this.render, this);
    
    this.model.bind('add', function(item) {
      $(self.el).append(new ItemListItemView({model: item}).render(count));
      count++;
    });
  },
  
  render: function() {
    _.each(this.model.models, function(item) {
      $(this.el).append(new ItemListItemView({model : item}).render(count));
      count++;
    }, this);
    
    return this.el;
  }
});

window.ItemListItemView = Backbone.View.extend({
  
  tagName: 'tr',
  
  initialize : function() {
    this.template = _.template( tpl.get('item-table'));
    
    this.model.bind('change', this.render(), this);
    this.model.bind('destroy',this.close(), this);
  },
  
  render: function(count) {
    if (count % 2 === 0) {
      $(this.el).addClass('even');
    }
    $(this.el).html(this.template(this.model.toJSON()));
    
    return this.el;
  }
});

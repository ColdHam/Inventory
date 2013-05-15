window.ItemView = Backbone.View.extend({
  
  //tagName: 'div',
  
  initialize: function(){
    this.template = _.template( tpl.get('item-details'));
    
    this.model.bind('change', this.render, this);
    
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    
    return this.el;
  },
  
  event: {
    'click .save' : 'saveItem',
    'click .delete' : 'deleteItem'
  },
  
  saveItem : function() {
    this.model.set({
      name: $('#name').val(),
      quantitiy: $('#quantity').val(),
      description: $('#description').val(),
      categoryId: $('#categoryId').val(),
      vendorId: $('#vendorId').val()
    });
    
    if (this.mode.isNew()) {
      var self = this;
      
      app.itemList.create( this.model, {
        success: function() {
          app.navigate('api/' + self.model.id, false);
        }
      });
    } else {
      this.model.save();
    }
    return false;
  },
  
  deleteItem : function() {
    this.model.destroy({
      success: function() {
        alert('Item was deleted successfully');
        window.history.back();
      }
      
    });
    
  }
  
});

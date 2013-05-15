window.ItemView = Backbone.View.extend({
  
  tagName:"div",
  
  initialize: function() {
    
    this.template = _.template( tpl.get('item-details') );
    this.model.bind( 'change', this.render, this);
  },
  
  render: function() {
    $(this.el).html( this.template(this.model.toJSON()) );
    return this.el;
  },
  
  events: {
    'click .save':'saveItem',
    'click .delete':'deleteItem'
  },
  
  saveItem: function() {
    this.model.set({
      name: $('#name').val(),
      quantity: $('#quantity').val(),
      description: $('#description').val(),
      categoryId: $('#categoryId').val(),
      vendorId: $('#vendorId').val()    
    });
    
    if ( this.model.isNew() ) {
      var self = this;
      app.itemList.create( this.model, {
        success: function() {
            alert('create success');
          app.navigate( 'items/' + self.model.id, false);
        },
        error: function() {
          alert('create error');
        }
      });  
    } else {
      //alert('not new');
      this.model.save();
    }
    
    return false;
  },
  
  
  deleteItem: function() {
    this.model.destroy({
      success: function(){
        alert('Item was deleted successfully');
        window.history.back();
      }
    });
    
    return false;
  }
  
});

var Appointment = Backbone.Model.extend({
  defaults: {
    title: 'Checkup',
    date: new Date()
  }
});
var appointment = new Appointment({title : 'Appointment'});
appointment.set({title : 'My backboner hurts!'});
var AppointmentView = Backbone.View.extend({
  render: function(){
    var html = '<ul><li>' + this.model.get('title') + '</li></ul';
    $(this.el).html(html);
  }
});
var appointmentView = new AppointmentView({model : appointment});
appointmentView.render();
//console.log(appointmentView.el);
$('#app').html(appointmentView.el);



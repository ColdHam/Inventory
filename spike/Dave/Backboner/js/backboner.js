var Appointment = Backbone.Model.extend({
  urlRoot : "./api/appointments",
  defaults : {
    "title": "checkup",
    "date": new Date()
  }
});
var appointment = new Appointment({id: 1});
appointment.fetch();
var AppointmentView = Backbone.View.extend({
  render: function(){
  var html = '<li>' + this.model.get('title') + '</li>';
  $(this.el).html(html);
  }
});
var appointmentView = new AppointmentView({model: appointment});
//appointment.set({title: 'Backboner massage'});
appointmentView.render();
console.log(appointmentView.el);

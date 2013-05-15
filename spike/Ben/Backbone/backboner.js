var Appointment = Backbone.Model.extend({
  defaults: {
    title: "Go Fuck Yourself",
    date: getDate()
  }
});

var appointment = new Appointment({title: "Fuck"});

function getDate(){
  return new Date();
}

var AppointmentView = Backbone.View.extend({
  render: function(){
    var html = '<li>' + this.model.get('title') + '</li>' + '<li>' + this.model.get('date') + '</li>';
    $(this.el).html(html);
  }
});

var appointmentView = new AppointmentView({ model: appointment });

appointment.set({title: "My Backboner Hurts"});

appointmentView.render();

console.log(appointmentView.el);


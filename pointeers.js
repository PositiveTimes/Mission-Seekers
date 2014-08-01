Missions = new Meteor.Collection("missions");
Router.map(function() {
  this.route('home', {path: '/'});
  this.route('missions', {path: '/missions'});
  this.route('users', {path: '/users'});
  this.route('profile', {
    path: '/users/:_id',
    data: function() { return Meteor.users.findOne(this.params._id); }
  });
});

if (Meteor.isClient) {
  Template.users.user=function () {
    return  Meteor.users.find().fetch();
  };
  Template.missionlist.mission  = function () {
    return Missions.find().fetch();
  };
// makes new missions that show up on the page//
  Template.newMission.events({
    "click .new-mission-submit": function () {
      var title = $(".new-mission-title").val();
      var description = $(".new-mission-description").val();
      Missions.insert({title: title, description: description});
        $(".new-mission-title").val("");
        $(".new-mission-description").val("");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

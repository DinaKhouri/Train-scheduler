$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDS78_zrsJ7UywWVDVmB5gpbpTo3mR7kX8",
    authDomain: "train-activity-8c1be.firebaseapp.com",
    databaseURL: "https://train-activity-8c1be.firebaseio.com",
    projectId: "train-activity-8c1be",
    storageBucket: "train-activity-8c1be.appspot.com",
    messagingSenderId: "791509689454"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Click events to record user input
  $("#submit").on("click", function(event) {
    event.preventDefault();
    //inputs
    var name = $("#name")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();
    var firstTrain = $("#firstTrain")
      .val()
      .trim();

    var newTrainInfo = {
      name,
      destination,
      frequency,
      firstTrain
    };
    // Pushes the train input to the database
    database.ref().push(newTrainInfo);

    //cleare inputs
    $("#name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#firstTrain").val("");
  });

  database.ref().on("child_added", function(event) {
    // calculations for next train and minutes away
    //time now
    var TimeNow = moment();
    console.log(TimeNow);
    //first train time input
    var firstTrainVal = event.val().firstTrain;
    var randomFormat = "LT";
    var converted = moment().diff(moment(firstTrainVal, randomFormat));
    console.log(converted);

    // diff between current time and first train time in minutes for easy math calculations
    var difference = moment().diff(moment(converted), "minutes");
    console.log(difference);

    // minutes till next train
    var dif = difference % event.val().frequency;
    console.log(frequency);
    console.log(dif);

    var minutesLeft = event.val().frequency - dif;
    console.log(minutesLeft);

    var nextTrain = moment().add(minutesLeft, "minutes");
    var nextTrainMinutes = moment(nextTrain).format("HH:mm");
    console.log(moment(nextTrain).format("HH:mm"));

    $("#train-list").append(
      "<tr><td>" +
        event.val().name +
        "</td><td>" +
        event.val().destination +
        "</td><td>" +
        event.val().frequency +
        "</td><td>" +
        event.val().firstTrain +
        "</td><td>" +
        nextTrainMinutes +
        "</td><td>" +
        minutesLeft +
        "</td></tr>"
    );
  });
});

var config = {
    apiKey: "AIzaSyAtstZ5yS_0S7dQuK4E4TQzO3zlwtnibcE",
    authDomain: "train-data-48cd6.firebaseapp.com",
    databaseURL: "https://train-data-48cd6.firebaseio.com",
    projectId: "train-data-48cd6",
    storageBucket: "train-data-48cd6.appspot.com",
    messagingSenderId: "74346553390"
  };
  firebase.initializeApp(config);
  var database= firebase.database();

// When the user clicks the "Add Train button it will update the first table on webpage"
  $(document).on("click", "#addTrain", function(event){
      event.preventDefault();
      console.log("Data-Recived")
// make user Inputs into variables
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var time = $("#militaryTime").val().trim();
var frequency = $("#frequency").val().trim();
// var arrival = moment().diff(moment()) //use moment.js here to get times for trains. 
// add variable for minutes away.

database.ref("trainData").push({
  trainName: trainName,
  destination: destination,
  militaryTime: time,
  frequency: frequency,
  // arrivalTime: 
// still more to add here
})
  })

database.ref("trainData").on("child_added", function(snapshot) {
  var trainX = snapshot.val().trainName;
  var destinationX = snapshot.val().destination;
  var timeX = snapshot.val().militaryTime;
  var frequencyX = snapshot.val().frequency;

  var newRow = $("<tr>");
  var newTrain = $("<td>" + trainX + "</td>");
  var newDestination = $("<td>" + destinationX + "</td>");
  var newTime = $("<td>" + timeX + "</td>");
  var newFrequency = $("<td>" + frequencyX + "</td>");

  newRow.append(newTrain).append(newDestination).append(newFrequency).append(newTime);
  $("#tableBody").append(newRow);
})
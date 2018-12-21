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
// =====================================================
var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// local holder for train Data and pushes info to Firebase
database.ref("trainData").push({
  trainName: trainName,
  destination: destination,
  militaryTime: time,
  frequency: frequency,
  nextTrain: nextTrain,

})
  })

database.ref("trainData").on("child_added", function(snapshot) {
  var trainX = snapshot.val().trainName;
  var destinationX = snapshot.val().destination;
  var timeX = snapshot.val().militaryTime;
  var frequencyX = snapshot.val().frequency;
  var nextTrainX = snapshot.val().frequency;

  var newRow = $("<tr>");
  var newTrain = $("<td>" + trainX + "</td>");
  var newDestination = $("<td>" + destinationX + "</td>");
  var newTime = $("<td>" + timeX + "</td>");
  var newFrequency = $("<td>" + frequencyX + "</td>");
  var nextTrain = $("<td>" + nextTrainX + "</td>");

  newRow.append(newTrain).append(newDestination).append(newFrequency).append(newTime).append(nextTrain);
  $("#tableBody").append(newRow);
})
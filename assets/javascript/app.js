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
  var nextTrain;

// When the user clicks the "Add Train button it will update the first table on webpage"
  $(document).on("click", "#addTrain", function(event){
      event.preventDefault();
      console.log("Data-Recived")
// make user Inputs into variables
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var time = $("#militaryTime").val().trim();
var frequency = $("#frequency").val().trim();

// Calculations
// =====================================================
var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
console.log("First Conversion: ", firstTimeConverted);

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
nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
nextTrain = moment(nextTrain).format("hh:mm");

// local holder for train Data and pushes info to Firebase
database.ref("trainData").push({
  trainName: trainName,
  destination: destination,
  militaryTime: time,
  frequency: frequency,
  nextTrain: nextTrain,
  minutesTillArrival: tMinutesTillTrain 

})
  })

database.ref("trainData").on("child_added", function(snapshot) {
  var trainX = snapshot.val().trainName;
  var destinationX = snapshot.val().destination;
  // var timeX = snapshot.val().militaryTime;
  var frequencyX = snapshot.val().frequency;
  var nextTrainX = snapshot.val().nextTrain;
  var tMinutesTillTrain = snapshot.val().minutesTillArrival;  

  var newRow = $("<tr>");
  var newTrain = $("<td>" + trainX + "</td>");
  var newDestination = $("<td>" + destinationX + "</td>");
  var newFrequency = $("<td>" + frequencyX + "</td>");
  var nextTrain = $("<td>" + nextTrainX + "</td>");
  var minutesTillArrival = $("<td>" + tMinutesTillTrain + "</td>");

console.log("NextTrain: ", nextTrain);
  newRow.append(newTrain).append(newDestination).append(newFrequency).append(nextTrain).append(minutesTillArrival);
  $("#tableBody").append(newRow);
})
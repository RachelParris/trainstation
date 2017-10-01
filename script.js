/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKq7IUUq6fUsNu5tIEkj2K1K0iNSuwF_0",
    authDomain: "trains-4d48e.firebaseapp.com",
    databaseURL: "https://trains-4d48e.firebaseio.com",
    projectId: "trains-4d48e",
    storageBucket: "trains-4d48e.appspot.com",
    messagingSenderId: "595885975860"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var firstTime = $("#start-input").val().trim();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainStart = moment().format(firstTime);
  var trainFrequency = $("#frequency-input").val().trim();
  console.log(trainStart)

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDes,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Alert
  // alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Prettify the employee start
  // var trainStartMoment = moment.unix(trainStart).format("HH:mm");
  var trainStartMoment = moment().format("HH:mm");
  // console.log(trainStartMoment);
 

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(trainStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * trainFreq;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
  trainFrequency + "</td><td>" + 'empMonths' + "</td><td>" + 'math' + "</td><td>" + 'empBilled' + "</td></tr>");
});

  var now = moment().format("HH:mm");
  // console.log(now);




// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
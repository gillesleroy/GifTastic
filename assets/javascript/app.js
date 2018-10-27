
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBKEcxyTWl_UVp1bFdK0Wi49exXF-6nJ9k",
        authDomain: "testgl3-e8e4f.firebaseapp.com",
        databaseURL: "https://testgl3-e8e4f.firebaseio.com",
        projectId: "testgl3-e8e4f",
        storageBucket: "testgl3-e8e4f.appspot.com",
        messagingSenderId: "661554547530"
      };
    
       firebase.initializeApp(config);
    
       var database = firebase.database();


// Initial list of topic buttons
var topics = [
    // "Beatles", 
    // "Rolling+Stones", 
    // "Deep+Purple"
];

// database.ref().set({
//     names: topics
//     });   

//Refresh the list of buttons from the array
function renderButtons(savedButtons) {
    $("#buttons-view").empty();
    // Looping through the array of topics
    for (var i = 0; i < savedButtons.length; i++){
        $("#buttons-view").append(
                                addObj({
                                    type:  "button"
                                    ,class: "topic"
                                    ,text: savedButtons[i]
                                    ,attr: [
                                            { 
                                                a: "topic-name", v: savedButtons[i]}
                                            ]
                                    }
                                )

        )}

    // $("#buttons-view").append(addObj({
    //                     type:  "button"
    //                     ,class: "topic"
    //                     ,text: savedButton
    //                     ,attr: [
    //                             { 
    //                                 a: "topic-name", v: savedButton}
    //                             ]
    //                     }
    //                 ));   
  }

// Call the API and return responses in html elements
function displayTopicInfo() {
    var numCols = 0;
    var limit = 10;
    var topic = $(this).attr("topic-name");
    var apiKey = "CQBA758YfOGNEtIK6IKjzXVOwjToS6uN";
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
// console.log("topic="+topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
      +"q=" + topic
      +"&limit="+limit 
      +"&api_key="+apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;

      $("#imgReturned").empty();

      for (var i=0;i<results.length;i++)
            {
            var imageUrl = results[i].images.fixed_height_still.url;
            var imageUrlAnim = imageUrl.replace("_s.",".");
            var imageRating = results[i].rating;      
   
            if (numCols ===0)
               {
                var divRow = addObj({
                    type:  "div"
                    ,class: "row"
                    ,attr: [
                            { a: "id", v: "divrow"}
                            ]
                    });
               }
            var divTopic = addObj({
                                    type:  "div"
                                    ,class: "col-lg-4"
                                    ,attr: [
                                            { a: "id", v: "divTopic"}
                                            ]
                                    });
            divTopic.append(addObj(
                {
                    type: "p"
                   ,class: "pClass"
                   ,text:  "Rating: "+imageRating
                   ,attr: [ 
                            { a: "id", v: "pTopic"}
                        //    ,{ a: "text", v: imageRating}
                          ]
                }));

            divTopic.append(
                addObj(
                    {type: "img"
                         ,class: "imgClass"
                         ,attr: [
                            { a: "src", v: imageUrl},
                            { a: "alt", v: topics[i]},
                            { a: "image-still", v: imageUrl},
                            { a: "image-anim", v: imageUrlAnim},
                            { a: "image-state", v: "still"}
                            ]
                         }
                )      
            );   
            $(divRow).prepend(divTopic);

            if (numCols === 0)    
            {
                $("#imgReturned").prepend(
                    divRow
                   );                       
            }     
            numCols++;
            if (numCols > 3)
            {
                numCols = 0;
            }         
        }

    });
  };

// Click on an image changes its state
function imgChangeState () {
    var state = $(this).attr("image-state");
    // console.log(state);
    if (state === "still"){
      $(this).attr("src",$(this).attr("image-anim"));
      $(this).attr("image-state","animate");
    //   state = $(this).attr("image-state");
    // console.log(state);
    }
    else{
     $(this).attr("src",$(this).attr("image-still"));
     $(this).attr("image-state","still");  
    //   state = $(this).attr("image-state");
    // console.log(state);          
    }
}

// Click on Submit adds a button
$("#add-button").on("click", function(event) {
    event.preventDefault();
    var topicName = $("#topic-input").val().trim();
    if (topicName != "" )
    {
    topics.push(topicName);
    // database.ref().set({
    //     name: topicName
    //   });
    database.ref().set({
    names: topics
    });      
    renderButtons(topics);
    }
});

//  renderButtons();

 // Firebase watcher + initial loader HINT: .on("value")
 database.ref().on("value", 
 function(snapshot) {
 // console.log(snapshot.val());
 // console.log(name);

 renderButtons(snapshot.val().names);
//  $("#buttons-view").append(addObj({
//     type:  "button"
//     ,class: "topic"
//     ,text: snapshot.val().name
//     ,attr: [
//             { 
//                 a: "topic-name", v: snapshot.val().name}
//             ]
//     }
//     ));   

//  $("#name-display").text(snapshot.val().name);
//  $("#email-display").text(snapshot.val().email);
//  $("#age-display").text(snapshot.val().age);
//  $("#comment-display").text(snapshot.val().comment);
 },
//   $("#click-value").text(snapshot.val().clickCount);
//   clickCounter = snapshot.val().clickCount;
function(errorObject) {
 console.log("The read failed: " + errorObject.code);
 // alert(snapshot.val().name);


});



// $(document).on("click", "button", displayTopicInfo);
// This works only first time $("button").on("click", displayTopicInfo);
$(document).on("click", ".topic", displayTopicInfo);

// $(".imgClass").on("click", function() {
$(document).on("click", ".imgClass", imgChangeState);



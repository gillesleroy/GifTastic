// Initial list of topic buttons
var topics = [
    "Beatles", 
    "Rolling+Stones", 
    "Deep+Purple"
];

// Adds a new button element with its attributes
// function addButton(buttonText
//                     ,buttonClass
//                     ,buttonAttrName
//                     ,buttonAttrVal) 
//     {
//         var b = $("<button>");
//         b.text(buttonText);
//         b.addClass(buttonClass);
//         b.attr(buttonAttrName, buttonAttrVal);
//         return(b);  
//     }

// Adds a new image element with its attributes
// function addImage(imgClass
//                  ,imgAttr
//                 ) 
//     {
//     var img = $("<img>");
//     // img.attr("src", imgUrl);
//     img.addClass(imgClass);
//     for (var j = 0;j<imgAttr.length;j++)
//      {
//         img.attr(imgAttr[j].a, imgAttr[j].v);
//      }

//     return(img);  
//     }

//Refresh the list of buttons from the array
function renderButtons() {
    $("#buttons-view").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++){
        $("#buttons-view").append(
                                // addButton(topics[i]
                                //            ,"topic"
                                //            ,"topic-name"
                                //            ,topics[i])
                                // );
                                addObj({
                                    type:  "button"
                                    ,class: "topic"
                                    ,text: topics[i]
                                    ,attr: [
                                            { 
                                                a: "topic-name", v: topics[i]}
                                            ]
                                    }
                                )

        )}
  }

// Call the API and return responses in html elements
function displayTopicInfo() {
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
            // var imageUrl = results[i].images.original.url;
            var imageUrl = results[i].images.fixed_height_still.url;
            var imageUrlAnim = imageUrl.replace("_s.",".");
            var imageRating = results[i].rating;      
            // var imageAttr = [
            //     { a: "src", v: imageUrl},
            //     { a: "alt", v: topics[i]},
            //     { a: "image-still", v: imageUrl},
            //     { a: "image-anim", v: imageUrlAnim},
            //     { a: "image-state", v: "still"}
            //    ];
            // var objImg = {type: "img"
            //              ,class: "imgClass"
            //              ,attr: [
            //                 { a: "src", v: imageUrl},
            //                 { a: "alt", v: topics[i]},
            //                 { a: "image-still", v: imageUrl},
            //                 { a: "image-anim", v: imageUrlAnim},
            //                 { a: "image-state", v: "still"}
            //                 ]
            //              }; 
            // var objTopic = {
            //     type:  "div"
            //    ,class: "divClass"
            //    ,attr: [
            //             { a: "id", v: "divTopic"}
            //           ]
            // }   
            // var objP ={
            //     type: "p"
            //    ,class: "pClass"
            //    ,text:  "Rating: "+imageRating
            //    ,attr: [ 
            //             { a: "id", v: "pTopic"}
            //         //    ,{ a: "text", v: imageRating}
            //           ]
            // }                     
            // var divTopic = addObj(objTopic);
            var divTopic = addObj({
                                    type:  "div"
                                    ,class: "divClass"
                                    ,attr: [
                                            { a: "id", v: "divTopic"}
                                            ]
                                    });
            // var p = addObj(objP);
            // var p = addObj(
            // {
            //     type: "p"
            //    ,class: "pClass"
            //    ,text:  "Rating: "+imageRating
            //    ,attr: [ 
            //             { a: "id", v: "pTopic"}
            //         //    ,{ a: "text", v: imageRating}
            //           ]
            // });      
            // var divTopic = $("<div>");
            // var p = $("<p>");
            // p.text("Rating: "+imageRating);
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
            // divTopic.append(
            //                 addImage("imgClass"
            //                 ,imageAttr)      
            //             );  
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
            $("#imgReturned").prepend(
                divTopic
               );                        
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
    topics.push(topicName);
    renderButtons();
});

renderButtons();

// $(document).on("click", "button", displayTopicInfo);
// This works only first time $("button").on("click", displayTopicInfo);
$(document).on("click", ".topic", displayTopicInfo);

// $(".imgClass").on("click", function() {
$(document).on("click", ".imgClass", imgChangeState);



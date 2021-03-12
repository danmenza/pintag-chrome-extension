var boards = [];
var tags = [];
$(document).ready(function() {

  $('.js-example-basic-multiple').select2();

    //make the AJAX request, dataType is set to json
    //meaning we are expecting JSON data in response from the server
    $.ajax({
      type: "GET",
      url: "https://www.pintag.app/api/v1/boards?user_email=dondraper@s.cooper.com&user_token=3kJG55W4tTe5TnqKf1WS",

      //if received a response from the server
      success: function(response) {
        //array of boards
        console.log(response);
        response["boards"].forEach((item) => {
          boards.push(item);
        });
        response["tags"].forEach((item) => {
          tags.push(item);
        });
        var boardNames = [];
        var tagNames = [];
        for (var i = 0; i < boards.length; i++) {//begin for loop
          boardNames.push(`<option value="${boards[i].id}">` + boards[i].name + "</option>")
        }
        for (var i = 0; i < tags.length; i++) {//begin for loop
          tagNames.push(`<option value="${tags[i].id}">` + tags[i].name + "</option>")
        }
        document.getElementById("board").innerHTML = boardNames.join("");
        document.getElementById("tags").innerHTML = tagNames.join("");
      },
    });

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    console.log(url);
    document.getElementById("link").value = url;
});

  //Stops the submit request
  $("#myAjaxRequestForm").submit(function(e) {
    e.preventDefault();
  });

  //checks for the button click event
  $("#myButton").click(function(e) {

    dataArray = $("#myAjaxRequestForm").serializeArray();
    board_id = parseInt(dataArray[0].value);
    console.log(dataArray);
    dataArray.shift();
    newHash = {};
    tags = [];
    dataArray.map((item) => {
      if (item.name == "tags") {
        tags.push(item.value);
        newHash[item.name] = tags;
      } else {
        newHash[item.name] = item.value;
      }
    });
    var body = {"content": newHash};
    console.log(body);

    //make the AJAX request, dataType is set to json
    //meaning we are expecting JSON data in response from the server
    $.ajax({
      type: "POST",
      url: `https://www.pintag.app/api/v1/boards/${board_id}/contents?user_email=dondraper@s.cooper.com&user_token=3kJG55W4tTe5TnqKf1WS`,
      data: body,


      //if received a response from the server
      success: function(response) {
        console.log(response);
        $("#ajaxResponse").append("saved successfully!");
      },

    });
  });
});

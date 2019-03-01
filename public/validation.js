// const myForm = document.getElementById("formCreation");

// myForm.addEventListener("submit", event => {

// });

//to display message

let attribute = $(".modalClass").attr("data-toggle");

attribute = attribute.includes("modal");
if (attribute) {

  $('.modalClass').trigger('click');
  $(".modalClass").attr("data-toggle", "");
}




//for calling delete routes  
// $(".deleteAdmin").click(function () {

//   let url = `http://localhost:3000/adminDelete/${this.id}`;

//   $.ajax({                              //https://stackoverflow.com/questions/32963736/how-to-make-ajax-get-post-request-in-express-server
//     method: 'DELETE',
//     url: url,
//     success: function (data) {
//       // console.log(data);

//       let url = `http://localhost:3000/admin`;

//       $('.modalClass').trigger('click');
//       $(".modalClass").attr("data-toggle", "");

//       window.location.replace(url);

//     }
//   });


// });

$("#idAbout").click(function () {

  let url = "http://google.com";
  window.location.replace(url);

});




//for enabling edit pop-up

$(".editAdmin").click(function () {

  let idTitle = "title-" + this.id;
  let idDesc = "desc-" + this.id;
  let idLoc = "loc-" + this.id;
  let idDate = "date-" + this.id;
  let idTime = "time-" + this.id;
  let idAge = "age-" + this.id;
  let idSex = "sex-" + this.id;
  let idSeats = "seats-" + this.id;
  let idCost = "cost-" + this.id;

  var title = document.getElementById(idTitle).innerHTML;
  $("#popup-event-name-" + this.id).val(title);

  var desc = document.getElementById(idDesc).innerHTML;
  $("#popup-event-des-" + this.id).val(desc);

  var loc = document.getElementById(idLoc).innerHTML;
  loc = loc.replace("|", "").trim();
  $("#popup-event-loc-" + this.id).val(loc);

  var date = document.getElementById(idDate).innerHTML;
  date = date.replace("|", "").trim();
  $("#popup-event-date-" + this.id).val(date);

  var time = document.getElementById(idTime).innerHTML;
  time = time.replace("|", "").trim();
  $("#popup-event-time-" + this.id).val(time);

  var age = document.getElementById(idAge).innerHTML;

  if (age.includes("Above")) {

    $("#popup-event-above18-" + this.id).prop("checked", true);
  }
  else {
    $("#popup-event-noRestrict-" + this.id).prop("checked", true);

  }


  var sex = document.getElementById(idSex).innerHTML;
  if (sex == "Male Event") {
    $("#popup-event-male-" + this.id).prop("checked", true);
  }
  else if (sex == "Female Event") {
    $("#popup-event-female-" + this.id).prop("checked", true);
  }
  else {
    $("#popup-event-bothGender-" + this.id).prop("checked", true);
  }
  // $("#popup-event-name").val(title);

  var seats = document.getElementById(idSeats).innerHTML;
  seats = seats.replace("Seats |", "").trim();
  $("#popup-event-seats-" + this.id).val(seats);

  var cost = document.getElementById(idCost).innerHTML;
  cost = cost.replace(/[^0-9]/g,'');
  $("#popup-event-cost-" + this.id).val(cost);

  $('.editForm').removeClass("disabled");


});

$('#editAdmin').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})



$('#inputName, #inputPlace, #inputDate,#inputTime,#inputSeats,#exampleTextarea').on('change', function () {  //https://stackoverflow.com/questions/41350220/enable-submit-button-if-input-and-checkbox-arent-empty
  if (allFilled()) {
    $('.review-button').removeClass("disabled");
  }
  else {
    $('.review-button').addClass("disabled");
  }
});

function allFilled() {
  let filled = true;

  if ($("#inputName").val() == "") {
    return filled = false;
  }
  else if ($("#inputPlace").val() == "") {
    return filled = false;
  }
  else if ($("#inputDate").val() == "") {
    return filled = false;
  }
  else if ($("#inputTime").val() == "") {
    return filled = false;
  }
  else if ($("#inputSeats").val() == "") {
    return filled = false;
  }
  else if ($("#exampleTextarea").val() == "") {
    return filled = false;
  }
  else if ($("#inputcost").val() == "") {
    return filled = false;
  }


  return filled
};


// $('#popup-event-name, #popup-event-loc, #popup-event-date,#popup-event-time,#popup-event-seats,#popup-event-des').on('change', function () {  //https://stackoverflow.com/questions/41350220/enable-submit-button-if-input-and-checkbox-arent-empty
//   if (allPopUpFilled()) {
//     $('.editForm').removeClass("disabled");
//   }
//   else {
//     $('.editForm').addClass("disabled");
//   }
// });

// function allPopUpFilled() {

//   let filled = true;

//   if ($("#popup-event-name").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-loc").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-date").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-time").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-seats").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-des").val() == "") {
//     return filled = false;
//   }
//   else if ($("#popup-event-cost").val() == "") {
//     return filled = false;
//   }


//   return filled

// }

$('.personCollectingTicket, .noOfPeopleComming').on('change', function () {

  let id = this.id;
  id = id.replace("person-name-", "");
  id = id.replace("noOfPeople-", "");

  let buttonId = "#confirm";
  buttonId += `-${id}`;

  var num = `#noOfPeople-${id}`;

  if (affRegisterFilled(id)) {

    $(buttonId).removeClass("disabled");

    let cost = document.getElementById("reg-cost").innerHTML;
    cost = cost.replace("$","");

    var $jqValue = $('#cost-display');

    // $(num).on('input', function (event) {
      let sum = `Total Cost for ${$(num).val()} people is $${$(num).val() * cost}`;  
      
      $jqValue.html(sum);
    // });
  }
  else {
    $(buttonId).addClass("disabled");
  }
});

function affRegisterFilled(id) {

  let filled = true;

  let name = `#person-name-${id}`;
  let num = `#noOfPeople-${id}`;

  if ($(name).val() == "") {
    return filled = false;
  }
  else if ($(num).val() == "" || $(num).val() > 10) {
    return filled = false;
  }


  return filled

}



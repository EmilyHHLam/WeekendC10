$(document).ready(function() {
  console.log("jquery source:");
  getListing();

});
function getListing() {
  $.ajax({
    type: "GET",
    url: "/listing",
    success: function(response){
    console.log("response" + response);
    appendListings(response);
  }
  });
}

function appendListings(listings){
  for (var i=0; i<listings.length; i++){
    var listing = listings[i];
    appendListing(listing);
  }
}

function appendListing(listing) {
  console.log("listing list here");
  $(".listingContainer").append("<div class='well col-md-4 item'></div>");
  var $el = $(".listingContainer").children().last();
  if (listing.cost) {
    $el.append("<p>" + listing.cost + "</p>");
  } else {

    $el.append("<p>" + listing.rent + "</p>");
  }
  $el.append("<p>" + listing.address + "</p>");
  $el.append("<p>" + listing.city + "</p>");
  $el.append("<p>$" + listing.sqft + "</p>");
  // if(employee.status){
  //   $el.append("<p>Status: Current Employee");
  // } else {
  //   $el.append("<p>Status: Past Employee");
  // }
  // $el.append("<button data-id=" + employee._id +
  //            " data-status=" + employee.status +
  //            " class='update-btn btn btn-info'>Update Employee</button>");
  //
  // $el.append("<button data-id=" + employee._id +
            // " class='delete-btn btn btn-danger'>Delete Employee</but
}

var current = 100;
pageSize = 10;

$(document).ready(function() {
  console.log("jquery source:");
  getListing();
  var listing = {};
  $('.submitaListing').on('click', function() {
    listing.address = $("#address").val();
    listing.city = $("#city").val();
    listing.sqft = $("#sqft").val();
    listing.price = $("#price").val();
    listing.status = $("input[name=status]:checked").val();
    console.log("address=" + listing.address);
    console.log("city=" + listing.city);
    console.log("sqft" + listing.sqft);
    console.log("price = " + listing.price);
    console.log("status=" + listing.status);

    // $("#empName").val("");
    // $("#empPosition").val("");
    // $("#empSalary").val("");
    postListing(listing);

  });

});
function getListing() {
  $.ajax({
    type: "GET",
    url: "/listing",
    success: function(response){
    //console.log("response" + response);
    appendListings(response);
  }
  });
}
function postListing(data) {
  console.log("post a listing");
   $.ajax({
     type:"POST",
     url:"/listing",
     data: data,
     success: function(response){
      getListing(response);
    }
  });
}


function appendListings(listings){
  for (var i=0; i<listings.length; i++){
    var listing = listings[i];
    appendListing(listing);
  }
}
function convertCurrency(value) {
  Price = '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return Price;
}

function appendListing(listing) {
  showPage(1);

  $(".listingContainer").append("<div class='listing well col-xs-5 col-md-3'></div>");
  var $el = $(".listingContainer").children().last();
  // if (listing.cost) {
  // $el.append("<div id='forSaleImage'></div>");
  // }
  //$el.append("<div></div>");
  //$el.append($(this).children().last());

  if (listing.cost) {
    $el.append("<div id='forSaleImage'></div>");
    $el.append("<br><b>Price:</b> " + convertCurrency(listing.cost));
  } else {
    $el.append("<div id='forRentImage'></div>");
    $el.append("<br><b>Price:</b>" + convertCurrency(listing.rent));
  }
  $el.append("<br><b>ID: </b>" + current++);
    $el.append("<br><i>Total Sqft:</i>" + listing.sqft);
  $el.append("<br>" + listing.address );
  $el.append("<br>" + listing.city + ", MN</p>");


}

function showPage(page) {
  //  $(".listing").hide();
    $(".listing").each(function(n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}



$("#pagin li a").click(function() {
    $("#pagin li a").removeClass("current");
    $(this).addClass("current");
    showPage(parseInt($(this).text()));
});

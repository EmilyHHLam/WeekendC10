var current = 100;
pageSize = 10;
var status =0;
//1=sale, 2=rent, 0=both
var records = 0;
$(document).ready(function() {
  console.log("jquery source:");
  getListing();
  $('.inputSection').hide();
  $('.topnav').removeClass('active');
  //click add
  $("#addData").on("click", function(){
    //console.log("addClick");
    $("a.active").removeClass("active");
    $('.inputSection').toggle();
    $(this).addClass('active');
  });

  //click rent
  $("#rentData").on("click", function() {
    console.log('rent');
    $('.inputSection').hide();
    status = 2;
    getListing();
    $("a.active").removeClass("active");
    $(this).addClass('active');

  });

  //click buy
  $("#saleData").on("click", function() {
    console.log('buy');
    $('.inputSection').hide();
    status = 1;
    getListing();
    $("a.active").removeClass("active");
    $(this).addClass('active');

  });
  //click both
  $("#both").on("click", function() {
    console.log('both');
    $('.inputSection').hide();
    status = 0;
    getListing();
    $("a.active").removeClass("active");
    $(this).addClass('active');
  });


  $('.submitaListing').on('click', function() {
    var listing = {};
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
    $("#address").val("");
    $("#city").val("");
    $("#sqft").val("");
    $("#price").val("");
    //$('input:radio[name=status]').is(':checked') = 0;
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

   $(".listingContainer").empty();
  for (var i=0; i<listings.length; i++){
    var listing = listings[i];
    //for sale lists

      if (status ==1) {
        if (listing.cost) {
          records =0;
          console.log('status in append' + status);
          appendListing(listing);
          console.log('record' + records++);
        }
      }
      else if (status ==2) {
        if (listing.rent) {
          records =0;
          console.log('status in append' + status);
          appendListing(listing);
          console.log('record' + records++);
        }
      }
      else {
        records =0;
        appendListing(listing);
        console.log('record' + records++);
      }

    }
}

function convertCurrency(value) {
  if (value) {
  Price = '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else {
    Price = 0;
  }
  return Price;
}

function appendListing(listing) {
  //console.log("sale1/rent2 = " + status);

      $(".listingContainer").append("<div class='listing well col-xs-5 col-md-3'></div>");
      var $el = $(".listingContainer").children().last();
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



// function displayListing(status) {
//   console.log('status=' + status);
//
//
//
// }
// console.log("sale = " + sale);
// console.log("rent = " + rent);
// function showPage(page) {
//   //  $(".listing").hide();
//     $(".listing").each(function(n) {
//         if (n >= pageSize * (page - 1) && n < pageSize * page)
//             $(this).show();
//     });
// }
//
//
//
// $("#pagin li a").click(function() {
//     $("#pagin li a").removeClass("current");
//     $(this).addClass("current");
//     showPage(parseInt($(this).text()));
// });

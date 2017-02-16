var state = {
  rawdata: {

  },
  cleandata: [],
  apiQuery: {
    type: "GET",
    url: "https://api.motorsportreg.com/rest/calendars.json",
    headers: {
      "Authorization": "Basic " + btoa('trackpedia.com' + ":" + 'traqw1ki')
      },
    dataType: 'json',
    async: false,
    data: {postalcode: "", radius: ""},
    success: saveResults
  },
}

function getData(state, callback) {
  console.log(state);
  $.ajax(state.apiQuery);
};

function cleanData(data) {
  console.log("cleanData");
  var cleanArray = data.response.events.map(function(event) {
    return {
        orgname: event.organization.name,
        venue: event.venue,
        eventdate: event.start,
        eventtype: event.type,
        eventname: event.name,
        eventurl: event.detailuri
      };
  });
  state.cleandata = cleanArray;
}

function saveResults(data) {
  state.rawdata = data; // creates state.rawdata
  cleanData(data); // creates state.cleandata
  sortByVenue(state); // sorts state.cleandata
    //deal with cleaning and displaying data
  console.log(state.cleandata);
};

function sortByVenue(state) {
  console.log("soryByVenue");
  state.cleandata.sort(function(a, b) {
    var nameA = a.venue.name.toLowerCase();
    var nameB = b.venue.name.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB )
      return 1;
    return 0;
  });
};

// function makeVenuesArray(cleandata) {
//   console.log("makeVenuesArray");
//   var arrayObject = []
//   var currentVenue = cleandata[0].venue.name;
//   var venueIndex = 0;
//   for (i=0; i<cleandata.length; i++) {
//     if (cleandata[i].venue.name === currentVenue) {
//       arrayObject =
//       };
//     } else {
//       currentVenue = cleandata[i].venue.name;
//       venueIndex++;
//     };
//   };
//   console.log(arrayObject);
// };

function renderLinksHtml(array) { // creates array of html 1st 3 events
  var content = [];
  for (i=0; i<3; i++) {
    content.push("<p><a href='" + array[i].eventurl + "'>" + array[i].eventdate + " / " + array[i].eventname + "</a></p>");
  };
  console.log(content);
};

function renderResultsBox(state, resultsElement) {
  console.log("renderResultsBox");
  var content = state.cleandata.map(function(event) {
    return '<div class="resultcard col-6 js-resultcard">' +
    '<img class="logobox" src="images/AV_Web_-32.jpg" alt="track-logo">' + '<div class="trackinfobox"><span class="trackname">' + event.venue.name + '</span><br><br>' +
      '<span class="trackcity">' + event.venue.city + ', ' + event.venue.region + '</span><br><br>' +
      '<span class="maplink"><a href="#">View on Map</a></span>' +
      '</div><hr>' +
      '<div class="linksbox js-links-box">' +
      '<h3>Upcoming events:</h3>' +
      '<ul class="eventLinks">' +
      '<li><a href="#">2017-2-25   THSCC HPDE</a></li>' +
      '<li><a href="#">2017-3-5    Someone Else Track Day</a></li>' +
      '<li><a href="#">2017-3-12   NCR SCCA Majors</a></li>' +
      '</ul></div></div>'
  });
  resultsElement.removeClass(".hidden");
  resultsElement.html(content);
};

// Event listeners
function watchForSubmit(formElement, zipInputElement, radiusInputElement, submitButton, resultsElement) {
  submitButton.click(function(e) {
    // resetState(state);
    e.preventDefault();
    console.log("I see submit");
    state.apiQuery.data.postalcode = $(zipInputElement).val();
    state.apiQuery.data.radius = $(radiusInputElement).val();
    getData(state, saveResults);
  });
};

var zipInputElement = $(".js-zip-input");
var radiusInputElement = $(".js-radius-input");
var formElement = $(".js-form");
var submitButton = $("#search-button");
var resultsElement = $("#js-resultbox")

$(function() {
  watchForSubmit(formElement, zipInputElement, radiusInputElement, submitButton, resultsElement);

});

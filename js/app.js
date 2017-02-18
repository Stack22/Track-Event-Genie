var state = {
  rawdata: {},
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
  var cleanObject = data.response.events.map(function(event) {
    return {
        orgname: event.organization.name,
        venuename: event.venue.name,
        venuecity: event.venue.city,
        venuestate: event.venue.region,
        venuezip: event.venue.postalCode,
        venueloc: event.venue.geo,
        eventdate: event.start,
        eventtype: event.type,
        eventname: event.name,
        eventurl: event.detailuri
      };
  });
  state.cleandata = cleanObject;
}

function saveResults(data) {
  // state.rawdata = data; // creates state.rawdata
  cleanData(data); // creates state.cleandata
  // sortByVenue(state); // sorts state.cleandata (events w/venues)
  makeVenuesObject(state); // creates JSON (Venues w/events)
    //deal with cleaning and displaying data
};

function sortByVenue(state) {
  state.cleandata.sort(function(a, b) {
    var nameA = a.venuename.toLowerCase();
    var nameB = b.venuename.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB )
      return 1;
    return 0;
  });
};

/* venuesObject template:
{
  venues: [
    {
      city :"Cary",
      name : "Cary Towne Center",
      postalCode : 27511,
      region :"NC",
      uri : "/calendars/venue/42412A66-B022-AC29-0116C0902DA263C2",
      events: [
        {
          eventdate : "2017-10-21",
          eventname: "THSCC Point Autocross #9"
        },
        {
          eventdate : "2017-10-21",
          eventname: "THSCC Point Autocross #9"
        },
        {
          eventdate : "2017-10-21",
          eventname: "THSCC Point Autocross #9"
        }
      ]
    }
  ]
}
*/

function makeVenuesObject(state) {
  sortByVenue(state);
  var output = state.cleandata
    .reduce((venues, item) => {
      venues[item.venuename] = [];
      return venues
    });
  console.log(output);
};

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

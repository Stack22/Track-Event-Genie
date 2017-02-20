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
    async: true,
    data: {postalcode: "", radius: ""},
    success: saveResults
  },
}

function getData(state, callback) {
  console.log(state);

	// $.getJSON(state.apiURL, state.apiQuery, callback);
  var settings = {
    type: "GET",
    url: "https://api.motorsportreg.com/rest/calendars.json",
    headers: {
      "Authorization": "Basic " + btoa('trackpedia.com' + ":" + 'traqw1ki')
    },
    dataType: 'json',
    crossDomain: true,
    data: {
      postalcode: state.apiQuery.postalcode,
      radius: state.apiQuery.radius
    },
    success: callback

  $.ajax(state.apiQuery);
};

function cleanData(data) {
  console.log("cleanData");
  var cleanArray = data.response.events.map(function(event) {
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
  state.cleandata = cleanArray;
  return cleanArray;
}

function saveResults(data) {
  // state.rawdata = data; // creates state.rawdata
  // cleanData(data); // creates state.cleandata
  // sortByVenue(state); // sorts state.cleandata (events w/venues)
  makeVenuesObject(cleanData(data)); // creates JSON (Venues w/events)
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

function makeVenuesObject(cleanArray) {
  // sortByVenue(state);
  var output = cleanArray.reduce(function(venues, item) {
      venues[item.venuename] = venues[item.venuename] || [];
      venues[item.venuename].push({
        eventdate: item.eventdate,
        eventname: item.eventname,
        eventdate: item.eventdate,
        eventurl: item.eventurl,
        orgname: item.orgname,
        venuecity: item.venuecity,
        venuestate: item.venuestate,
        venuezip: item.venuezip,
        venueloc: item.venueloc
      });
      return venues
    });
  renderResultsBox(state);
};

function compileData(useTrackArray, state) {
  var contentObject = state.cleandata[0];
  console.log(contentObject);
  console.log(useTrackArray);
  var htmlObject = useTrackArray.map(function(track) {
    return {
      name: track,
      events: contentObject[track]
      };
    });
  return htmlObject;
};

function renderLinksHtml(venueObject) { // creates array of html 1st 3 events
  console.log(venueObject);
  var content = [];
  var html = "";
  for (i=0; i<3 && i<venueObject.length; i++) {
    content.push("<li><a target='_blank' href='" + venueObject[i].eventurl + "'>" + venueObject[i].eventdate + " / " + venueObject[i].eventname + "</a></li>");

  };
  for (j=0; j<content.length; j++) {
    html += content[j];
  }
  return html;
};

function renderResultsBox(state) {
  console.log("renderResultsBox");
  var trackArray = Object.getOwnPropertyNames(state.cleandata[0]);
  var useTrackArray = trackArray.filter(function(track) {
    var doNotWant = ["orgname","venuename","venuestate","venuezip","venueloc","eventdate","eventtype","eventname","eventurl","venuecity"];
    if (doNotWant.includes(track)) {
      return false;
    } else {
      return true;
    };
  }).sort();
  var htmlArray = compileData(useTrackArray, state);
  console.log(htmlArray);
  var content = htmlArray.map(function(venue) {
    return '<div class="resultcard col-6 js-resultcard">' +
    '<img class="logobox" src="images/AV_Web_-32.jpg" alt="track-logo">' + '<div class="trackinfobox"><span class="trackname">' + venue.name + '</span><br><br>' +
      '<span class="trackcity">' + venue.events[0].venuecity + ', ' + venue.events[0].venuestate + '</span><br><br>' +
      '<span class="maplink"><a target="_blank" href="http://maps.google.com/maps?q=' + venue.events[0].venueloc.coordinates[1]+','+ venue.events[0].venueloc.coordinates[0] + '">View on Map</a></span>' +
      '</div><hr>' +
      '<div class="linksbox js-links-box">' +
      '<h3>Upcoming events:</h3>' +
      '<ul class="eventLinks">' + renderLinksHtml(venue.events) +
      '</ul></div></div>'
  });
  console.log(content);
  $("#js-resultbox").append(content);
  $("#js-resultbox").removeClass("hidden");
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

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
  $.ajax(state.apiQuery);
};

function cleanData(data) {
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
  makeVenuesObject(cleanData(data));
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

function makeVenuesObject(cleanArray) {
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
  var htmlObject = useTrackArray.map(function(track) {
    return {
      name: track,
      events: contentObject[track]
      };
    });
  return htmlObject;
};

function renderLinksHtml(venueObject) {
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
  var content = htmlArray.map(function(venue) {
      var resultshtml =
      '<div class="result-container col-6 js-resultcard">' +
        '<div class="subcontainer">' +
          '<div class="img-container">' +
            '<img src="images/autox_5.jpg" alt="track-logo">' +
          '</div>' +
          '<div class="info-container">' +
            '<span class="track-name">' + venue.name + '</span>' +
            '<span class="city-state">' + venue.events[0].venuecity + ', ' + venue.events[0].venuestate + '</span>' +
            '<span class="map-link"><a target="_blank" href="http://maps.google.com/maps?q=' + venue.events[0].venueloc.coordinates[1]+','+ venue.events[0].venueloc.coordinates[0] + '">View on Map</a></span>' +
          '</div>' +
          '<div class="links-container js-links-box">' +
            '<h3>Upcoming events:</h3>' +
            '<ul class="eventLinks">' + renderLinksHtml(venue.events) +
              '</ul>' +
          '</div>' +
        '</div>' +
      '</div>'

      return resultshtml;
  });
  $("#js-resultbox").append(content);
  $("#js-resultbox").removeClass("hidden");
};

// Event listeners
function watchForSubmit(formElement, zipInputElement, radiusInputElement, submitButton, resultsElement) {
  submitButton.click(function(e) {
    e.preventDefault();
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

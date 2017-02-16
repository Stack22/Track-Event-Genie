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
  state.rawdata = data;
  cleanData(data);
  console.log(state.cleandata);
};

function sortByVenue(state) {
  console.log("soryByVenue");
  return state.cleandata.sort(function(a, b) {
    var nameA = a.venue.name.toLowerCase();
    var nameB = b.venue.name.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB )
      return 1;
    return 0;
  });
  console.log(state.cleandata);
};

function renderLinksHtml(state) { // creates array of html 1st 3 events

  var content = [];
  for (i=0; i<3; i++) {
    content.push("<p><a href='" + state.cleandata[i].eventurl + "'>" + state.cleandata[i].eventdate + " / " + state.cleandata[i].eventname + "</a></p>");
  };
  console.log(content);
};

// Event listeners
function watchForSubmit(formElement, zipInputElement, radiusInputElement, submitButton, searchTypeElement) {
  submitButton.click(function(e) {
    // resetState(state);
    e.preventDefault();
    console.log("I see submit");
    state.apiQuery.data.postalcode = $(zipInputElement).val();
    state.apiQuery.data.radius = $(radiusInputElement).val();
    getData(state, saveResults);
    if (searchTypeElement.val() === "venue") {
      sortByVenue(state);
    } else if (searchTypeElement.val() === "proximity") {
      //sortByProximity(state);
    } else {
      //do nothing
    };
  });
};

var zipInputElement = $(".js-zip-input");
var radiusInputElement = $(".js-radius-input");
var formElement = $(".js-form");
var submitButton = $("#search-button");
var searchTypeElement = $(".js-search-type");

$(function() {
  watchForSubmit(formElement, zipInputElement, radiusInputElement, submitButton, searchTypeElement);

});

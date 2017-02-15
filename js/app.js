var jsonFile = "sample_msr.json"

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
    success: renderResults
  },
}

function getData(state, callback) {
  console.log(state);
  $.ajax(state.apiQuery);
};

function cleanData(data) {
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

function renderResults(data) {
  console.log("renderResults function");
  state.rawdata = data.stringify(string, null, 2);
  console.log(state.rawdata);
};

// Event listeners
function watchForSubmit(state, formElement, zipInputElement, radiusInputElement, submitButton) {
  submitButton.click(function(e) {
    // resetState(state);
    e.preventDefault();
    console.log("I see submit");
    state.apiQuery.data.postalcode = $(zipInputElement).val();
    state.apiQuery.data.radius = $(radiusInputElement).val();
    getData(state, renderResults);
  });
};

var zipInputElement = $(".js-zip-input");
var radiusInputElement = $(".js-radius-input");
var formElement = $(".js-form");
var submitButton = $("#search-button");

$(function() {
  watchForSubmit(state, formElement, zipInputElement, radiusInputElement, submitButton);
});

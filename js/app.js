var state = {
  rawdata: {},
  cleandata: [],
  apiURL: "https://api.motorsportreg.com/rest/calendars.json",
  apiQuery: {
    type: "GET",
    // url: "https://api.motorsportreg.com/rest/calendars/",
    headers: {
      "Authorization": "Basic " + btoa('trackpedia.com' + ":" + 'traqw1ki')
    },
    dataType: 'json',
    async: false,
  },
  postal: "",
  radius: ""
}

function getData(state, callback) {
	$.getJSON(state.apiURL, state.apiQuery, callback);
};

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
    state.postal = $(this).find(zipInputElement).val();
    state.radius = $(this).find(radiusInputElement).val();
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

// API init/call
var MSR_API_URL = "https://api.motorsportreg.com/rest/calendars/"
var avOrgID = '4F1E597B-9955-0AB6-1136213C81AE96EF'
var query = {
  username: 'trackpedia.com',
  password: 'traqw1ki',
  dataType: 'jsonp',
  cacheBuster: new Date(),
  postalcode: 27705,
};
// organization/4F1E597B-9955-0AB6-1136213C81AE96EF.jsonp?jsoncallback=?'

function getData() {
	$.getJSON(MSR_API_URL, query,
     function(json) {
			var tbl = '<table>';
			$.each(json.response.events, function(i, evt) {
				tbl += '<tr>';
				tbl += '<td><a href="' + evt.detailuri + '">' + evt.name + '</a></td>';
				tbl += '<td>' + evt.type + '</td>';
				tbl += '<td>' + evt.venue.city + ', ' + evt.venue.region + '</td>';
				tbl += '<td>' + evt.start + '</td>';
				tbl += '<td>' + evt.end + '</td>';
				tbl += '<td>' + ((typeof(evt.registration.start) === 'undefined') ? '' : evt.registration.start) + '</td>';
				tbl += '</tr>';
			});
			tbl += '<' + '/table>';
			$('#msrCalendar').append(tbl);
		});
};

$(function() {
  getData();
});

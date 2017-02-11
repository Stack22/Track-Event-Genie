$(document).ready(function() {
	$.getJSON('https://api.motorsportreg.com/rest/calendars/organization/{your-id-here}.jsonp?jsoncallback=?', {
			dataType: "jsonp"
			,cacheBuster: new Date()
		 }, function(json) {
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
});

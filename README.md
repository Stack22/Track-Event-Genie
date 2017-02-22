# track_event_finder

Thinkful Unit 1 Frontend capstone project - HTML, CSS, JavaScript, jQuery, API integration

#Background
As an automotive track day enthusiast, one daunting task is to plan ahead for events you might be interested in attending. One tool to help with this is MotorsportReg.com. This website is an international repository of thousands of events. It first and foremost is a registration service. That service, of course, lends itself to an extensive calendar of events from which to choose.

#Use case
Navigating thru the listings can often times be difficult due to the sheer number of events available. This web app presents those events, filtered by the user, in an easy-to-digest format. The resulting data provides listings grouped by venue, and shows direct links to the events' registration on MotorsportReg.com

#Initial UX
https://github.com/Stack22/track_event_finder/blob/master/Documentation/worksheets.pdf

#Working Prototype
https://stack22.github.io/track_event_finder/

#Functionality
* Allow user to enter a zip code for their location (or desired search start point)
* Allow user to select from a list of radius options within which to search
* Displays results on "results cards" which are shown by venue
* Each card includes the venue's name and city/state
* Each card includes up to three upcoming events at that venue (opens a new tab with the event's registration info page when clicked)

#Technical
This app uses a jQuery AJAX call to retrieve event data based on user defined location and search radius parameters, then uses jQuery to hold the results in memory and render them via HTML. It is written to be responsive across multiple steps of window sizes, and mobile devices.

#Development Roadmap
This is v1.0 of the app, future feature additions and enhancements are planned to include:
* More user-defined search or display parameters
  - event type options
  - allow city/state to be entered instead of zip code
  - allow for other postal codes to be used (e.g. Canada)
  - have results sorted optionally by location (e.g. near to far)
  - Option to show a complete list of scheduled events (if more than three)
* Detail view of each venue
* Semi-randomized results images based on venue
* Pop-up "quick view" on hover over event link 

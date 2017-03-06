# Track Event Genie

Thinkful Unit 1 Frontend capstone project - HTML, CSS, JavaScript, jQuery, API integration

#Background
As an automotive track day enthusiast, one daunting task is to plan ahead for events you might be interested in attending. One tool to help with this is MotorsportReg.com, which is an international repository of thousands of events. First and foremost it is a registration service. That service, of course, lends itself to an extensive calendar of events from which to choose. The Track Event Genie serves to make navigating those event listings easier. While the MotorsportReg native calendar supports searching by zip, it does not sort those filtered events by venue.

#Use case
Navigating thru the listings can often times be difficult due to the sheer number of events available. This web app presents those events, filtered by the user, in an easy-to-digest format. The resulting data provides listings grouped by venue, and shows direct links to the events' registration on MotorsportReg.com

#Initial UX
In developing this app, I wanted to create a simple, but interesting user experience. I used fonts that were easy to read, but not seen everyday. I wanted multiple views for the app, but not a confusing set of menus and separate pages. The pdf below is my initial work on views and view requirements.
https://github.com/Stack22/Track-Event-Genie/blob/master/Documentation/worksheets.pdf

#Working Prototype
https://stack22.github.io/Track-Event-Genie/

#Functionality
* Allow user to enter a zip code for their location (or desired search start point)
* Allow user to select from a list of radius options within which to search
* Displays results on "results cards" which are shown by venue
* Each card includes the venue's name and city/state
* Each card includes up to three upcoming events at that venue (opens a new tab with the event's registration info page when clicked)

#Technical
This app uses a jQuery AJAX call to retrieve event data based on user defined location and search radius parameters, then uses jQuery to hold the results in memory and render them via HTML. It is written to be responsive across multiple steps of window sizes.

#Lessons Learned
This project requires an api call from a third party web application with various authentication needs. After reaching out to the owner/programmer, I received the login information for basic authorization (needed for the type of data I wanted to pull). After a few tries, I was able to pull data from my command line using curl, but was receiving a 401 error message when trying to use my web app.

After making some JavaScript changes, I was able to make a little progress. My error message upgraded from a 401 (Unauthorized) to a 404 (Resource not found). After searching the web, best I was able to determine, I was running into a crossorigin resource sharing issue. After trying various workarounds that I found (or so I thought), I was getting nowhere on my own.

I enlisted the help of another Thinkful mentor, Jefferson Heard. He agreed to meet me and take a look at what I've got. After only a few minutes, and some magic keystrokes from the command line, he was relatively certain that the problem lay not in my code, but on the server where I was calling. The OPTIONS call was throwing the 404 message. It wasn't returning the correct CORS headers.

We emailed the programmer, telling him our theory. A few hours later, I get a response asking to see the full header request information, which I was able to get to him quickly. A short while later, another email response letting me know that he would be updating the server code with permissions to return the correct CORS headers!

Additionally, I learned many things regarding building even a very basic web app:
* Not all API's are created equal, nor are they always correct (see above)
* Getting the data from the API, then manipulating it, isn't always intuitive. Learning how and when my code results showed up in the processes of the app proved interesting to say the least.
* Simpler is usually better (but not always)

#Development Roadmap
This is v1.0 of the app, future feature additions and enhancements are planned to include:
* Optimize for mobile
* More user-defined search or display parameters
  - event type options
  - allow city/state to be entered instead of zip code
  - allow for other postal codes to be used (e.g. Canada)
  - have results sorted optionally by location (e.g. venues near to far)
  - Option to show a complete list of scheduled events (if more than three)
* Detail view of each venue
* Semi-randomized results images based on venue or event type
* Pop-up "quick view" on hover over event link

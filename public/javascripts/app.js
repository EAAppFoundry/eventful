// single file represenation of all client UI javascript.  yes, in theory
// you might want to break these into seperate files, and minify/concat them
// together.  but for the interest of time, you get a single file today.


var endOfWeekDate = undefined;
var endOfNextWeekDate = undefined;
var events = undefined;

//
// jquery is ready to go, lets hook events and paint the ui...
//
$(document).ready(function(){
  var now = new Date();
  $('#txtEventDate').datepicker({dateFormat:'mm-dd-yy'});
  $('#txtEventDate').datepicker("setDate", new Date());
	var controller = new Controller();

  var socket = io.connect('/');
  /*
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  }); */

  socket.on('event.added', function (event) {
    switch(events.eventDateRangeHitTest(event)){
      case 'THIS_WEEK':
        $('#eventsThisWeekContainer').prepend(eventView(event, true));
        break;
      case 'NEXT_WEEK':
        $('#eventsNextWeekContainer').prepend(eventView(event, true));
        break;
      case 'FUTURE':
        $('#eventsFutureContainer').prepend(eventView(event, true));
        break;
    }
    flashElement($('#' +event._id));
    events.events().push(event);
  });

  endOfWeekDate = moment(getThisWeekEndDate());
  endOfNextWeekDate = moment(getThisWeekEndDate());
  endOfNextWeekDate.add('days', 7);

});


// controller
function Controller(){

  events = new Events();

	Controller.prototype.wireEventsUp = function(){
    $('#lnkAddNewEvent').click(function addNewEventClick(){
      showDialog($('#dlgEditEvent'));
      return false;
    });

    $('#lnkSignUp').click(function addNewEventClick(){
      window.location.href = '/signup';
      return false;
    });

    $('#lnkSignIn').click(function addNewEventClick(){
      window.location.href = '/signin';
      return false;
    });

    $('#btnSaveEvent').click(function addNewEventClick(){
      var event = new Event();
      var eventData = event.create();
      bundleCriteriaForEvent(eventData);
      events.save(eventData, function eventWasSaved(event){
        hideDialog($('#dlgEditEvent'));
      });
      return false;
    });

    $('#btnCancelSave').click(function addNewEventClick(){
      hideDialog($('#dlgEditEvent'));
      return false;
    });
	}


	this.wireEventsUp();

  $('#eventsThisWeekContainer').html('');
  $('#eventsNextWeekContainer').html('');
  $('#eventsFutureContainer').html('');
  
  
  events.get(function retrievedEvents(data){
    var thisWeeksEvents = events.filterEventsThisWeek();
    var nextWeeksEvents = events.filterEventsForNextWeek();
    var futureEvents = events.filterFutureEvents();
    if(thisWeeksEvents.length > 0){
      $('#eventsThisWeekContainer').html(eventsView(thisWeeksEvents));
    }
    else{
      $('#eventsThisWeekContainer').html("<div class='event-week-label-small'>No events scheduled for this week...</div>");
    }

    if(nextWeeksEvents.length > 0){
      $('#eventsNextWeekContainer').html(eventsView(nextWeeksEvents));
    }
    else{
      $('#eventsNextWeekContainer').html("<div class='event-week-label-small'>No events scheduled for next week...</div>");
    }

    if(futureEvents.length > 0){
      $('#eventsFutureContainer').html(eventsView(futureEvents));
    }
    else{
      $('#eventsFutureContainer').html("<div class='event-week-label-small'>No events scheduled for the future...</div>");
    }
    
    // add spacer to bottom to give room before footer...
    $('#eventsContainer').append("<div style='height:40px;'></div>");
  });

  var bundleCriteriaForEvent = function(event){
    event.Name = $('#txtEventName').val();
    event.EventDate = $('#txtEventDate').val();
    event.Time = $('#txtEventTime').val();
    event.Description = $('#txtEventDescription').val();
    event.Location = $('#txtEventLocation').val();
    event.Organizer = $('#txtEventOrganizer').val();
    event.Hashtag = $('#txtEventHashtag').val();
    event.Private = $('#chkEventIsPrivate').attr('checked') === 'checked' ? true : undefined;
    event.Tags = $('#txtEventTags').val().split(',');
  }
}




//
// single event
//
function Event(){
  Event.prototype.create = function(){
  	return {
      _id:'',
  		Name:'',
  		EventDate:'',
  		Time:'',
  		Description:'',
  		Location:'',
  		Organizer:'',
  		Hashtag:'',
  		Private:'',
  		Tags:[]
  	}
  }
  Event.prototype.validate = function(){
  	throw 'not implemented';
  }
}

// collection of events
function Events(){

  var _events = undefined;

  Events.prototype.get = function(callback){
    var self = this;
    AJAX('GET', undefined, '/api/v1/events', function retrievedEventsFromServer(events){
      self._events = events;
      callback(_events);  // return events to caller...
    });
  }


  var eventDateRangeHitTest = function(event){
    var day = moment(event.EventDate);
    if(day <= endOfWeekDate){
      return 'THIS_WEEK';
    }
    else if((day > endOfWeekDate) && (day <= endOfNextWeekDate)){
      return 'NEXT_WEEK';
    }
    else{
      return 'FUTURE';
    }
  }

  Events.prototype.eventDateRangeHitTest = eventDateRangeHitTest;

  Events.prototype.filterEventsThisWeek = function(){
    var self = this;
    var filteredEvents = [];
    _.each(self._events, function(event){ 
      if(eventDateRangeHitTest(event) === 'THIS_WEEK'){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }

  Events.prototype.filterEventsForNextWeek = function(){
    var self = this;
    var filteredEvents = [];
    _.each(self._events, function(event){ 
      if(eventDateRangeHitTest(event) === 'NEXT_WEEK'){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }

  Events.prototype.filterFutureEvents = function(){
    var self = this;
    var filteredEvents = [];
    _.each(self._events, function(event){ 
      if(eventDateRangeHitTest(event) === 'FUTURE'){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }  


  Events.prototype.save = function(event, callback){
    var self = this;
    AJAX('POST', {event:event}, '/api/v1/events', function savedEvent(event){
      self._events.push(event);
      callback(event);  // return event to caller...
    });
  }

  Events.prototype.events = function(){
    var self = this;
    return self._events;
  }
}



// single view of event
function eventView(event, doNotDisplay){
  var day = moment(event.EventDate);
  console.log(day.toString());
  var html = '';
  if(doNotDisplay){
    html += "<div class='event-container' style='display:none' id='" + event._id + "'>";
  }
  else{
    html += "<div class='event-container' id='" + event._id + "'>";
  }
  
  html +=   "<table>";
  html +=     "<tr>";
  html +=       "<td style='width:150px;background-color: rgba(0,0,0,0.05)'>";
  html +=         "<div class='event-day-of-week-container'>";
  html +=           "<div class='event-large-day-of-week'>" + day.format('ddd') + "</div>";
  html +=           "<div class='event-month-day'>" + day.format('MMM') + ' ' +  day.format('D') + "</div>";
  html +=         "</div>";
  html +=       "</td>";
  html +=       "<td>";
  html +=         "<div style='margin-left:15px'>";
  html +=           "<div style='float:left;margin-top:4px'>";
  if(event.Private === true){
    html +=              "<img style='float:left;margin-top:5px;margin-left:8px' src='images/hand.png'/>";
    html +=              "<div style='float:left' class='event-name'>" + event.Name +  "</div>";  
    html +=              "<div style='float:left' class='event-name-private'>(private)</div>";
  }
  else{
    html +=              "<div style='float:left' class='event-name'>" + event.Name + "</div>";
  }
  html +=           "</div>";
  html +=           "<div style='clear:both'></div>";
  html +=           "<div class='event-description'>" + event.Description + "</div>";
  html +=           "<div class='event-location'>" + event.Location + "</div>";
  html +=           "<div class='event-datetime' style='margin-bottom:8px'>" + day.format('MMMM Do YYYY') + '&nbsp &nbsp' + event.Time + "</div>";
  html +=         "</div>";
  html +=       "</td>";
  html +=     "</tr>";
  html +=   "</table>";
  html += "</div>";

  return html;

}


// view of all events
function eventsView(events){
  var html = '';
  _.each(events, function(event){ 
      html += eventView(event);
  });
  return html;
}





























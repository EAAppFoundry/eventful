// single file represenation of all client UI javascript.  yes, in theory
// you might want to break these into seperate files, and minify/concat them
// together.  but for the interest of time, you get a single file today.


//
// jquery is ready to go, lets hook events and paint the ui...
//
$(document).ready(function(){
  $('#txtEventDate').datepicker();
	var controller = new Controller();
});



// controller
function Controller(){

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
  
  var events = new Events();
  events.get(function retrievedEvents(data){
    var thisWeeksEvents = events.filterEventsThisWeek();
    var nextWeeksEvents = events.filterEventsForNextWeek();
    var futureEvents = events.filterFutureEvents();
    $('#eventsThisWeekContainer').html(eventsView(thisWeeksEvents));
    $('#eventsNextWeekContainer').html(eventsView(nextWeeksEvents));
    $('#eventsFutureContainer').html(eventsView(futureEvents));
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
    event.Private = $('#chkEventIsPrivate').attr('checked') === 'checked' ? true : false;
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

  Events.prototype.filterEventsThisWeek = function(){
    var self = this;
    var filteredEvents = [];
    var endOfWeekDate = moment(getThisWeekEndDate());
    _.each(self._events, function(event){ 
      var day = moment(event.EventDate);
      console.log(endOfWeekDate + '   ' + day);
      if(day <= endOfWeekDate){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }

  Events.prototype.filterEventsForNextWeek = function(){
    var self = this;
    var filteredEvents = [];
    var endOfWeekDate = moment(getThisWeekEndDate());
    var endOfNextWeekDate = moment(getThisWeekEndDate());
    endOfNextWeekDate.add('days', 7);
    _.each(self._events, function(event){ 
      var day = moment(event.EventDate);
      if((day > endOfWeekDate) && (day <= endOfNextWeekDate)){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }

  Events.prototype.filterFutureEvents = function(){
    var self = this;
    var filteredEvents = [];
    var endOfWeekDate = moment(getThisWeekEndDate());
    var endOfNextWeekDate = moment(getThisWeekEndDate());
    endOfNextWeekDate.add('days', 7);
    _.each(self._events, function(event){ 
      var day = moment(event.EventDate);
      if(day > endOfNextWeekDate){
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }


  Events.prototype.save = function(event, callback){
    
  }

  Events.prototype.events = function(){
    var self = this;
    return self._events;
  }
}



// single view of event
function eventView(event){
  var day = moment(event.EventDate);
  console.log(day.toString());
  var html = '';
  html += "<div class='event-container'>";
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





























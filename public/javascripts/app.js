// single file represenation of all client UI javascript.  yes, in theory
// you might want to break these into seperate files, and minify/concat them
// together.  but for the interest of time, you get a single file today.


//
// jquery is ready to go, lets hook events and paint the ui...
//
$(document).ready(function(){
	var controller = new Controller();
  //var temp = new Event();
	//temp.validate();
});



// controller
function Controller(){

	Controller.prototype.wireEventsUp = function(){
    $('#lnkAddNewEvent').click(function addNewEventClick(){
      //alert('new event');

      //backgroundMask.append();
      showEditDialog();
      return false;
    });
	}

	var showEditDialog = function(){
    showDialog($('#dlgEditEvent'));
	}

	this.wireEventsUp();

  //$('#eventsContainer').html('');
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
  $('#eventsThisWeekContainer').html('asdfasdf');
}




//
// single event
//
function Event(){
  Event.prototype.create = function(){
  	return {
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


  Events.prototype.save = function(callback){
    throw 'not implemented';
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
  html +=           "<div style='event-month-day'>" + day.format('MMM') + ' ' +  day.format('D') + "</div>";
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


  /*
    div(style='background-color:rgba(0,0,0,0.1);-moz-border-radius: 8px;-webkit-border-radius:8px;border-radius:8px;height:auto;min-height:1px')
      table
        tr
          td(style='width:150px;background-color: rgba(0,0,0,0.05)')
            div.event-day-of-week-container
              div(style='font-size:24pt;font-family:helvetica;font-weight:bold;color:#555555') Tue
              div(style='font-size:12pt;font-family:helvetica;font-weight:bold;color:#555555;margin-left:3px') Oct 31
          td
            div(style='margin-left:15px')
              div(style='float:left')
                img(style='float:left;margin-top:5px;margin-left:8px', src='images/hand.png')
                div(style='float:left').event-name this is the name of the event right here (private)
              div(style='clear:both')
              div.event-description This is the big ole description that tells them what this event is.  asdfasdfasdfasdf asdf as asdf a asdf asdf asdf asdf asdf asf asfd sa
              div.event-location Techwood
              div.event-datetime October 31, 2012  8:00 PM
              div(style='height:8px')   */

}



// view of all events
function eventsView(events){
  var html = '';
  _.each(events, function(event){ 
      html += eventView(event);
  });
  return html;
}





























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
      alert('new event');
      return false;
    });
	}

	this.wireEventsUp();
	
}

//
// events controller
// manages event persistence/retrieval
//
function EventController(){

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
  
}

// single view of event
function EventView(){

}

// view of all events
function EventsView(){

}

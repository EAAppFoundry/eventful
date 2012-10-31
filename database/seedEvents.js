// ##seedEvents.js
// ####Seeds the database with a number of fake events

// this script is run from the node.exe command-line
var config = require('../config');
config.setDevelopmentConfig();

var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();


var event = {Name: 'Taste of TEN', EventDate: new Date('10-29-2012'), Time: '1-3pm',
				Description: 'Come join us for a sample of the best restaurants in Atlanta',
				Location: 'techwood', Organizer: 'TEN Interacts', Hashtag: '#tasteten',
				Private: false, Tags: ['taste', 'food', 'noms'], PassbookURL: 'https://pass.is/TzkS9R'};
var events = [event];

event = {Name: 'Ice Cream Social', EventDate: new Date('10-29-2012'), Time: '11-1pm',
				Description: 'Free ice cream in the Station Break',
				Location: 'techwood', Organizer: 'TEN Interacts', Hashtag: '#icecream',
				Private: false, Tags: ['ice cream', 'food', 'noms'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Ice Cream Social', EventDate: new Date('10-30-2012'), Time: '11-1pm',
				Description: 'Free ice cream in the Station Break',
				Location: 'techwood', Organizer: 'TEN Interacts', Hashtag: '#icecream',
				Private: false, Tags: ['ice cream', 'food', 'noms'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Ice Cream Social', EventDate: new Date('10-31-2012'), Time: '11-1pm',
				Description: 'Free ice cream in the Station Break',
				Location: 'techwood', Organizer: 'TEN Interacts', Hashtag: '#icecream',
				Private: false, Tags: ['ice cream', 'food', 'noms'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'EA Hackathon', EventDate: new Date('10-31-2012'), Time: '9-5pm',
				Description: 'No distractions, only code...',
				Location: 'techwood', Organizer: 'Enterprise Applications', Hashtag: '#hachathon',
				Private: false, Tags: ['javascript', 'fnode.js'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Music at the Mansion', EventDate: new Date('11-01-2012'), Time: '12-2pm',
				Description: 'Featured band: Fugazi',
				Location: 'techwood', Organizer: 'Radio sucks!', Hashtag: '#mansionmusic',
				Private: false, Tags: ['music', 'fugazi'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Music at the Mansion', EventDate: new Date('11-08-2012'), Time: '12-2pm',
				Description: 'Featured band: Red Hot Chili Peppers',
				Location: 'techwood', Organizer: 'Radio sucks!', Hashtag: '#mansionmusic',
				Private: false, Tags: ['music', 'rhcp'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Free Starbucks!', EventDate: new Date('10-31-2012'), Time: '1-1:25pm',
				Description: 'Come to the atrium and get some free coffee',
				Location: 'cnn', Organizer: 'TEN Interacts', Hashtag: '#fuckincoffee',
				Private: false, Tags: ['coffee', 'subx'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'Free CNN Tours', EventDate: new Date('11-01-2012'), Time: '10am-3pm',
				Description: 'Come learn more about how CNN works',
				Location: 'cnn', Organizer: 'TEN Interacts', Hashtag: '#cnntour',
				Private: false, Tags: ['cnn', 'learning'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'CT Support Group', EventDate: new Date('10-31-2012'), Time: '11am-12pm',
				Description: 'You work at CT and it sucks, come share with others.',
				Location: 'ct', Organizer: 'Enterprise Applications', Hashtag: '#killmenow',
				Private: false, Tags: ['downtown', 'sterile'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

event = {Name: 'News Review', EventDate: new Date('11-01-2012'), Time: '11am-5pm',
				Description: 'Review the performance of CNN last month',
				Location: 'cnn', Organizer: 'CNN Leadership', Hashtag: '#killfoxnews',
				Private: true, Tags: ['cnn', 'news'], PassbookURL: 'https://pass.is/TzkS9R'};
events.push(event);

// clear the collection and repopulate
EventProvider.clear(function(){
	for(var i=0;i<events.length;i++) {
		EventProvider.createEvent(events[i], function(err, event){
			console.log('saved!');
		});
	};

});

// kill the node process
process.exit();





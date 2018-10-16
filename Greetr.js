// IIFE creates new execution context to avoid conflict with other code
(function(global, $){

	var Greetr = function(firstName, lastName, language, level) {
		return new Greetr.init(firstName, lastName, language);
	}

	// Greetr.init will have access to these variables through closure but the variable is not exposed outside of this function
	var supportedLangs = ['en', 'fr'];

	var greetings = {
		en: 'Hello',
		fr: 'Salut'
	};

	var formalGreetings = {
		en: 'Greetings',
		fr: 'Bonjour'
	};

	var informalGreetings = {
		en: 'Hey',
		fr: 'Coucou'
	}

	var logMessages = {
		en: 'Connected',
		fr: 'Connexion'
	};

	Greetr.prototype = {

		fullName: function(){
			return this.firstName + ' ' + this.lastName;
		},

		validate: function(){
			if (supportedLangs.indexOf(this.language) === - 1) {
				throw "Invalid Language"
			}
		},

		greeting: function(){
			return greetings[this.language] + ' ' + this.firstName;
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ' ' + this.fullName();
		},

		informalGreeting: function(){
			return informalGreetings[this.language] + ' ' + this.firstName;
		},

		greet: function(level){
			var msg;

			switch (level) {
				case 'informal':
					msg = this.informalGreeting();
					break;
				case 'formal':
					msg = this.formalGreeting();
					break;
				default :
					msg = this.greeting();
					break
			}

			return msg;
		},

		log: function(){
			if(console){
				console.log(logMessages[this.language] + ': ' + this.fullName())
			}

			// the return allows this method to be chainable
			return this;
		},

		setLang: function(lang){
			this.language = lang;

			this.validate();

			return this;
		},

		displayGreeting: function(selector, level){
			if (!$) {
				throw 'No jQuery';
			}

			if (!selector) {
				throw 'Missing jQuery selector';
			}

			var msg = this.greet(level);

			$(selector).html(msg);

			return this;
		},



	}; /* end of object literal for Greetr prototype */

	Greetr.init = function(firstName, lastName, language) {

		var self = this;

		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';

		self.validate();

	}

	// Allows object created from Greetr.init to access all properties and methods of Greetr.prototype
	Greetr.init.prototype = Greetr.prototype;

	global.Greetr = global.G$ = Greetr;

}(window, jQuery));
/* jshint jquery: true, devel: true */

"use strict";

var ips = [],
	ipValid,
	temp,
	tabs = [{name: "First terminal", terminalResult: "", terminalInput: "", closed: false}];

var i = 0, ii, j, jj;

for(i = 0; i < 50; i++) {
	ipValid = false;
	while(!ipValid) {
		temp = (Math.floor(Math.random() * 255)+1)+"."+(Math.floor(Math.random() * 256))+"."+(Math.floor(Math.random() * 256));
		ipValid = true;

		for(var j = 0, jj = ips.length; j < jj; j++) {
			if(ips[i] === temp) {
				ipValid = false;
				continue;
			}
		}
		ips.push(temp);
	}
	$("#serverList ul").append("<li data-server-id='"+i+"'>"+temp+"</li>");
}

$("#serverList li").on("click", function(event) {
	$("#input input").val($("#input input").val()+" "+$(this).text());
	$("#input input").focus();
});

$("#input input").on("keydown", function(event) {
	if(event.which === 13) {
		processCommand($("#input input").val());
	}
});


for(i=0,ii=tabs.length;i<ii;i++) {
	$("#tabs ul").prepend("<li data-tab='"+i+"'>"+tabs[i].name+"</li>");
	$("#terminal pre").text(tabs[i].terminalResult);
	$("#input input").val(tabs[i].terminalInput);
}

$(".nano").nanoScroller();

$("#terminal .nano").nanoScroller({ scroll: "bottom" });

$("#input input").focus();

var commands = {

	"clear": function() {
		$("#terminal pre").text("");
		return null;
	},
	"help": function(input) {
		var split = input,
			first = split.shift(),
			text = "";

		if(typeof first === "undefined") {
			first = "";
		}

		text = helpCommands[first] ? helpCommands[first](split) : helpCommands._default(input);

		return text;
	},
	"shit": function() {
		$("body").append("<div id='shit'><img src='/images/poop.jpg' alt='poop'></div>");
		$("#shit").on("click", function() {
			alert("You asked for it punk!");
			$("#shit").off("click");
			$("#shit").on("click", function() {
				$(this).remove();
			});
		});
	},
	"this": function(input) {
		var split = input,
			first = split.shift(),
			text = "";

		if(typeof first === "undefined") {
			first = "";
		}

		text = thisCommands[first] ? thisCommands[first](split) : thisCommands._default("this"+input);

		return text;
	},
	"": function() {
		return "\n";
	},
	"_default": function(input) {
		return "The command '"+input+"' does not exist!";
	}
};

var helpCommands = {
	"": function() {
		return "This is all the help you get!";
	},
	"clear": function() {
		return "Clears the terminal for you";
	},
	"connect": function() {
		return "This is all the help you get about connect!";
	},
	"_default": function(input) {
		return "There is no help for '"+input+"'!";
	}
};

var thisCommands = {
	"": function() {
		return "This what?";
	},
	"is": function(input) {
		var split = input,
			first = split.shift();

		if(typeof first === "undefined") {
			first = "";
		}

		if(first.indexOf("madness") !== -1) {
			return "This is sparta!!!";
		} else {
			return "This is what?";
		}
	},
	"_default": function(input) {
		return commands._default(input);
	}
};


function processCommand(input) {
	var split = input.split(" "),
		first = split.shift(),
		text = "";

	$("#terminal pre").append(input+"\n");

	text = commands[first] ? commands[first](split) : commands._default(input);

	if(text !== null) {
		$("#terminal pre").append(text+"\n");
	}

	$("#input input").val("");

	$(".nano").nanoScroller();

	$("#terminal .nano").nanoScroller({ scroll: "bottom" });
}

function generateServer(index) {
	var hardDrive = {
		etc: {

		}
	};
}


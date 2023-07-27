// HTML refrences
var startBtn = $(".start-btn");
var timerSpan = $("#timer-span");
var introSec = $(".intro");
var questionSections = $(".question-section");

// Global variables
var i = 0;
var timer = 60;
var answers = ["b", "b", "a", "c"];

function loadNextQuestion(index) {
	questionSections.eq(index - 1).hide();
	questionSections.eq(index).show();
}

startBtn.on("click", function () {
	// setInterval(() => {
	// 	timer--;
	// 	timerSpan.text(timer);
	// }, 1000);
	introSec.hide();
	loadNextQuestion(i);
});

$(document).on("click", function (event) {
	if (event.target.dataset.option === "op" && event.target.parentElement.dataset.answered !== "answered" && event.target.id === answers[i]) {
		console.log("correct");
		event.target.parentElement.dataset.answered = "answered";
		i++;
		setInterval(() => {
			loadNextQuestion(i);
		}, 5000);
	} else if (event.target.dataset.option === "op" && event.target.parentElement.dataset.answered !== "answered" && event.target.id !== answers[i]) {
		console.log("incorrect");
		event.target.parentElement.dataset.answered = "answered";
		i++;
		setInterval(() => {
			loadNextQuestion(i);
		}, 5000);
	}
});

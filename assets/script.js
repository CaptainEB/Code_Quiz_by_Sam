// HTML refrences
var startBtn = $(".start-btn");
var timerSpan = $("#timer-span");
var introSec = $(".intro");
var questionSections = $(".question-section");
var scoreSec = $(".score-screen");
var scoreSpan = $("#score-span");

// Global variables
var timer = 60;
var answers = ["b", "b", "a", "c"];
var i = 0;
var correct = 0;

function loadNextQuestion(index) {
	questionSections.eq(index - 1).hide();
	questionSections.eq(index).show();
}

function showScore() {
	var grade = 0;
	grade = correct * (100 / questionSections.length);
	scoreSec.show();
	scoreSpan.text(grade);
	return grade;
}

startBtn.on("click", function () {
	var timerInterval = setInterval(() => {
		timer--;
		timerSpan.text(timer);
		if (i >= 4) {
			clearInterval(timerInterval);
			timerSpan.text(0);
			setTimeout(showScore, 2700);
		}
	}, 1000);
	introSec.hide();
	loadNextQuestion(i);
});

$(document).on("click", function (event) {
	if (event.target.dataset.option === "op" && event.target.parentElement.dataset.answered !== "answered" && event.target.id === answers[i]) {
		console.log("correct");
		event.target.parentElement.dataset.answered = "answered";
		event.target.style.backgroundColor = "green";
		correct++;
		i++;
		setTimeout(function () {
			loadNextQuestion(i);
		}, 3000);
	} else if (event.target.dataset.option === "op" && event.target.parentElement.dataset.answered !== "answered" && event.target.id !== answers[i]) {
		console.log("incorrect");
		event.target.parentElement.dataset.answered = "answered";
		event.target.style.backgroundColor = "red";
		i++;
		setTimeout(function () {
			loadNextQuestion(i);
		}, 3000);
	}
});

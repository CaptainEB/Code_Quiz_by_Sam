// HTML refrences ----> index.html
var startBtn = $(".start-btn");
var timerSpan = $("#timer-span");
var introSec = $(".intro");
var questionSections = $(".question-section");
var scoreSec = $(".score-screen");
var scoreSpan = $("#score-span");
var userInput = $(".input");
var submitBtn = $(".submit-btn");

//HTML refrences ----> scores.html
var highScoresPage = $("#scores-ul");

// Global variables
var timer = 60;
var answers = ["b", "b", "a", "c"];
var i = 0;
var correct = 0;
var users = [];
var user = {
	name: "name",
	score: 0,
};

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

// click handler for start button
startBtn.on("click", function () {
	var timerInterval = setInterval(() => {
		timer--;
		timerSpan.text(timer);
		if (i >= 4 || timer <= 0) {
			clearInterval(timerInterval);
			timerSpan.text(0);
			$("#empty").empty();
			setTimeout(showScore, 2700);
		}
	}, 1000);
	introSec.hide();
	loadNextQuestion(i);
});

// click handler for questions
$(document).on("click", function (event) {
	if (
		event.target.dataset.option === "op" &&
		event.target.parentElement.dataset.answered !== "answered" &&
		event.target.id === answers[i] &&
		timer > 0
	) {
		console.log("correct");
		event.target.parentElement.dataset.answered = "answered";
		event.target.style.backgroundColor = "green";
		correct++;
		i++;
		setTimeout(function () {
			loadNextQuestion(i);
		}, 3000);
	} else if (
		event.target.dataset.option === "op" &&
		event.target.parentElement.dataset.answered !== "answered" &&
		event.target.id !== answers[i] &&
		timer > 0
	) {
		console.log("incorrect");
		event.target.parentElement.dataset.answered = "answered";
		event.target.style.backgroundColor = "red";
		i++;
		setTimeout(function () {
			loadNextQuestion(i);
		}, 3000);
	}
});

// click handler for submit button
submitBtn.on("click", function (event) {
	var input = userInput.val().trim();
	var finalGrade = showScore();
	user.name = input;
	user.score = finalGrade;
	users = JSON.parse(localStorage.getItem("users")) || [];
	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));
});

// this updates the local storage
highScoresPage.empty();
users = JSON.parse(localStorage.getItem("users")) || [];
for (var j = 0; j < users.length; j++) {
	var li = $("<li>");
	li.text(users[j].name + ": " + users[j].score);
	highScoresPage.append(li);
}

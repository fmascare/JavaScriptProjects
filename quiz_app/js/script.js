var currentQ = 0;
var maxQ = 5;
var goodScore = Math.floor(maxQ*0.7);
var avgScore = Math.floor(maxQ*0.3);
const quizArr = [];
var curr = "";
var score = 0;
var submit = document.getElementById("btn");
var answers = document.querySelectorAll('.selected');
var quizData = [
    {
        question: 'What is the capital of Alabama?',
        a: 'Birmingham',
        b: 'Auburn',
        c: 'Huntsville',
        d: 'Montgomery',
        answer: 'd'
    }, {
        question: 'What is the capital of Alaska?',
        a: 'Ketchikan',
        b: 'Juneau',
        c: 'Fairbanks',
        d: 'Anchorage',
        answer: 'b'
    }, {
        question: 'What is the capital of Arizona?',
        a: 'Phoenix',
        b: 'Sedona',
        c: 'Tucson',
        d: 'Scottsdale',
        answer: 'a'
    }, {
        question: 'What is the capital of Arkansas?',
        a: 'Hot Springs',
        b: 'Fayetteville',
        c: 'Little Rock',
        d: 'Bentonville',
        answer: 'c'
    }, {
        question: 'What is the capital of California?',
        a: 'San Francisco',
        b: 'San Diego',
        c: 'Los Angeles',
        d: 'Sacramento',
        answer: 'd'
    }, {
        question: 'What is the capital of Colorado?',
        a: 'Breckenridge',
        b: 'Denver',
        c: 'Aspen',
        d: 'Boulder',
        answer: 'b'
    }, {
        question: 'What is the capital of Connecticut?',
        a: 'Hartford',
        b: 'Stamford',
        c: 'New Haven',
        d: 'Bridgeport',
        answer: 'a'
    }, {
        question: 'What is the capital of Delaware?',
        a: 'Newark',
        b: 'New Castle',
        c: 'Dover',
        d: 'Wilmington',
        answer: 'c'
    }, {
        question: 'What is the capital of Florida?',
        a: 'Tampa',
        b: 'Tallahassee',
        c: 'Miami',
        d: 'Orlando',
        answer: 'b'
    }, {
        question: 'What is the capital of Georgia?',
        a: 'Athens',
        b: 'Augusta',
        c: 'Savannah',
        d: 'Atlanta',
        answer: 'd'
    }, {
        question: 'What is the capital of Hawaii?',
        a: 'Hilo',
        b: 'Kailua',
        c: 'Honolulu',
        d: 'Lahaina',
        answer: 'c'
    }, {
        question: 'What is the capital of Idaho?',
        a: 'Idaho Falls',
        b: 'Boise',
        c: 'Twin Falls',
        d: 'Idaho City',
        answer: 'b'
    }, {
        question: 'What is the capital of Illinois?',
        a: 'Springfield',
        b: 'Champaign',
        c: 'Peoria',
        d: 'Chicago',
        answer: 'a'
    }, {
        question: 'What is the capital of Indiana?',
        a: 'Fort Wayne',
        b: 'Evansville',
        c: 'Bloomington',
        d: 'Indianapolis',
        answer: 'd'
    }, {
        question: 'What is the capital of Iowa?',
        a: 'Davenport',
        b: 'Des Moines',
        c: 'Cedar Rapids',
        d: 'Iowa City',
        answer: 'b'
    }, {
        question: 'What is the capital of Kansas?',
        a: 'Topeka',
        b: 'Kansas City',
        c: 'Wichita',
        d: 'Lawrence',
        answer: 'a'
    }, {
        question: 'What is the capital of Kentucky?',
        a: 'Louisville',
        b: 'Bowling Green',
        c: 'Frankfort',
        d: 'Lexington',
        answer: 'c'
    }, {
        question: 'What is the capital of Louisiana?',
        a: 'Shreveport',
        b: 'Baton Rouge',
        c: 'New Orleans',
        d: 'Lafayette',
        answer: 'b'
    }, {
        question: 'What is the capital of Maine?',
        a: 'Augusta',
        b: 'Portland',
        c: 'Bar Harbor',
        d: 'Bangor',
        answer: 'a'
    }, {
        question: 'What is the capital of Maryland?',
        a: 'Baltimore',
        b: 'Ocean City',
        c: 'Maryland City',
        d: 'Annapolis',
        answer: 'd'
    }, {
        question: 'What is the capital of Massachusetts?',
        a: 'Cambridge',
        b: 'Worcester',
        c: 'Boston',
        d: 'Plymouth',
        answer: 'c'
    }, {
        question: 'What is the capital of Michigan?',
        a: 'Lansing',
        b: 'Detroit',
        c: 'Grand Rapids',
        d: 'Ann Arbor',
        answer: 'a'
    }, {
        question: 'What is the capital of Montana?',
        a: 'Bozeman',
        b: 'Big Sky',
        c: 'Helena',
        d: 'Whitefish',
        answer: 'c'
    }, {
        question: 'What is the capital of Nebraska?',
        a: 'Nebraska City',
        b: 'Lincoln',
        c: 'Grand Island',
        d: 'Omaha',
        answer: 'b'
    }, {
        question: 'What is the capital of Nevada?',
        a: 'Carson City',
        b: 'Las Vegas',
        c: 'Reno',
        d: 'Sparks',
        answer: 'a'
    }, {
        question: 'What is the capital of New Mexico?',
        a: 'Las Cruces',
        b: 'Roswell',
        c: 'Santa Fe',
        d: 'Albuquerque',
        answer: 'c'
    }, {
        question: 'What is the capital of New York?',
        a: 'New York City',
        b: 'Albany',
        c: 'Buffalo',
        d: 'Rochester',
        answer: 'b'
    }, {
        question: 'What is the capital of North Dakota?',
        a: 'Fargo',
        b: 'Minot',
        c: 'Grand Forks',
        d: 'Bismarck',
        answer: 'd'
    }, {
        question: 'What is the capital of Oregon?',
        a: 'Portland',
        b: 'Eugene',
        c: 'Salem',
        d: 'Bend',
        answer: 'c'
    }, {
        question: 'What is the capital of Pennsylvania?',
        a: 'Scranton',
        b: 'Philadelphia',
        c: 'Pittsburgh',
        d: 'Harrisburg',
        answer: 'd'
    }, {
        question: 'What is the capital of Texas?',
        a: 'Dallas',
        b: 'Houston',
        c: 'Austin',
        d: 'San Antonio',
        answer: 'c'
    }, {
        question: 'What is the capital of Utah?',
        a: 'Ogden',
        b: 'Moab',
        c: 'St. George',
        d: 'Salt Lake City',
        answer: 'd'
    }, {
        question: 'What is the capital of Vermont?',
        a: 'Montpelier',
        b: 'Burlington',
        c: 'Rutland',
        d: 'Stowe',
        answer: 'a'
    }, {
        question: 'What is the capital of Virginia?',
        a: 'Norfolk',
        b: 'Virginia Beach',
        c: 'Alexandria',
        d: 'Richmond',
        answer: 'd'
    }, {
        question: 'What is the capital of Wyoming?',
        a: 'Jackson',
        b: 'Cheyenne',
        c: 'Casper',
        d: 'Cody',
        answer: 'b'
    }
];
var randomQ = Math.floor(Math.random() * quizData.length);


function loadTrivia() {
    quizArr.push(randomQ);
    curr = quizData[randomQ];
    document.getElementById("question").innerHTML = curr.question;
    document.getElementById("opt1").innerHTML = curr.a;
    document.getElementById("opt2").innerHTML = curr.b;
    document.getElementById("opt3").innerHTML = curr.c;
    document.getElementById("opt4").innerHTML = curr.d;
}

submit.addEventListener("click", () => {
    
    var userAnswer = findSelectedAns();
    //console.log(userAnswer);
    
    if (userAnswer != undefined) {
        if(userAnswer == curr.answer) {
            score++;
        }
        currentQ++;
        if (currentQ < maxQ) {
            deSelectOption()
            while (quizArr.includes(randomQ)) {
                randomQ = Math.floor(Math.random() * quizData.length);
            }
            loadTrivia();
        }
        else {
            // Display the number of correct answers
            var resultText = "";
            resultText = "<h2>Trivia Results</h2>";
            resultText += "<h2>Score: " + score + " / " + maxQ + "</h2>";
            if (score > goodScore) {
                resultText += "<h2>Well done! You know the US States pretty well :)</h2><br>";
            }
            else if (score > avgScore) {
                resultText += "<h2>You can do better than this! Reload the trivia and try again!</h2><br>";
            }
            else {
                resultText += "<h2>Dont fret! Maybe Google might help next time... :)</h2><br>";
            }
            resultText += "<button onClick='location.reload()'>Reload</button>";
            document.getElementById("result").innerHTML = resultText;
            document.getElementById("result").style.position = "relative";
            document.getElementById("result").style.top = "14px";
            document.getElementById("result").style.lineHeight = "1.5";
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.zIndex = "2";
            if (score > goodScore) {
                window.onload = startConfetti();
            }
        }
    }
});

function deSelectOption() {
    answers.forEach((ans) => {
        ans.checked = false;
    });
}

function findSelectedAns() {
    var found = undefined;
    answers.forEach((ans) => {
        if(ans.checked) {
            found = ans.id;
        }
    });
    return found;
}

//initial call
loadTrivia();
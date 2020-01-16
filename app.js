var app = angular.module("HangmanApp", []);
app.controller("GameController", ['$scope', '$timeout', function ($scope, $timeout) {
    var words = ["course", "helper", "effect", "matter", "lion", "Altassian", "Remember", "Mountain", "Pokemon"];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guesses = 6;
    $scope.custom= {
        "color" : "white",
        "background-color" : "gray",
        "height" : "50px",
        "width" : $scope.guesses*5+"0px"
    }
    $scope.displayWord = '';
    $scope.input = {
        letter: ''
    }
    $scope.symbol = false;
    var selectRandomWord = function () {
        var index = Math.floor(Math.random() * words.length);
        console.log(index);
        return words[index];
    }

    var barThing=function(){
      
        var divs = angular.element(document.querySelector("box"));
        divs.attr('width', $scope.guesses*4+"0px");
        alert("divs");
    }
    $scope.play = function () {
        document.getElementById("end").innerHTML = "<p>You have to guess the hidden word :  </p>";
        newGame();
    };
    function resetSymbol() {
        $scope.symbol = false;
    };
    var newGame = function () {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = '';
        selectedWord = selectRandomWord();
        // console.log(selectedWord);
        var tempDisplayWord = '';
        for (var index = 0; index < selectedWord.length; index++) {
            tempDisplayWord += "*";
        }
        $scope.displayWord = tempDisplayWord;
    }


    $scope.letterChosen = function func1() {

        if ($scope.input.letter == undefined) {
            $scope.input.letter = "";
            return;
        } else {
            $scope.symbol = true;
            for (var ch of $scope.correctLettersChosen) {
                if (ch.toLowerCase() == $scope.input.letter.toLowerCase()) {
                    $scope.input.letter = "";
                    //console.log(ch + " in correct for loop");
                    alert("the letter is already entered...");
                    return;
                }
            }
            for (var cha of $scope.incorrectLettersChosen) {
                if (cha.toLowerCase() == $scope.input.letter.toLowerCase()) {
                    $scope.input.letter = "";
                    //console.log(cha + " in incorrect for loop");
                    alert("the letter is already entered...");
                    return;
                }
            }
            var correct = false;
            var count = 0;
            for (const c of selectedWord) {
                if (count == 0) {
                    var j = selectedWord.indexOf(c);
                }
                else {
                    j = selectedWord.indexOf(c, j + 1);
                }
                if (c.toLowerCase() == $scope.input.letter.toLowerCase()) {
                    count++;
                    $scope.displayWord = $scope.displayWord.slice(0, j) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(j + 1);
                    // console.log(c + " in compare for loop of SelectedWord at index " + j);
                    correct = true;
                }
            }

            if (correct) {
                $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
                // console.log(correct);
                // console.log($scope.correctLettersChosen);
                document.getElementById("symb").innerHTML = "<h4>Correct guess!</h4>";
            } else {
                if ($scope.guesses > 0) {
                    $scope.guesses--;
                    barThing();
                    $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
                    document.getElementById("symb").innerHTML = "<h4>Incorrect guess!</h4>";
                }
            }
            $timeout(function () {
                resetSymbol();
            }, 1000);
            $scope.input.letter = "";
            if ($scope.guesses == 0) {
                alert("You lost as Number of Guesses is over..!");
                document.getElementById("end").innerHTML = "<h4>Sorry. You Lost..!!</h4>";
                $timeout(function () {
                    newGame();
                }, 1000);
            }
            if ($scope.displayWord.indexOf("*") == -1) {
                $scope.symbol = true;
                document.getElementById("symb").innerHTML = "<h4>You Won..!!</h4>";
                document.getElementById("end").innerHTML = "<h4>You guessed it right..!!</h4>";
                $timeout(function () {
                    alert("You won...!!");
                }, 2000);


                // $timeout(function () {
                //     var output = window.confirm("Do you want to Play Again");
                //     if (output){
                //         newGame();
                //         $scope.symbol = false;
                //     }
                // },1500);
            }
        }

    }
    newGame();

}]);

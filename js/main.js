'use strict';

var app = angular.module('TTT', [
	'ngRoute'
	]);

app.controller('MainCtrl', function($scope) {
	$scope.cells = ['_','_','_','_','_','_','_','_','_'];
	$scope.winner = '';
	$scope.moves = 0;
	$scope.gameover = false;

	// assume o is +1 and x is -1
	// row row row, col col col, diagonal diagonal = 8 win conditions
	// if any of them total 3 or -3, winner is found
	$scope.scores = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0};

	$scope.resetBoard = function() {
		$scope.winner = '';
		$scope.resetScores();
		$scope.resetCells();
		$scope.resetMoves();
	}

	$scope.resetScores = function() {
		for(var i = 0; i < 8; i++) {
			$scope.scores[i] = 0;
		}
	}

	$scope.resetCells = function() {
		$scope.cells.forEach(function(ele, index) {
			$scope.cells[index] = '_';
		});

		$scope.gameover = false;
	}

	$scope.resetMoves = function() {
		$scope.moves = 0;
	}

	$scope.fillCell = function(index) {
		if($scope.moves >= 9) {
			$scope.checkWinner();
		}

		if($scope.cells[index] !== '_' || $scope.gameover === true) {
			return;
		}

		if($scope.moves % 2 === 0) {
			$scope.cells[index] = 'o';
			$scope.updateScore(index, +1);
		} else {
			$scope.cells[index] = 'x';
			$scope.updateScore(index, -1);
		}
		$scope.checkWinner();
		$scope.moves++;
	}

	$scope.updateScore = function(index, updateBy) {
		// rows
		if(index/3 < 1)
			$scope.scores[0] += updateBy; // first row
		else if (index/3 < 2)
			$scope.scores[1] += updateBy; // second row
		else if (index/3 < 3)
			$scope.scores[2] += updateBy; // third row

		if(index%3 === 0)
			$scope.scores[3] += updateBy; // first col
		else if(index%3 === 1)
			$scope.scores[4] += updateBy; // second col
		else if(index%3 === 2)
			$scope.scores[5] += updateBy; // third col

		if(index === 0 || index === 4 || index === 8)
			$scope.scores[6] += updateBy; // left to right diag

		if(index === 2 || index === 4 || index === 6)
			$scope.scores[7] += updateBy; // right to left diag
	}

	$scope.checkWinner = function() {
		for(var i = 0; i < 8; i++) {
			if($scope.scores[i] === 3)
				$scope.winner = 'o';
			else if ($scope.scores[i] === -3)
				$scope.winner = 'x';
		}

		if($scope.moves >= 8 && $scope.winner == '') {
			$scope.winner = 'Tie!';
		}
	}

	// highlights the cells used to win the match
	$scope.highlightWin = function() {

	}

	$scope.$watch('winner', function(newVal, oldVal) {
		if(newVal !== '') {
			$scope.gameover = true;
			
		}
	});
});
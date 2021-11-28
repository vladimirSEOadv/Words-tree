let userInput = document.querySelector('#main-keyword');
let buttonCreateTree = document.querySelector('#create-tree');
let keysInUserInput = document.querySelector('#words');
let buttonDownloadWords = document.querySelector('#download-words');
let wordsCounter = document.querySelector('.word-counter')
let keysForWordsTree = [["Ключевые слова"]];

buttonDownloadWords.addEventListener('click', createArrOfWords); //Получение семантики
userInput.addEventListener('change', getUserMainKey); // Получение базового слова

google.load("visualization", "1.1",
	{ packages: ["wordtree"] });
google.setOnLoadCallback(drawChart);

let options = {
	maxFontSize: 25,
	minFontSize: 15,
	wordtree: {
		format: 'implicit',
		word: ''
	}
};

function getUserMainKey() { //Выбор базового слова и запуск отрисовки
	options.wordtree.word = userInput.value;
	drawChart(options);
}

function drawChart(options) { // Отрисовка диаграммы
	let data = google.visualization.arrayToDataTable(keysForWordsTree);
	let chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
	chart.draw(data, options);
}

function createArrOfWords() { // Формирование массива ключевых слов
	keysForWordsTree = [];
	let arrOfKeysInUserInput = Array.from(new Set(keysInUserInput.value.split("\n")));

	for (i = 0; i < arrOfKeysInUserInput.length; i++) {
		keysForWordsTree.push([arrOfKeysInUserInput[i]]);
	};
	wordsCounter.textContent = `Фраз в массиве ${arrOfKeysInUserInput.length}`
};

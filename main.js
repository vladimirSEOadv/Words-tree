let userInput = document.querySelector('#main-keyword');
let keysInUserInput = document.querySelector('#words');
let wordsCounter = document.querySelector('.word-counter')
let keysForWordsTree = [["Ключевые слова"]];
let wordTreeChartElement = document.getElementById('wordtree_basic')

keysInUserInput.addEventListener('change', createArrOfWords); //Получение семантики
userInput.addEventListener('change', getUserMainKey); // Получение базового слова

google.load("visualization", "1.1",
	{ packages: ["wordtree"] });
google.setOnLoadCallback(drawChart);

let options = {
	maxFontSize: 50,
	minFontSize: 20,
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
	let chart = new google.visualization.WordTree(wordTreeChartElement);
	chart.draw(data, options);
}

function createArrOfWords() { // Формирование массива ключевых слов
	keysForWordsTree = [];
	let arrOfKeysInUserInput = Array.from(new Set(keysInUserInput.value.split("\n")));
	for (i = 0; i < arrOfKeysInUserInput.length; i++) {
		keysForWordsTree.push([arrOfKeysInUserInput[i]]);
	};
	wordsCounter.textContent = `Фраз в массиве ${arrOfKeysInUserInput.length}`;
	drawChart(options);
};

wordTreeChartElement.addEventListener('click', (e) => console.log(e.target.innerHTML))

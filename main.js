"use strict";

const fs = require("fs");

const pathes = [
	"./data1.csv",
	"./data2.csv",
	"./data3.csv",
]

const getAvg = (data) => {
	const newData = new Map();

	for(const field of data) {
		const [language, value] = field;

		const avr = value.reduce((acc, val) => acc + val) / value.length;

		newData.set(language, avr);
	}

	return newData;
}

const getData = (pathes) => {
	const data = new Map();

	for (const path of pathes) {
		const lines = fs.readFileSync(path, "utf8").split("\n");
		lines.pop();

		for (const line of lines) {
			const [language, value] = line.split(",");
			
			if (!data.has(language)) {
				data.set(language, [parseFloat(value)])
			} else {
				data.set(language, [...data.get(language), parseFloat(value)]);
			}
		}
	}
	
	return getAvg(data);
}

const printSorted = (data) => {
	const array = [...data];
	array.sort((a, b) => a[1] > b[1] ? 1 : -1);

	console.log("  LANGUAGE\tAVERAGE VALUE");
	for(const [language, value] of array) {
		console.log(`${language.padStart(10)}\t${value.toFixed(2)}`);
	}
}

const data = getData(pathes);
printSorted(data);

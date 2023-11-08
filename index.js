const input = document.querySelector("#input");
const words_to_change = document.querySelector("#words_to_change");
const redactr = document.querySelector("#redactr");
const output = document.querySelector("#output");
const getResult = document.querySelector("input[type='button']");
const other_info = document.querySelector("#other_info");
const time_used = document.querySelector("#time_used");
const scanned_words = document.querySelector("#scanned_words");
const matched_words = document.querySelector("#matched_words");
const matched_characters = document.querySelector("#matched_characters");
const pattern1 = /[A-Za-z0-9]+/;
let characterRedactr = false;
let censored_words = "";
let input_copy = "";
let matching_words = [];

// OTHER THINGS TO ADD
// BETTER CODE STRUCTURE
// WHAT IF THE WORDS TO BE REPLACED WERE REPEATED

// n is the length of the word
const characterMultiplier = (character, n) => {
  let result = "";
  while (n > 0) {
    result = result + character;
    n = n - 1;
  }

  return result;
};

const wordsMatcher = () => {
  for (let word of words_to_change.value) {
    if (word.search) {
    }
  }
};

const runRedact = () => {
  var startTime = performance.now();
  if (input.value.length === 0) {
    console.log("Enter two words or more.");
  }

  if (words_to_change.value.length === 0) {
    console.log("Enter a word or words to be censored separated by a comma.");
  } else {
    censored_words = words_to_change.value.split(" ");
  }

  if (redactr.value.length === 0) {
    redactr.value = "#";
  } else if (redactr.value.length === 1) {
    characterRedactr = true;
  } else if (redactr.value.length > 1) {
    characterRedactr = false;
  }

  redactrValue = redactr.value;
  input_copy = input.value;

  for (let word of censored_words) {
    let censored_result = "";
    characterRedactr === true
      ? (censored_result = characterMultiplier(redactrValue, word.length))
      : (censored_result = redactrValue);

    const regex = new RegExp(`${word}`, "g");
    console.log(regex);

    input_copy = input_copy.replace(regex, censored_result);
  }

  console.log(input_copy);

  var endTime = performance.now();
  let timeOfProcess = (endTime - startTime) * 0.001;
  time_used.innerHTML = timeOfProcess.toFixed(4) + "s";

  console.log((endTime - startTime) * 0.001);
  console.log("startTime: ", startTime);
  console.log("endTime: ", endTime);
};

getResult.addEventListener("click", runRedact);

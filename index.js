const input = document.querySelector("#input");
const words_to_change = document.querySelector("#words_to_change");
const redactr = document.querySelector("#redactr");
const output = document.querySelector("#result");
const getResult = document.querySelector("input[type='button']");
const other_info = document.querySelector("#other_info");
const time_taken = document.querySelector("#time_taken");
const scanned_words = document.querySelector("#words_scanned");
const matched_words = document.querySelector("#words_matched");
const matched_characters = document.querySelector("#characters_matched");
const errorsBox = document.querySelector("#errors");
const pattern1 = /[A-Za-z0-9]+/;
let characterRedactr = false;
let censored_words = "";
let input_copy = "";
let matching_words = [];
let resultTabDisabled = true;

//DISABLE EDITABLE PROPERTY OF THE TEXT AREA
output.disabled = true;

//RESET VARIABLES
const resetVars = () => {
  matching_words = [];
  censored_words = "";
  errorsBox.innerHTML = "";
};

// CONTROLLER FOR TAB
const openTab = (event, tabName) => {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  if (
    tabName == "result_div" &&
    event.currentTarget.className.includes("disabled")
  ) {
    return;
  } else {
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  }
};

document.querySelector("#defaultOpen").click();

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
  // console.log("CENSORED WORDS: ", censored_words);
  for (let censored_word of censored_words) {
    let pattern = new RegExp(`${censored_word}`, "g");
    let matches = [...input.value.matchAll(pattern)];

    for (let match of matches) {
      matching_words.push(match);
    }
  }
  matched_words.innerHTML = matching_words.length;
};

const characterMatcher = () => {
  // return matching_words.join('').length;
  matched_characters.innerHTML = matching_words.join("").length;
};

const wordsScanner = () => {
  return input.value.length;
};

const runRedact = () => {
  resetVars();
  var startTime = performance.now();
  if (input.value.length === 0) {
    errorsBox.innerHTML = "Enter two words or more.";
    errorsBox.style.display = "block";
  }

  if (words_to_change.value.length === 0) {
    errorsBox.innerHTML =
      "Enter a word or words to be censored separated by a comma.";
    errorsBox.style.display = "block";
  } else {
    censored_words = words_to_change.value.split(" ");
  }

  if (redactr.value.length === 0) {
    redactr.value = "#";
    characterRedactr = true;
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
    // console.log(regex);

    input_copy = input_copy.replace(regex, censored_result);
  }

  // console.log(input_copy);
  if (resultTabDisabled === true) {
    document.querySelector("#resultBtn").classList.remove("disabled");
  }
  document.querySelector("#resultBtn").click();
  output.value = input_copy;

  var endTime = performance.now();
  let timeOfProcess = (endTime - startTime) * 0.001;
  time_taken.innerHTML = timeOfProcess.toFixed(4) + "s";
  scanned_words.innerHTML = wordsScanner();
  wordsMatcher();
  characterMatcher();

  // console.log((endTime - startTime) * 0.001);
  // console.log("startTime: ", startTime);
  // console.log("endTime: ", endTime);
};

getResult.addEventListener("click", runRedact);

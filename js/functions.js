function checkSentence(sentence, symbolsAmount) {
  if (sentence.length <= symbolsAmount) {
    return true;
  }
  return false;
}

function checkPolindrom(word) {
  const wordForCheck = word
    .replaceAll(' ', '')
    .toLowerCase();
  let reverseWord = '';
  for (let i = wordForCheck.length - 1; i >= 0; i--) {
    reverseWord += wordForCheck.at(i);
  }
  return reverseWord === wordForCheck;
}

function extractNumber(maybeString) {
  let number = '';
  const string = String(maybeString);

  for (let i = 0; i < string.length; i++) {
    if (Number.isInteger(parseInt(string.at(i), 10))) {
      number += string.at(i);
    }
  }
  if (number === '') {
    return NaN;
  }
  return parseInt(number, 10);
}

function padStart(originalString, minLength, addSymbols) {
  const difference = minLength - originalString.length;
  if (difference <= 0) {
    return originalString;
  }
  return addSymbols.slice(0, difference % addSymbols.length) + addSymbols.repeat(difference / addSymbols.length) + originalString;
}

checkSentence('проверяемая строка', 20);
checkPolindrom('топот');
extractNumber('1 кефир, 0.5 батона');
padStart('qwerty', 4, '0');

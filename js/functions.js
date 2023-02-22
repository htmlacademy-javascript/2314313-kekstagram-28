function checkSentence(sentence, symbolsAmount) {
    if (sentence.length === symbolsAmount) {
        return true
    }
    return false
}

function checkPolindrom(word) {
    let wordForCheck = word
        .replaceAll(' ', '')
        .toLowerCase();
    let reverseWord = '';
    for (let i = 0; i < wordForCheck.length; i++) {
        reverseWord += wordForCheck.at(wordForCheck.length - i - 1);
    }
    return reverseWord === wordForCheck
}

function extractNumber(string) {
    let number = '';
    for (i = 0; i < string.length; i++) {
        if (Number.isInteger(parseInt(string.at(i), 10))) {
            number += string.at(i);
        }
    }
    if (number === '') {
        return NaN
    }
    return parseInt(number, 10)
}

function padStart(originalString, minLength, addSymbols) {
    let difference = minLength - originalString.length;
    if (originalString.length >= minLength) {
        return originalString
    }
    return addSymbols.slice(0, difference % addSymbols.length) + addSymbols.repeat(difference / addSymbols.length) + originalString
}







function isValidWord(word) {
    return /^[a-zA-Z]+$/.test(word);
}

async function searchWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('meaning');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.title == "No Definitions Found") {
        resultsContainer.textContent = 'Word not found';
        return;
    }

    const word = data[0].word;
    const meanings = data[0].meanings;
    const phonetics=data[0].phonetics;
    resultsContainer.innerHTML = `<h2>${word}</h2>`;
    
    phonetics.forEach(ph=>{
        if(ph.text!==undefined){
        resultsContainer.innerHTML+=`<p id="ph">${ph.text}</p>`
        }
    })
    meanings.forEach(meaning => {
        resultsContainer.innerHTML += `<div id="def"><p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p><p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p></div>`;
    });
}

document.getElementById('search').addEventListener('click', async () => {
    const word = document.getElementById('inputtext').value.trim();

    if (!isValidWord(word)) {
        alert('Please enter a valid word (only alphabets).');
        return;
    }

    const data = await searchWord(word);
    displayResults(data);
});

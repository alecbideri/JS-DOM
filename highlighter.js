// select the paragraph element 

// Make all the text lower case remove all the punctuations 
// count the words 
// select words with high frequency 
// reconstruct the paragraph after the selection of those with high frequency 
// highlight the ones that are high in frequency and underline the one that starts with capital letter 

document.addEventListener("click" , ()=> {
    
    // selecting the text paragraph into a variable and access it using textContent 

    const paragraph = document.getElementById("myParagraph");
    const text = paragraph.textContent;

    // Normalize all the text , remove the punctuations 

    const words = text
        .toLowerCase()
        .replace(/[.,;!?]/g , "") // removing all the punctuations 
        .split(/\s+/); // splitting consistently the words by space 
    
    // count words occurrences using a loop and store them in a loop , where a word is a key and value its times of occurence 

    const wordCounts  = {};

    for(let word of words){
        if(wordCounts[word]){
            wordCounts[word] ++ ;
        }else{
            wordCounts[word] = 1 ;
        }
    }
 
    // add all the collections from the object to an array for sorting 

    const sortedWords = [];

    for (let word in wordCounts){
        sortedWords.push([word , wordCounts[word]]);
    }

    // sort in a descending order 

    sortedWords.sort((a,b) => b[1] - a[1]);

    // make a shallow copy of the top 5 words with high frequency and select one time per the array using map 

    const topWords = sortedWords.slice(0,5).map(entry => entry[0]);

    // highlight the words with high frequency 

    const originalWords = paragraph.textContent.split(/\s+/); // select again the same paragraph using textContent
    paragraph.innerHTML = originalWords
        .map(word =>{
            const cleanedWord = word.replace(/[.,;!?]/g, "").toLowerCase(); // remove all the punctuations 
            if(topWords.includes(cleanedWord)){  // check if the word is in the array 
                const isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase(); // check if the word first letter is uppercase 
                return `<span style ="background-color : yellow; ${isCapitalized ? "text-decoration : underline;" :""}">${word}</span>`; // use inline container to highlight the text .
            }

            return word ; // if the word doesn't check we return the word as it is !!
        })
        .join(" ");  // the paragraph is updates using innerHTML and joined back to a string 
    
});

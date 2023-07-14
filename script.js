const source = document.querySelector("#source");
const target = document.querySelector("#target");
const input = document.querySelector("input");
const div= document.querySelector("div");




async function Languages() {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages';
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'd828830533msh4f48069ad572decp16dd6fjsne8f1133fa75f',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const {data} = await response.json();
        let { languages } = data
        console.log(languages)
        return languages
    } catch (error) {
        console.error(error);
    }
}










async function getLang(){
    let languages = await Languages();
    for(let lang of languages){
        source.innerHTML+= `<option value="${lang.language}">${lang.language}</option>`
        target.innerHTML+= `<option value="${lang.language}">${lang.language}</option>`
    }
}
getLang()







async function translates(source, target, text) {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'ef94256800mshb0ea3d753299dfdp14a426jsnc8fb6bc3c6b8',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: text,
            target,
            source
        })
    };

    try {
        const response = await fetch(url, options);
        const {data} = await response.json();
        const {translations} = data
        div.innerHTML+=`<p>${translations[0].translatedText}</p>`
        return translations[0].translatedText
    } catch (error) {
        console.error(error);
    }
}




async function Translate(){
    translates(source.value, target.value, input.value)
}


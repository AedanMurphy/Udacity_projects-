import { checkURL } from "./nameChecker";


async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

 

    if (Client.checkURL(formText)) {
        console.log("::: Form Submitted :::")
        const fetchResponse = await fetch('http://localhost:8080/formText', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: formText}),
        })
        
        .then(res => {
           let res_post = res.json();
           return res_post 
        })
        .catch((error) => {
            console.log('promise error ', error);
        });

        console.log(fetchResponse);
        if (fetchResponse.status.code !== '0'){
            alert('Cannot read URL');
        } else {
            alert('Completed fetch');
            UI(fetchResponse);
        }

        function UI(res){   
            console.log("From client");
  
            document.getElementById("polarity").innerHTML = 'Polarity: ' + polarityScore(res.score_tag); 
            document.getElementById("subjectivity").innerHTML = 'Subjectivity: ' + res.subjectivity;
            document.getElementById("confidence").innerHTML = 'Confidence: ' + res.confidence;
            document.getElementById("agreement").innerHTML = 'Agreement: ' + res.agreement;
            document.getElementById("irony").innerHTML = 'Irony: ' + res.irony;
        }
    } else {
        alert ('Invalid URL')
    };
}

function polarityScore(score){
    let output;
    switch (score){
        case 'P+':
            output ='Strongly Positive'
            break;
        case 'P':
            output= 'Positive';
            break;
        case 'N':
            output= 'Neutral';
            break;  
        case 'P-':
            output= 'Negative';
            break;
        case 'P--':
            output= 'Strongly Negative';
        break;
        case 'N/A':
            output= 'None';
        break;
    }
    return output;
}
    
export { handleSubmit }
export { polarityScore }

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

 

    if (client.checkForName(formText)) {
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
            alert('Comleted fetch');
            UI(fetchResponse);
        }

        function UI(res){   
            console.log("From client");
  
            document.getElementById("polarity").innerHTML = res.polarity; // maybe add string 
            document.getElementById("subjectivity").innerHTML = res.subjectivity;
            document.getElementById("confidence").innerHTML = res.confidence;
            document.getElementById("agreement").innerHTML = res.agreement;
            document.getElementById("irony").innerHTML = res.irony;
        }
    } else {
        alert ('Invalid URL')
    };
}
    
export { handleSubmit }

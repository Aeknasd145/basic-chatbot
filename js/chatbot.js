let chatOpen = false;
let chatBox = document.getElementById('chatBox');
let chatHeader = document.getElementById('chatHeader');
let chatInput = document.getElementById('chatInput');
let chatBoxHeight = '400px';
let clickedOptions = [];

const contactTitle = 'Contact Us';
const contactAnswer = 'Contact us <a href="mailto:info@site.com">info@site.com</a>.';

function updateChatBoxHeight() {
    if (window.matchMedia("(max-width: 480px)").matches) {
      let headerHeight = chatHeader.offsetHeight;
      let inputHeight = chatInput.offsetHeight;
    
      let viewportHeight = window.innerHeight;
        
      chatBoxHeight = 'calc('+viewportHeight+'px - ('+headerHeight+'px + '+inputHeight+'px))';
    } 
}

// Update the height of the chat box when the page loads
window.addEventListener('load', updateChatBoxHeight);

// Update the height of the chat box when the page size changes
window.addEventListener('resize', updateChatBoxHeight);

// Update the height of the chat box when the user scrolls
window.addEventListener('scroll', updateChatBoxHeight);
	
let responses = {
    'default': 'Hello, how can i help you?',
    'Question 1 ?': 'Answer 1',
    'Question 2 ?': 'Answer 2',
    'Question 3 ?': 'Answer 3'
};

let options = Object.keys(responses);
options = options.filter(option => option !== "default");

function displayOptions(userMessage = "bulunamadı!") {
    let chatBox = document.getElementById('chatBox');
    let currentOptions = options.filter(option => !clickedOptions.includes(option)).slice(0, 3);
    
    currentOptions.forEach(option => {
        let optionDiv = document.createElement('div');
        optionDiv.innerHTML = option;
        optionDiv.className = "options";
        optionDiv.onclick = function () {
            clickedOptions.push(option);
            //saveMessage(userMessage, responses[option]);
            let userDiv = document.createElement('div');
            userDiv.innerHTML = option;
            userDiv.className = "userMessage";
            chatBox.appendChild(userDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            displayNextMessage(option);
        };
        chatBox.appendChild(optionDiv);
    });

    if (currentOptions.length === 0) {
        let optionDiv = document.createElement('div');
        optionDiv.innerText = contactTitle;
        optionDiv.className = "options";
        optionDiv.onclick = function () {
            let userDiv = document.createElement('div');
            userDiv.innerText = contactTitle';
            userDiv.className = "userMessage";
            chatBox.appendChild(userDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            let div = document.createElement('div');
            div.innerHTML = contactAnswer;
            div.className = "chatbotMessage";
            chatBox.appendChild(div);
            clickedOptions = [];
            displayOptions(userMessage);
        };
        chatBox.appendChild(optionDiv);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayNextMessage(option = "default") {
    let chatBox = document.getElementById('chatBox');
    let div = document.createElement('div');
    div.innerHTML = responses[option];
    div.className = "chatbotMessage";
    chatBox.appendChild(div);
    displayOptions();
}

function sendMessage(message, userMessage) {
    let chatBox = document.getElementById('chatBox');
    let div = document.createElement('div');
    div.innerText = message;
    div.className = "chatbotMessage";
    chatBox.appendChild(div);
    displayOptions(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function check(e, errorMessage) {
    if (e.key === "Enter" || e.keyCode === 13) {
        let chatInput = document.getElementById('chatInput');
        let userMessage = chatInput.value;

        // Prevent sending empty messages by the user
        if(userMessage.trim() === ''){
            return "";
        }
        let userDiv = document.createElement('div');
        userDiv.innerText = userMessage;
        userDiv.className = "userMessage";
        chatBox.appendChild(userDiv);
        chatInput.value = '';

        let lowerUserMessage = userMessage.toLowerCase();
        let responseMessage = getResponse(lowerUserMessage, errorMessage);
        //saveMessage(userMessage, responseMessage);
        sendMessage(responseMessage, userMessage);
        e.preventDefault();
    }
}

function toggleChat() {
    let chatContainer = document.getElementById('chatContainer');
    let chatButton = document.getElementById('chatButton');

    if (chatOpen) {
        chatContainer.classList.remove('open');      
		if (window.matchMedia("(max-width: 480px)").matches) {
	        chatButton.classList.remove('d-none');
	        document.body.classList.remove('disable-scroll');
		}
    } else {
        chatContainer.classList.add('open');
		chatBox.style.height = chatBoxHeight;
		if (window.matchMedia("(max-width: 480px)").matches) {
        	chatButton.classList.add('d-none');
        	document.body.classList.add('disable-scroll');
		}
    }
    chatOpen = !chatOpen;
    document.getElementById('chatButton').innerText = chatOpen ? 'X' : '?';
    if (chatOpen && document.getElementById('chatBox').children.length === 0) displayNextMessage();
}

function getResponse(userMessage, errorMessage) {
    let response = 'default';
    let userMessageWords = userMessage.split(' ');

    // Check is there any match
    for (let key in responses) {
        if (key.toLowerCase() === userMessage.toLowerCase()) {
            response = key;
            return responses[response];
        }
    }

    // If isn't there any match, check for word match
    let maxMatch = 0;
    for (let key in responses) {
        let keyWords = key.split(' ');
        let matchCount = 0;
        for (let word of userMessageWords) {
            if (keyWords.includes(word)) {
                matchCount++;
            }
        }
        if (matchCount > maxMatch) {
            maxMatch = matchCount;
            response = key;
        }
    }

    if(response !== 'default'){
        return responses[response]; // TODO: Add "+ ' Is this the question you want to ask?'" and provide options "yes" and "no"
    } else {
        return errorMessage;
    }
}


// Will be added soon
/*function saveMessage(userMessage, botResponse) {
    let xhr = new XMLHttpRequest();
    let url = "/saveMessages.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Message and response saved successfully");
        }
    };
    var data = `userMessage=${userMessage}&botResponse=${botResponse}`;
    xhr.send(data);
}*/



document.getElementById('chatButton').addEventListener('click', toggleChat);
document.getElementById('closeChatBox').addEventListener('click', toggleChat);

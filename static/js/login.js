const form = document.querySelector('form');

class App {
    constructor(){
        form.addEventListener('submit', this._getValues.bind(this));
    }

    _getValues(e){
        e.preventDefault();

        const formData = new FormData(form);

        this._sendRequest(formData);
    }

    _sendRequest(formData){
        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect to the specified URL
            } else {
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

const app = new App();
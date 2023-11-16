const form = document.querySelector('form');

const img = document.querySelector('#img');

class App {
    constructor(){
        form.addEventListener('submit',this._getValues.bind(this));
    }

    _getValues(e){
        e.preventDefault();

        const formData = new FormData(form);

        const existingUser = JSON.parse(localStorage.getItem(formData.get('email')));
        if (existingUser) {
            console.error('Email already exists in localStorage. You are already registered.');
            return;
        }

        this._sendRequest(formData);
    }

    _sendRequest(formData){
        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            const user = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                img: img.value
            };

            localStorage.setItem(user.email, JSON.stringify(user));
            window.location.href = '/';
            localStorage.setItem('registered', 'true');
        })
        .catch(error => {
                console.error('Error:', error);
        });
    }

    _reset(){
        localStorage.clear()
    }
}

const app = new App()
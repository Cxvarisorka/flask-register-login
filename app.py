from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)
registered_users = []

@app.route('/')
def home():
    data = 'My Name is Luka'
    return render_template('index.html', data=data)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        user_data = {'username': username, 'email': email, 'password': password}
        registered_users.append(user_data)

        return jsonify({'message': 'User registered successfully'})

    return render_template('register.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        for user in registered_users:
            if user['email'] == email and user['password'] == password:
                return jsonify({'redirect': url_for('profile', email=email)})

        return jsonify({'error': 'Invalid credentials'}), 401  # Unauthorized error

    return render_template('login.html')

@app.route('/profile/<email>')
def profile(email):
    user_info = None
    for user in registered_users:
        if user['email'] == email:
            user_info = user
            break

    if user_info:
        return render_template('profile.html', user=user_info)
    else:
        return redirect(url_for('login'))  # Redirect to login if user not found

if __name__ == '__main__':
    app.run(debug=True)

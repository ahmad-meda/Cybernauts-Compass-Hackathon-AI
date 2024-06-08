from flask import Flask, request, jsonify
from flask_cors import CORS
import nbformat
from nbconvert.preprocessors import ExecutePreprocessor

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing

@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/run_notebook', methods=['POST'])
def run_notebook():
    data = request.get_json()
    user_input = data.get('user_input', '')
    # Do something with user_input, e.g., pass it to a function or a cell in the notebook
    output = f"Received input: {user_input}"
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(port=5000)

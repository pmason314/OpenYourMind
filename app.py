#!flask/bin/python
from flask import Flask, jsonify, request
from gpt2.src import interactive_conditional_samples



app = Flask(__name__)

@app.route('/', methods=['POST'])
def get_text_generation():
    text_input = request.get_json()['raw_text']
    text_output = interactive_conditional_samples.generate_text(text_input)
    #print(text_input['name'])
    return jsonify({'model_text': text_output}), 201

if __name__ == '__main__':
    app.run(debug=True)


# curl -H "Content-Type: application/json" -X POST -d '{"raw_text": "This is an inspirational speech"}' http://127.0.0.1:5000/
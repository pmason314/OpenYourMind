#!flask/bin/python
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from gpt2.src import interactive_conditional_samples

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST'])
@cross_origin()
def get_text_generation():
    text_input = request.get_json()['raw_text']
    print("text input: ", text_input)
    text_output = interactive_conditional_samples.generate_text(text_input)
    #print(text_input['name'])
    return jsonify({'model_text': text_output}), 201
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response, 201

if __name__ == '__main__':
    app.run(debug=True)


# curl -H "Content-Type: application/json" -X POST -d '{"raw_text": "This is an inspirational speech"}' http://127.0.0.1:5000/
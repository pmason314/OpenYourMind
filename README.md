# OpenYourMind

OpenYourMind is a Word plugin that can generate paragraphs of text based on a few words or sentences you write. It is intended to help stimulate your creativity by generating content that is both coherent and context-aware to what you write. Microsoft recently went into a [$1B deal with OpenAI](https://www.theverge.com/2019/7/22/20703578/microsoft-openai-investment-partnership-1-billion-azure-artificial-general-intelligence-agi), and we're using OpenAI's GPT-2 language model to do this. 

More about GPT-2 and some of the content it generates from here (it's both scary and fascinating): https://openai.com/blog/better-language-models/.

Our hackathon project is detailed here: https://garagehackbox.azurewebsites.net/hackathons/1857/projects/82703. 

# Setup

## Dependencies

* Python 3.6 or above

## GPT-2

1. Create virtual environment (best practice)

`git clone https://github.com/openai/gpt-2.git`

`cd gpt-2/`

`python3 -m venv ~/venv-gpt-2`

`. ~/venv-gpt-2/bin/activate`

2. Install Tensorflow and additional requirements

`pip3 install tensorflow==1.12`

`pip3 install -r requirements.txt`

`python3 download_model.py 117M`

`python3 download_model.py 345M`

## Building the Word Plugin

1. Navigate to `oym_plugin/` folder, and run `npm install` to install the tools and libraries listed in the package.json file.
2. Install self-signed ceritificate found in the `oym_plugin/certs` folder. Instructions can be found [here](https://github.com/OfficeDev/generator-office/blob/master/src/docs/ssl.md).
3. Run `npm run build` to transpile your ES6 source code to an earlier version of JavaScript that is supported by all the hosts where Office Add-ins can run.
4. Run the command `npm start` to start a web server running on localhost.
5. In a separate Terminal, navigate to root of this project, and run `python3 app.py` to start the Flask server.
6. Create a new Word document online or locally, and sideload the Word plugin by using one of the methods offered in the [tutorial](https://docs.microsoft.com/en-us/office/dev/add-ins/tutorials/word-tutorial#test-the-add-in).
7. Write some sentences on the document, and click on the 'Ignite My Creativity' button on the plugin to generate text using GPT-2.


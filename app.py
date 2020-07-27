from os import walk

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/<command>', methods=['GET', 'POST'])
def index(command):

  if command == 'get_files':
    files = None

    for (directory) in walk(request.data.decode()):
      files = directory[2]

    # Return list/array of file names
    return jsonify(files)

  if command == 'rename_files':
    print(request.data)

# Available for manual testing
if __name__ == '__main__':
  app.run(host='127.0.0.1', port=8081)
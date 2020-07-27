from os import walk

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/<command>', methods=['GET', 'POST'])
def index(command):

  """ Request to get files:
  Request to get the directory path and list
  of files to rename from user's computer.
  """

  if command == 'get_files':
    files = None

    for (directory) in walk(request.data.decode()):
      files = directory[2]

    # Return list/array of file names
    return jsonify(files)


  """ Request to rename files:
  Request to rename files in the directory
  path provided with new names passed in
  the request data.
  """

  if command == 'rename_files':
    print(request.data)

    return 'Hello!'

# Available for manual testing
# if __name__ == '__main__':
#   app.run(host='127.0.0.1', port=8081)
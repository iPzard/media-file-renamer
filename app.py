import ast
from os import path, rename, walk
from flask import Flask, jsonify, request

app = Flask(__name__)


""" Request to get files:
Request to get the directory path and list
of files to rename from user's computer.
"""
@app.route('/get_files', methods=['POST'])
def get_files():

  # Iterate directory for data
  for (directory) in walk(request.data.decode()):
    files = directory[2]

  return jsonify(files)


""" Request to rename files:
Request to rename files in the directory
path provided with new names passed in
the request data.
"""
@app.route('/rename_files', methods=['POST'])
def rename_files():

  # Convert bytes string to dictionary
  data = ast.literal_eval(request.data.decode())

  # Declarations
  directory = data['directory']
  rename_data = data['renameData']
  names_list = list(zip(rename_data['files'], rename_data['names']))
  missing_data_text = data['missingDataText']

  # Rename files
  response_message = 'All files have been successfully renamed.'
  status = 'success'

  for file, name in names_list:
    old_name = path.join(directory, file)
    new_name = path.join(directory, name)

    # If a user-approved missing index is recursed
    if old_name in missing_data_text or new_name in missing_data_text:
      continue

    # If file exists and new name doesn't, rename
    elif path.exists(old_name) and not path.exists(new_name):
      rename(old_name, new_name)

    # If file doesn't exist
    elif not path.exists(old_name):
      response_message = 'One or more file not found in directory.'
      status = 'error'

    # If new name already exists
    elif path.exists(new_name):
      response_message = 'One or more "New names" already exists in directory.'
      status = 'error'

  # Get new (actual) file names
  for (names) in walk(directory):
    files = names[2]

  # Response object
  rename_response = {
    'files': files,
    'message': response_message,
    'status': status
  }

  return jsonify(rename_response)
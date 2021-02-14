import ast
import sys
from os import path, rename, walk
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app_config = {"host": "0.0.0.0", "port": sys.argv[1]}


""" Developer config """
# Developer mode uses app.py
if "app.py" in sys.argv[0]:

  # Update app config
  app_config["debug"] = True

  # CORS settings
  cors = CORS(
    app,
    resources={r"/*": {"origins": "http://localhost*"}},
  )

  # CORS headers
  app.config["CORS_HEADERS"] = "Content-Type"


""" Get Flask port:
Accepts port as system argument
e.g., `start app.exe 3000`
"""
port = sys.argv[1]


""" Request to get files:
Request to get the directory path and list
of files to rename from user's computer.
"""
@app.route("/get_files", methods=["POST"])
def get_files():

  # Iterate directory for data
  for directory in walk(request.data.decode()):
    files = directory[2]

  return jsonify(files)


""" Request to rename files:
Request to rename files in the directory
path provided with new names passed in
the request data.
"""
@app.route("/rename_files", methods=["POST"])
def rename_files():

  # Convert bytes string to dictionary
  data = ast.literal_eval(request.data.decode())

  # Declarations
  directory = data["directory"]
  rename_data = data["renameData"]
  names_list = list(zip(rename_data["files"], rename_data["names"]))

  missing_data_text = data["missingDataText"]
  files = []

  # Rename files
  response_message = "All files have been successfully renamed."
  status = "success"

  for file, name in names_list:
    old_name = path.join(directory, file)
    new_name = path.join(directory, name)

    # If a user-approved missing index is recursed
    if file in missing_data_text or name in missing_data_text:
      files.append(file)
      continue

    # If file exists and new name doesn't, rename
    elif path.exists(old_name) and not path.exists(new_name):
      files.append(name)
      rename(old_name, new_name)

    # If file doesn't exist
    elif not path.exists(old_name):
      response_message = "One or more file not found in directory."
      status = "error"

    else:
      files.append(name)

  # Response object
  rename_response = {"files": files, "message": response_message, "status": status}

  return jsonify(rename_response)


""" Shutdown Flask:
Generic function to shutdown
Flask when Electron app closes.
"""
@app.route("/quit")
def quit():
  shutdown = request.environ.get("werkzeug.server.shutdown")
  shutdown()

  return


"""
Start flask microservice server:
Uses a random port between 3000
and 3999.
"""
if __name__ == "__main__":
  app.run(**app_config)

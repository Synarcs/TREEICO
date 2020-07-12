from flask import Flask, jsonify, make_response
from firebase_admin import firestore, credentials
import firebase_admin
import threading
import os

dirpath = os.path.join(
    os.getcwd(), 'icotree-7f94c-firebase-adminsdk-amt7c-7d260e469f.json')


def config():
    cred = credentials.Certificate(dirpath)
    firebase_admin.initialize_app(cred)


config()
db = firestore.client()
app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def Home():
    db.collection('users').document('asasa').set({
        "name": "asas"
    })
    return "done"


if __name__ == "__main__":
    app.run(debug=True, port=3000)

from flask import Flask, jsonify, make_response, redirect
from flask import url_for, request
from flask_cors import CORS

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
CORS(app)


@app.route('/', methods=["GET", "POST"])
def Home():
    if request.method == "POST":
        deployedAddress = request.form['addresses']
        userAddress = request.form['address']
        tokenForSale = request.form['tokenSale']
        db.collection('contractAdmins').document('userAddress').update({
            "userAddress": userAddress,
            "tokenForSale": tokenForSale,
            "deployedAddress": deployedAddress
        })
        return "the data is backed"
    else:
        return redirect(url_for('UserIndex', username="error holding"))

@app.route('/user/<username>')
def UserIndex(username):
    if "vedang" in username:
        redirect('/')
    else:
        return username


with app.test_request_context():
    print(url_for('UserIndex', username="kevin bach"))

if __name__ == "__main__":
    app.run(debug=True, port=3000)

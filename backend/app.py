from flask import Flask, jsonify

app = Flask(__name__)

allData = []

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the BACKEND!"})

@app.route('/insertData', methods=['GET', 'POST'])
def insertData():
    data = {
        'id': 1,
        'name': 'John Doe',
        'email': 'akujsbghdkjxc'
    }
    allData.append(data)
    
    return jsonify({'message': 'Data inserted successfully'}), 200


@app.route('/getData', methods=['GET'])
def getData():
    return jsonify(allData), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, jsonify, request

app = Flask(__name__)

allData = []
counter = 0

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the BACKEND!"})

@app.route('/insertData', methods=['GET', 'POST'])
def insertData():
    global counter
    counter += 1
    
    allData.append(request.json)
    print(allData)
    return jsonify({'message': 'Data inserted successfully'}), 200

    
@app.route('/getData', methods=['GET'])
def getData():
    global counter
    return jsonify(allData[counter-1]), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
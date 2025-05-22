from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd

app = Flask(__name__, static_folder='front')

# Cargar modelos y columnas
lr_model = joblib.load('lr_model.pkl')
svm_model = joblib.load('svm_model.pkl')
columns = joblib.load('model_columns.pkl')

@app.route('/')
def index():
    return send_from_directory('front', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('front', path)

@app.route('/predict_price', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        df = df[columns]  # Asegurar orden y columnas correctas

        # Predecir
        lr_pred = lr_model.predict(df)[0]
        svm_pred = svm_model.predict(df)[0]

        return jsonify({
            "regresion_lineal": round(lr_pred, 2),
            "svm": round(svm_pred, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd

app = Flask(__name__, static_folder='front')

# Carga modelos y columnas
model_knn = joblib.load('modelo_knn.pkl')
model_rf = joblib.load('modelo_random_forest.pkl')
columns = joblib.load('columns.pkl')  # ['OverallQual', 'GrLivArea', 'GarageCars', 'TotalBsmtSF']

@app.route('/')
def index():
    return send_from_directory('front', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('front', path)

@app.route('/predict', methods=['POST'])
def predict():
    print("Columnas que espera el modelo:", columns)

    try:
        data = request.get_json()
        print("📦 Datos recibidos:", data)  # <-- Aquí lo colocas

        df = pd.DataFrame([data])
        df = df[columns]  # usa solo las columnas que espera el modelo

        knn_pred = model_knn.predict(df)[0]
        rf_pred = model_rf.predict(df)[0]

        return jsonify({
            "knn_prediction": round(knn_pred, 2),
            "random_forest_prediction": round(rf_pred, 2)
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
    

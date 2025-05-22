# Sistema de Predicción de Precios de Viviendas

Este proyecto implementa un sistema de predicción de precios de viviendas utilizando dos modelos de machine learning diferentes: Regresión Lineal y Support Vector Machine (SVM). El sistema incluye una interfaz web interactiva para realizar predicciones en tiempo real.

## Estructura del Proyecto

```
.
├── app.py              # Backend Flask
├── front/             # Frontend
│   ├── index.html     # Interfaz de usuario
│   ├── styles.css     # Estilos CSS
│   └── script.js      # Lógica del cliente
├── lr_model.pkl       # Modelo de Regresión Lineal
├── svm_model.pkl      # Modelo SVM
└── model_columns.pkl  # Columnas del modelo
```

## Características

### Backend (app.py)
- API REST desarrollada con Flask
- Endpoints:
  - `/`: Sirve la interfaz de usuario
  - `/predict_price`: Endpoint para predicciones (POST)
- Integración con modelos de machine learning
- Manejo de errores y validación de datos

### Frontend
- Interfaz de usuario moderna y responsiva
- Formulario interactivo con validación
- Visualización de resultados en tiempo real
- Diseño adaptativo con CSS moderno
- Iconos de Font Awesome para mejor UX

### Modelos de Machine Learning
- Regresión Lineal
- Support Vector Machine (SVM)
- Variables de entrada:
  - Calidad General (OverallQual)
  - Área Habitable (GrLivArea)
  - Capacidad del Garaje (GarageCars)
  - Área del Sótano (TotalBsmtSF)

## Tecnologías Utilizadas

- **Backend**:
  - Python
  - Flask
  - scikit-learn
  - pandas
  - joblib

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - Font Awesome

## Cómo Ejecutar el Proyecto

1. Instalar las dependencias:
```bash
pip install flask pandas scikit-learn joblib
```

2. Ejecutar la aplicación:
```bash
python app.py
```

3. Abrir el navegador en `http://localhost:5000`

## Uso

1. Ingrese los datos de la vivienda en el formulario:
   - Calidad General (1-10)
   - Área Habitable en pies cuadrados
   - Capacidad del Garaje (0-4)
   - Área del Sótano en pies cuadrados

2. Haga clic en "Predecir Precio"

3. Los resultados mostrarán las predicciones de ambos modelos:
   - Precio predicho por Regresión Lineal
   - Precio predicho por SVM

## Notas

- Los modelos han sido entrenados previamente y se cargan desde archivos .pkl
- Las predicciones se realizan en tiempo real
- Los resultados se muestran en dólares

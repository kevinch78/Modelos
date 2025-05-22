document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = {
        OverallQual: parseFloat(document.getElementById('OverallQual').value),
        GrLivArea: parseFloat(document.getElementById('GrLivArea').value),
        GarageCars: parseFloat(document.getElementById('GarageCars').value),
        TotalBsmtSF: parseFloat(document.getElementById('TotalBsmtSF').value)
    };

    try {
        // Enviar la solicitud al backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Mostrar los resultados
            document.getElementById('knnPrediction').textContent = `$${data.knn_prediction.toLocaleString()}`;
            document.getElementById('rfPrediction').textContent = `$${data.random_forest_prediction.toLocaleString()}`;
        } else {
            throw new Error(data.error || 'Error en la predicción');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}); 
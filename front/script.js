document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validar los campos antes de enviar
    const fields = ['OverallQual', 'GrLivArea', 'GarageCars', 'TotalBsmtSF'];
    const formData = {};
    let hasError = false;

    fields.forEach(field => {
        const value = document.getElementById(field).value;
        const numValue = parseFloat(value);
        
        if (isNaN(numValue) || numValue < 0) {
            alert(`Por favor ingrese un valor válido para ${field}`);
            hasError = true;
            return;
        }
        
        formData[field] = numValue;
    });

    if (hasError) return;

    try {
        // Mostrar indicador de carga
        document.getElementById('linearPrediction').textContent = 'Calculando...';
        document.getElementById('svmPrediction').textContent = 'Calculando...';

        // Enviar la solicitud al backend
        const response = await fetch('/predict_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Validar que los datos existan y sean números válidos
            const linearPred = data.regresion_lineal;
            const svmPred = data.svm;

            if (typeof linearPred !== 'number' || typeof svmPred !== 'number' || 
                isNaN(linearPred) || isNaN(svmPred)) {
                throw new Error('Resultados de predicción inválidos');
            }

            // Mostrar los resultados con formato de moneda
            document.getElementById('linearPrediction').textContent = 
                `$${Number(linearPred).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            document.getElementById('svmPrediction').textContent = 
                `$${Number(svmPred).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else {
            throw new Error(data.error || 'Error en la predicción');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
        // Resetear los valores en caso de error
        document.getElementById('linearPrediction').textContent = '$0.00';
        document.getElementById('svmPrediction').textContent = '$0.00';
    }
}); 
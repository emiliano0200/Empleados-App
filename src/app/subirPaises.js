import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioPais = document.querySelector('#Formulario-Pais');

    formularioPais.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioPais['Nombre-Pais'].value;
        const CAPITAL = formularioPais['Capital-Pais'].value;
        const POBLACION = formularioPais['Poblacion-Pais'].value;
        const IDIOMA = formularioPais['Idioma-Pais'].value;
        const MONEDA = formularioPais['Moneda-Pais'].value;
        const FECHA_FUNDACION = formularioPais['FechaFundacion-Pais'].value;

        try {
            const nuevoPaisRef = await addDoc(collection(db, 'Paises'), {
                Nombre: NOMBRE,
                Capital: CAPITAL,
                Poblacion: POBLACION,
                Idioma: IDIOMA,
                Moneda: MONEDA,
                FechaFundacion: FECHA_FUNDACION,
            });

            alert(`El país ${NOMBRE} ha sido registrado exitosamente`);
            formularioPais.reset();
        } catch (error) {
            alert('Error al registrar el país:', 'noValido');
        }
    });
});

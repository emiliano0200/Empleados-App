import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioEmpleado = document.querySelector('#Formulario-Empleado');

    formularioEmpleado.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioEmpleado['Nombre-Empleado'].value;
        const CARGO = formularioEmpleado['Cargo-Empleado'].value;
        const DEPARTAMENTO = formularioEmpleado['Departamento-Empleado'].value;
        const SALARIO = formularioEmpleado['Salario-Empleado'].value;
        const FECHA_CONTRATACION = formularioEmpleado['FechaContratacion-Empleado'].value;

        try {
            const nuevoEmpleadoRef = await addDoc(collection(db, 'Empleados'), {
                Nombre: NOMBRE,
                Cargo: CARGO,
                Departamento: DEPARTAMENTO,
                Salario: SALARIO,
                FechaContratacion: FECHA_CONTRATACION,
            });

            alert(`El empleado ${NOMBRE} ha sido registrado exitosamente`);
            formularioEmpleado.reset();
        } catch (error) {
            alert('Error al registrar el empleado:', 'noValido');

            console.log(error);
        }
    });
});

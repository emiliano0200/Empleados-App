import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Empleados = document.querySelector('.Empleados'); // Cambia a "Empleados"
const FormularioActualizarEmpleado = document.querySelector('#Formulario-ActualizarEmpleado'); // Cambia el ID

const obtenerEmpleado = (id) => getDoc(doc(db, 'Empleados', id)); // Cambia a la colección "Empleados"

let id = '';

// Nueva función para actualizar empleado
const actualizarEmpleado = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Empleados', id), nuevosValores); // Cambia a la colección "Empleados"
        alert('Empleado actualizado correctamente'); // Actualiza el mensaje
    } catch (error) {
        alert('Error al actualizar el empleado', 'error'); // Actualiza el mensaje
    }
};

export const MostrarListaEmpleados = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Empleado = documento.data(); // Cambia a "Empleado"
            const idDocumento = documento.id;
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Nombre del empleado: ${Empleado.Nombre} </h5>
                    <p> Cargo: ${Empleado.Cargo} </p>
                    <p> Departamento: ${Empleado.Departamento} </p>
                    <p> Salario: ${Empleado.Salario} </p>
                    <p> Fecha de Contratación: ${Empleado.FechaContratacion} </p> <!-- Nuevo campo de tipo fecha -->
                    <button class="btn btn-warning w-80 mb-2 botoneSinSesion Eliminar-Empleado" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-80 mb-2 botoneSinSesion Actualizar-Empleado" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarEmpleado"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Empleados.innerHTML = html;

        const BotonesEliminar = Empleados.querySelectorAll('.Eliminar-Empleado');

        // ELIMINAR EMPLEADOS
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Empleados', Documento)); // Cambia a la colección "Empleados"
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el empleado:', 'error'); // Actualiza el mensaje
                }
            });
        });

        const BotonesActualizar = Empleados.querySelectorAll('.Actualizar-Empleado');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerEmpleado(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarEmpleado['Actualizar-Nombre']; // Actualiza los nombres de los campos
                const CARGO = FormularioActualizarEmpleado['Actualizar-Cargo'];
                const DEPARTAMENTO = FormularioActualizarEmpleado['Actualizar-Departamento'];
                const SALARIO = FormularioActualizarEmpleado['Actualizar-Salario'];
                const FECHA_CONTRATACION = FormularioActualizarEmpleado['Actualizar-FechaContratacion']; // Nuevo campo de tipo fecha

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                CARGO.value = DATOSDOCUMENTO.Cargo;
                DEPARTAMENTO.value = DATOSDOCUMENTO.Departamento;
                SALARIO.value = DATOSDOCUMENTO.Salario;
                FECHA_CONTRATACION.value = DATOSDOCUMENTO.FechaContratacion; // Nuevo campo de tipo fecha

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el empleado al enviar el formulario
        FormularioActualizarEmpleado.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarEmpleado['Actualizar-Nombre'].value;
                const CARGO = FormularioActualizarEmpleado['Actualizar-Cargo'].value;
                const DEPARTAMENTO = FormularioActualizarEmpleado['Actualizar-Departamento'].value;
                const SALARIO = FormularioActualizarEmpleado['Actualizar-Salario'].value;
                const FECHA_CONTRATACION = FormularioActualizarEmpleado['Actualizar-FechaContratacion'].value; // Nuevo campo de tipo fecha

                await actualizarEmpleado(id, {
                    Nombre: NOMBRE,
                    Cargo: CARGO,
                    Departamento: DEPARTAMENTO,
                    Salario: SALARIO,
                    FechaContratacion: FECHA_CONTRATACION, // Nuevo campo de tipo fecha
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarEmpleado');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error'); // Actualiza el mensaje
            }
        });

    } else if (Datos.length === 0) {
        Empleados.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};

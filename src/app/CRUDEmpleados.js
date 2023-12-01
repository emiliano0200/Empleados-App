import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Paises = document.querySelector('.Paises');
const FormularioActualizarPais = document.querySelector('#Formulario-ActualizarPais'); // Actualiza el ID

const obtenerPais = (id) => getDoc(doc(db, 'Paises', id)); // Cambia a la colección "Paises"

let id = '';

// Nueva función para actualizar país
const actualizarPais = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Paises', id), nuevosValores); // Cambia a la colección "Paises"
        alert('País actualizado correctamente'); // Actualiza el mensaje
    } catch (error) {
        alert('Error al actualizar el país', 'error'); // Actualiza el mensaje
    }
};

export const MostrarListaPaises = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Pais = documento.data(); // Cambia a "Pais"
            const idDocumento = documento.id;
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Nombre del país: ${Pais.Nombre} </h5>
                    <p> Capital: ${Pais.Capital} </p>
                    <p> Población: ${Pais.Poblacion} </p>
                    <p> Idioma: ${Pais.Idioma} </p>
                    <p> Moneda: ${Pais.Moneda} </p>
                    <p> Fecha de Fundación: ${Pais.FechaFundacion} </p> <!-- Nuevo campo de tipo fecha -->
                    <button class="btn btn-warning w-100 mb-2 botoneSinSesion Eliminar-Pais" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Pais" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarPais"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Paises.innerHTML = html;

        const BotonesEliminar = Paises.querySelectorAll('.Eliminar-Pais');

        // ELIMINAR PAÍSES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Paises', Documento)); // Cambia a la colección "Paises"
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el país:', 'error'); // Actualiza el mensaje
                }
            });
        });

        const BotonesActualizar = Paises.querySelectorAll('.Actualizar-Pais');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerPais(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarPais['Actualizar-Nombre']; // Actualiza los nombres de los campos
                const CAPITAL = FormularioActualizarPais['Actualizar-Capital'];
                const POBLACION = FormularioActualizarPais['Actualizar-Poblacion'];
                const IDIOMA = FormularioActualizarPais['Actualizar-Idioma'];
                const MONEDA = FormularioActualizarPais['Actualizar-Moneda'];
                const FECHA_FUNDACION = FormularioActualizarPais['Actualizar-FechaFundacion']; // Nuevo campo de tipo fecha

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                CAPITAL.value = DATOSDOCUMENTO.Capital;
                POBLACION.value = DATOSDOCUMENTO.Poblacion;
                IDIOMA.value = DATOSDOCUMENTO.Idioma;
                MONEDA.value = DATOSDOCUMENTO.Moneda;
                FECHA_FUNDACION.value = DATOSDOCUMENTO.FechaFundacion; // Nuevo campo de tipo fecha

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el país al enviar el formulario
        FormularioActualizarPais.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarPais['Actualizar-Nombre'].value;
                const CAPITAL = FormularioActualizarPais['Actualizar-Capital'].value;
                const POBLACION = FormularioActualizarPais['Actualizar-Poblacion'].value;
                const IDIOMA = FormularioActualizarPais['Actualizar-Idioma'].value;
                const MONEDA = FormularioActualizarPais['Actualizar-Moneda'].value;
                const FECHA_FUNDACION = FormularioActualizarPais['Actualizar-FechaFundacion'].value; // Nuevo campo de tipo fecha

                await actualizarPais(id, {
                    Nombre: NOMBRE,
                    Capital: CAPITAL,
                    Poblacion: POBLACION,
                    Idioma: IDIOMA,
                    Moneda: MONEDA,
                    FechaFundacion: FECHA_FUNDACION, // Nuevo campo de tipo fecha
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarPais');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error'); // Actualiza el mensaje
            }
        });

    } else if (Datos.length === 0) {
        Paises.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};

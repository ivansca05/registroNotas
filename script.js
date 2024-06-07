const materias = [
    "Inglés",
    "Matemáticas",
    "Cátedra Isaías Duarte",
    "Constitución Política",
    "Introducción a la Ingeniería",
    "Comprensión de Textos"
];

const cantMaterias = materias.length;

function crearCampoNota(materia) {
    const divMateria = document.createElement('div');
    divMateria.classList.add('materia');

    const label = document.createElement('label');
    label.textContent = `${materia}: `;
    divMateria.appendChild(label);

    for (let i = 1; i <= 3; i++) {
        const inputNota = document.createElement('input');
        inputNota.type = 'number';
        inputNota.classList.add('nota');
        inputNota.placeholder = `Nota ${i}`;
        inputNota.addEventListener('input', calcularPromedioTotal); 
        divMateria.appendChild(inputNota);
    }

    const btnCalcularPromedio = document.createElement('button');
    btnCalcularPromedio.textContent = 'Calcular Promedio';
    btnCalcularPromedio.addEventListener('click', function() {
        calcularPromedioMateria(materia, divMateria);
    });
    divMateria.appendChild(btnCalcularPromedio);

    document.getElementById('materias').appendChild(divMateria);
}

function calcularPromedioMateria(materia, divMateria) {
    const notas = divMateria.querySelectorAll('.nota');
    const nota1 = parseFloat(notas[0].value);
    const nota2 = parseFloat(notas[1].value);
    const nota3 = parseFloat(notas[2].value);

    const promedio = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);

    const promedioSpan = document.createElement('span');
    promedioSpan.textContent = `                  Promedio: ${promedio.toFixed(1)}`;
    divMateria.appendChild(promedioSpan);
}

function calcularPromedioTotal() {
    let sumatoriaTotal = 0;
    let materiasCompletas = true;

    materias.forEach(materia => {
        const divMateria = document.querySelector(`.materia label:contains("${materia}")`).parentNode;
        const notas = divMateria.querySelectorAll('.nota');
        const nota1 = parseFloat(notas[0].value);
        const nota2 = parseFloat(notas[1].value);
        const nota3 = parseFloat(notas[2].value);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
            materiasCompletas = false;
            return;
        }

        const promedio = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);
        sumatoriaTotal += promedio;
    });

    if (materiasCompletas) {
        const promedioTotal = sumatoriaTotal / cantMaterias;
        let promedioTotalElement = document.getElementById('promedioTotal');
        if (!promedioTotalElement) {
            promedioTotalElement = document.createElement('p');
            promedioTotalElement.id = 'promedioTotal';
            document.body.appendChild(promedioTotalElement);
        }
        promedioTotalElement.textContent = `Promedio Total: ${promedioTotal.toFixed(2)}`;
    } else {
        const promedioTotalElement = document.getElementById('promedioTotal');
        if (promedioTotalElement) {
            promedioTotalElement.textContent = ''; 
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    materias.forEach(materia => {
        crearCampoNota(materia);
    });
});



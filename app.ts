import * as readline from 'readline';//Se importa el módulo readline, que se utiliza para leer las entradas del jugador desde la consola.

// Variables globales
let palabraAdivinar: string = '';           // Almacena la palabra que el jugador debe adivinar
let palabraMostrar: string[] = [];          // Almacena la palabra oculta mostrada al jugador
let intentos: number = 6;                   // Almacena el número de intentos restantes
let letrasIntentadas: string[] = [];        // Almacena las letras que el jugador ya ha intentado
/*
Estas variables almacenan la palabra que el jugador debe adivinar, la palabra oculta mostrada al jugador, el número de intentos restantes y las letras que el jugador ya ha intentado.
*/

// Obtener la palabra a adivinar ingresada por el jugador
function obtenerPalabraPorTeclado(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Ingresa la palabra a adivinar: ', (palabra) => {
            rl.close();
            resolve(palabra);
        });
    });
}

// Inicializar el juego
async function inicializarJuego(): Promise<void> {
    palabraAdivinar = await obtenerPalabraPorTeclado();
    palabraMostrar = Array(palabraAdivinar.length).fill('_');
    intentos = 6;
    letrasIntentadas = [];

    // Mostrar la palabra oculta inicialmente
    console.log(`Palabra a adivinar: ${palabraMostrar.join(' ')}`);
}

// Comprobar la letra ingresada por el jugador
function comprobarLetra(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Ingresa una letra: ', (letra) => {
        rl.close();

        if (letrasIntentadas.includes(letra)) {
            console.log('Ya has intentado esta letra. Intenta con otra.');
            return;
        }

        letrasIntentadas.push(letra);

        let letraCorrecta = false;
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if (palabraAdivinar[i] === letra) {
                palabraMostrar[i] = letra;
                letraCorrecta = true;
            }
        }

        if (letraCorrecta) {
            console.log('¡Letra correcta!');
        } else {
            console.log('Letra incorrecta.');
            intentos--;
        }

        console.log(`Palabra actual: ${palabraMostrar.join(' ')}`);
        console.log(`Intentos restantes: ${intentos}`);

        // Comprobar si el jugador ha ganado o perdido
        if (palabraMostrar.join('') === palabraAdivinar) {
            console.log('¡Has ganado!');
            // Aquí puedes agregar el código para mostrar un mensaje de victoria en la interfaz del juego.
        } else if (intentos === 0) {
            console.log('¡Has perdido! La palabra era:', palabraAdivinar);
            // Aquí puedes agregar el código para mostrar un mensaje de derrota en la interfaz del juego.
        } else {
            comprobarLetra(); // Volver a solicitar otra letra
        }
    });
}

// Ejecutar el juego
(async () => {
    await inicializarJuego();
    comprobarLetra();
})();

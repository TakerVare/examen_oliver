# Prueba de autoría AA1 📃

## ☑️ Instrucciones

Es tu primer día de trabajo como frontend developer. Acabas de llegar y, tu responsable te dice que tienen un problema con
una de las páginas de la web, la página de registro!!! Han salido a producción y, no consiguen registrar a los usuarios, porque
la página de registro da error.

<img src="https://media2.giphy.com/media/3oz8y0bx23FDPCNoEU/giphy.gif" width="256" height="256">

Te han pasado el repo del desarrollo con la página de registro (este repo) y, te piden que lo soluciones en las próximas 2h30m, para
evitar perder todos los usuarios que visitan la página por primera vez.

***Es tu oportunidad de demostrar lo que has aprendido, ponerle solución, y quedar cómo el héroe.***

![](https://media2.giphy.com/media/TPJAvvWbSN61O/giphy.gif)

Para ello:
- Clona este repositorio
- Sigue las instrucciones de instalación
- Sigue las instrucciones para arrancar la página
- Corrige los puntos indicados:
- Ejecuta correctamente las pruebas

## 🖥️ Instalación

Ejecuta `npm install` en el proyecto

## 🚀 Ejecución

Para poder ver la página, debes lanzar `npm start` y te ejecutará el servidor en el puerto `8080` de tu máquina.

## 📑 Puntos a corregir
- **(2 pto)** El método `validateName` debería validar que:
    - El campo no está vacío
    - Que tiene una longitud de > 8

- **(2 pto)** El método `validateEmail` debería validar que:
    - El campo no está vacío
    - El campo es un mail válido (* buscar regex para validar)

- **(2 pto)** Hay que modificar el campo country para que:
    - cuando el usuario escribe, no se le muestren todos lo elementos, sólo los que coinciden con la expresión introducida. (* revisar el método `handleFillCountry`)

- **(2 pto)** El método `validatePassword` debería validar que:
    - (0.25pto) El campo no está vacío
    - (0.25pto) Que tiene una longitud de > 8
    - (1pto) Que cumple con el regex indicado

- **(2 pto)** El método `register`, debe realizar el fetch al API si y sólo si:
    - se cumplen las validaciones anteriores (name, email y contry)
    - el usuario ha seleccionado un gènero
    - el usuario ha marcado el checkbox "I confirm that all data are correct"

Para todas las validaciones, si no se cumple, se mostará el campo con `class == invalid-feedback`. En caso contrario, el campo con `valid-feedback`.

Para poder obtener los 2 ptos, será necesario implementarlo de tal manera que, los mensajes de OK/NOK aparezcan al abandonar el campo y no al pulsar el register. (Si no, se descontará 0.5 ptos)


## 👌Tips

Los métodos `showElementWithClassName` y `hideElementWithClassName`, te permiten mostrar campos buscando los hermanos a partir del nodo actual (es decir, una llamada como `showElementWithClassName(event.target, 'invalid-feedback')` provocará que busque el campo con `className == invalid-feedback` como un hermano del campo que ha provocado el evento)


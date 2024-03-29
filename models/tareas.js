const { leerDB } = require("../helpers/guardarArchivo");
const Tarea = require("./tarea");
require('colors');





class Tareas {

    _listado = {}

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }


    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas=[]){
        // const tareas = leerDB();
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green;

            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
             
            console.log(`\n${idx} ${desc} :: ${estado}`); 
            
        // Completada y numero en verde
        // pendiente en rojo
        // 1. alma :: completada @ pendiente


        })
        
    }



    listarPendientesCompletadas(completadas){
        let contador = 0
        console.log();
        this.listadoArr.forEach((tarea) => {

            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;


            if (completadas == true && completadoEn !== null){
                contador += 1;
                console.log(`${contador.toString().green}${'.'.green} ${desc} :: ${completadoEn.green}`);
            }

            if (completadas == false && completadoEn == null){
                contador += 1;
                console.log(`${contador.toString().green}${'.'.green} ${desc} :: ${estado}`);
            }


        })



    }


    borrarTarea(id) {
        
        if (this._listado[id]){
            delete this._listado[id];
        }

    }


    toggleCompletadas(ids = []){

        ids.forEach(id =>{        //completa la tarea si se marca

            const tarea = this._listado[id]
            if (!tarea.completadoEn) {

                tarea.completadoEn = new Date().toISOString()

            }

        });

        
        this.listadoArr.forEach(tarea =>{         //descompleta la tarea si no esta en el array de ids

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }
       



}

module.exports = Tareas;
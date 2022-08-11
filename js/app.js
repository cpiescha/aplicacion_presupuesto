const ingresos = [    //se crea un arreglo para guardar objetos de tipo ingreso
    new Ingreso('sueldo',2400),
    new Ingreso('venta cama',1000.00),
    new Ingreso('nuevo ingreso',300)
];

const egresos = [// agrelo que almacena objetos de tipo egreso
    new Egreso('renta ',500),
    new Egreso('Ropa',10000),
    new Egreso('otro ingreso',200)
];




let totalIngresos=()=>{ //concatena el valor de los objetos en el arreglo ingresos y los almacena
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso+=ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos=()=>{ //concatena el valor de los objetos en el arreglo ingresos y los almacena
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso+=egreso.valor;
    }
    return totalEgreso;
}

let cargarApp=()=>{//carga la aplicacion con las funciones
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero=()=>{// se recuperan los objetos html con el id asignado y se modifica por las variables creadas
    let presupuesto= totalIngresos() - totalEgresos();
    let porcentajeEgreso= totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML=formatomoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML=formatoporcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML=formatomoneda(totalIngresos());
    document.getElementById("egresos").innerHTML=formatomoneda(totalEgresos());
}

const formatomoneda=(valor)=>{ // le da formato al tipo de moneda que queramos
     return valor.toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimunFractionDigits:2});
}

const formatoporcentaje=(valor)=>{//le da formato de porcentaje
    return valor.toLocaleString('en-US',{style: 'percent',minimunFractionDigits:2});
}

const cargarIngresos=()=>{//funcion que muestra la lista de los ingresos
    let ingresosHTML='';
    for(let ingreso of ingresos){
        ingresosHTML+=crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;

}
const crearIngresoHTML=(ingreso)=>{// funcion que recibe un parametro y muestra un string con codigo html con los ingresos
    let ingresoHTML=`

    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatomoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>

    </div>

</div>`;
    return ingresoHTML;
}
const eliminarIngreso=(id)=>{//funcion que elimina un ingreso del arreglo
    let indiceEliminar=ingresos.findIndex(ingreso=>ingreso.id===id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
    

}
const cargarEgresos=()=>{
    let egresosHTML='';
    for(let egreso of egresos){
        egresosHTML+=crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=egresosHTML;

}
const crearEgresoHTML=(egreso)=>{
    let egresoHTML=`

    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-${formatomoneda(egreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>

    </div>

</div>`;
    return egresoHTML;
}

const eliminarEgreso=(id)=>{// funcion que recibe un id suministrado y lo compara con el id del arreglo
    let indiceEliminar=egresos.findIndex(egreso=>egreso.id===id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero(); 
    cargarEgresos();
}

let agregarDato=()=>{//funcion que agrega un valor a la lista de ingresos o egresos
    let forma=document.forms['forma'];//se accede al formulario en forma de arreglo
    let tipo=forma['tipo'];//se accede al id tipo incluyendo el id forma
    let descripcion=forma['descripcion'];
    let valor=forma['valor'];
    if(descripcion.value!==''&& valor.value!==''){
        if(tipo.value==='ingreso'){// condicional para que agregue un ingreso
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarIngresos();

        }
        else if(tipo.value==='egreso'){//condicional para agregar un egreso
            egresos.push(new Egreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarEgresos();
        
        }

    }
    
}

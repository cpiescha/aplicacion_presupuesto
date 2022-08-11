class Ingreso extends Dato{
    static ContadorIngresos=0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id=++Ingreso.ContadorIngresos;
    }
    get id(){
        return this._id;
    }
    
    
}
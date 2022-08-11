class Egreso extends Dato{
    static ContadorEgresos=0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id=++Egreso.ContadorEgresos;
    }
    get id(){
        return this._id;

    }
    
}
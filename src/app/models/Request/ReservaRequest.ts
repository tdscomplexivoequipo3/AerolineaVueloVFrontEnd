export class ReservaRequest{
  idReserva:any;
  fechaIda:any;
  fechaVuelta:any;
  observacion:any;
  fechaRegistro:any;
  origen:any;
  destino:any;
  pago:any;
  idServicio:any;
  idVuelo:any;
  idUsuario:any;
  private _estado:number=0;
  horaSalida:any=0;
  horaLlegada:any=0;

  public get estado(): number {
    return this._estado;
  }

  set estado(value: number) {
    this._estado = value;
  }
}

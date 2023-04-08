export interface InfoMaquina {
    nombre: string,
    descripcion : string,
    TipoMaquina : string,
    marca : string,
    pais : string,
    precio : number,
    existencia : number,
    image_1 : string,
    image_2 : string,
    image_3 : string
}

export interface MachinesResponse {
    status: string;
    message: string;
    data: InfoMaquina[];
  }
  



export interface IRegisterDTO {
  _id: string;
  fullname: string;
  nip: string;
  position: string;
  supervisor: string;
  supervisor_position: string;
  city: string;
  password: string;
}

export interface ILoginDTO {
  nip: string;
  password: string;
}

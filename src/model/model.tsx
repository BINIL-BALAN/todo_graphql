interface Task {
    id:number,
    task:string,
    status:boolean,
}
export interface User{
    id:string,
    name:string,
    email:string,
    task:Task[]
  }

  
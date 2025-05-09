export default class Company {
    public id : number;
    public name? : string;
    public address? : string;
    public phone? : string;
    public email? : string;

    constructor(id: number) {
        this.id = id; 
      }
}
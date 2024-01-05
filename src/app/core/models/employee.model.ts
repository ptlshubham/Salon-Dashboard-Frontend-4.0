export class Employee {
    constructor(
        public index?: number,
        public id?: number,
        public fname?: string,
        public lname?: string,
        public contact?: string,
        public whatsapp?: number,
        public gender?: string,
        public address?: string,
        public landmark?: string,
        public state?: string,
        public city?: string,
        public pincode?: string,
        public service: any = [],
        public salary?: number,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
        public services?: any,
        public isworking?: boolean
        // public dateofbirth?: string
    ) {
    }
}

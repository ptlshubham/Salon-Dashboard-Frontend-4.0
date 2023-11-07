export class ForgotPwd {
    constructor(
        public email?: string,
        public role?: string,
        public otp?: number,
        public id?: any,
        public password?: string,
        public cnfpwd?: string,
        public isactive?: boolean,
        public confmpassword?: string,
        public newpassword?: string,

    ) { }
}
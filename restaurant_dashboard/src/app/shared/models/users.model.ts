export class UserModel {
    id: number;
    roleId: number;
    firstName: string;
    lsatName: string;
    username: string;
    password: string;
    mobileNo: string;
    email: string;
    otp: number;
    address: string;
    age: number;
    aadharNo: string;
    imagepath: string;
    status: string;
    lastLogin: string;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
}

export class loginResp{
    user: UserModel;
    token: string;
}

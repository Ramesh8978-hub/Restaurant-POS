import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserStatusRepository } from 'src/user-status/repository/user-status.repository';
import { ChangePasswordDto, CreateUserDto, ForgotPasswordDto, OtpDto, UpdateUserDto, UserStatusDto } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { File } from './user.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Not } from 'typeorm';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { RolesEnum } from 'src/common/enums/role';
import { UserUpdateStatus } from 'src/common/enums/user-status';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
    @InjectRepository(UserStatusRepository)
    private userStatusRepository: UserStatusRepository,
    private readonly mailerService: MailerService
  ) { }


  async uploadFile(id: number, files: File[], path: string) {
    for await (var file of files) {
      if (path == "imagepath") {
        await this.userRepository.update({ id }, { [path]: file.filename })
      }
    }
    return;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      let role = await this.roleRepository.findOne({ id: createUserDto.roleId })
      let userStatus = await this.userStatusRepository.findOne({ userStatus:UserUpdateStatus.AVAILABLE })
      let createdBy = await this.userRepository.findOne({ id: createUserDto.createdBy })

      this.mailerService
        .sendMail({
          to: createUserDto.email,
          from: 'Restaurant POS',
          subject: 'Login Credentials',
          text: 'Please login with these credentials',
          html: `Please login with these credentials <br><br>
           username : <b>${createUserDto.username}</b> <br>
           password : <b>${createUserDto.mobileNo}</b>`
        })
        .then((data) => {
          // console.log(data);
        }).catch((err) => {
          console.log(err);
        })
      let data = await this.userRepository.insert({
        role: role,
        userStatus: userStatus,
        firstName: toTitleCase(createUserDto.firstName),
        lastName: toTitleCase(createUserDto.lastName),
        username: createUserDto.username,
        password: createUserDto.mobileNo,
        email: createUserDto.email,
        mobileNo: createUserDto.mobileNo,
        aadharNo: createUserDto.aadharNo,
        age: createUserDto.age,
        address: createUserDto.address,
        status: true,
        lastLogin: new Date().toISOString().toString(),
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy
      })
      return{
        status:201,
        message:"Added Successfully",
        data
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async findUsers() {
    try {
      let users = await this.userRepository.find({ relations: ['role'] })
      let role = await this.roleRepository.findOne({ where: { role: RolesEnum.ADMIN } })
      for await (let user of users) {
        const aa = user.role != role;
        if (user.role != role) {
          let data = await this.userRepository.find({ where: { role: Not(aa) }, relations: ['role', 'userStatus', 'createdBy'] });
          return data;
        }
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async profile(id: number) {
    try {
      let profile = await this.userRepository.findOne({ id }, { relations: ['role', 'userStatus', 'createdBy'] });
      if (profile) {
        return profile
      }
      else {
        throw new HttpException("Cannot find the User", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async validateUserById(id: number) {
    const userData = await this.userRepository.findOne({ where: { id } })
    if (!userData) {
      throw new NotFoundException();
    }
    else {
      return userData;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.userRepository.findOne({ id })
      if (user.status === updateUserDto.status) {
        await this.userRepository.update({ id }, {
          firstName: toTitleCase(updateUserDto.firstName),
          lastName: toTitleCase(updateUserDto.lastName),
          email: updateUserDto.email,
          mobileNo: updateUserDto.mobileNo,
          aadharNo: updateUserDto.aadharNo,
          age: updateUserDto.age,
          address: updateUserDto.address,
          lastLogin: new Date().toISOString().toString(),
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateUserDto.updatedBy
        })
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
         await this.userRepository.update({ id }, {
          status: updateUserDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateUserDto.updatedBy
        })
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUserStatus(id: number, userStatusDto: UserStatusDto) {
    try {
      let userStatus = await this.userStatusRepository.findOne({ id: userStatusDto.userStatusId })
      await this.userRepository.update({ id }, {
        userStatus,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: userStatusDto.updatedBy
      })
      return {
        status: 200,
        message: 'User Status updated successfully'
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      const userData = await this.userRepository.findOne({ where: { id } })
      if (userData) {
        return await this.userRepository.remove(userData);
      }
      else {
        throw new HttpException("Cannot find the User", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getEmployeesByRole(roleId: number) {
    try {
      let role = await this.roleRepository.findOne({ id: roleId })
      const data = await this.userRepository.find({ where: { role }, relations: ['role', 'userStatus'] });
      if (data) {
        return data;
      }
      else {
        throw new HttpException("Cannot find the Role", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getWaiters() {
    try {
      let role = await this.roleRepository.findOne({ where: { role: RolesEnum.WAITER } })
      const data = await this.userRepository.find({ where: { role }, relations: ['role', 'userStatus'] });
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getWaitersAndReceptionist() {
    try {
      let role = await this.roleRepository.find({
        where: [
          { role: RolesEnum.WAITER },
          { role: RolesEnum.RECEPTIONIST }
        ]
      })
      let users = []
      for await(let r of role){
        const data = await this.userRepository.find({ where: { role:r }, relations: ['role', 'userStatus'] });
         users = [...users,data]
      }
      return users;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getKitchen() {
    try {
      let role = await this.roleRepository.findOne({ where: { role: RolesEnum.KITCHEN } })
      const data = await this.userRepository.find({ where: { role }, relations: ['role', 'userStatus'] });
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAvailableWaiter() {
    try {
      let waiter = await this.roleRepository.findOne({ where: { role: RolesEnum.WAITER } })
      let userStatus = await this.userStatusRepository.findOne({ where: { userStatus: UserUpdateStatus.AVAILABLE, status: true, } })
      const data = await this.userRepository.find({ where: {status:true, role: waiter, userStatus }, relations: ['userStatus'] });
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    try {
      let user = await this.userRepository.findOne(id)
      if (user) {
        if (user.password === changePasswordDto.password) {
          await this.userRepository.update({ id }, {
            password: changePasswordDto.newpassword,
            updatedAt:new Date().toISOString().toString(),
            updatedBy:changePasswordDto.updatedBy
          })
          return {
            status: 200,
            message: 'Password changed successfully',
            userId: user.id,
            password: user.password,
            newpassword: changePasswordDto.newpassword
          }
        }
        else {
          throw new NotFoundException();
        }
      }
      else {
        throw new HttpException("Cannot find the User", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async sendOTP(createUserDto: CreateUserDto) {
    try {
      const userData = await this.userRepository.findOne({ where: { email: createUserDto.email } })
      if (userData) {
        userData.otp = parseInt(this.generateOTP())
        await this.userRepository.update({ email: userData.email }, {
          otp: userData.otp
        })
        if (userData.email === createUserDto.email) {
          this.mailerService
            .sendMail({
              to: createUserDto.email,
              from: 'Restaurant POS',
              subject: 'OTP',
              html: ` OTP (one time password) : <h2><b> ${userData.otp} </b></h2>`
            })
            .then((data) => {
              // console.log(data);
            }).catch((err) => {
              console.log(err);
            })
          return {
            status: 200,
            message: 'OTP send successfully',
            email: createUserDto.email
          }
        }
      }
      else {
        throw new HttpException("Cannot find the Email", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async matchOTP(otpDto: OtpDto) {
    try {
      const userData = await this.userRepository.findOne({ where: { email: otpDto.email } })
      if (userData) {
        if (userData.otp === otpDto.otp) {
          return {
            status:200,
            messege:"OTP matched"
          }
        }
        else {
          throw new NotFoundException("OTP dosen't  match");
        }
      }
      else {
        throw new HttpException("Cannot find the Email", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const userData = await this.userRepository.findOne({ where: { email: forgotPasswordDto.email } })
      if (userData) {
        await this.userRepository.update({ email: userData.email }, {
          password: forgotPasswordDto.password,
          updatedAt:new Date().toISOString().toString(),
        })
        return {
          status: 200,
          message: 'Password changed successfully',
          password: forgotPasswordDto.password
        }
      }
      else {
        throw new HttpException("Cannot find the Email", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}




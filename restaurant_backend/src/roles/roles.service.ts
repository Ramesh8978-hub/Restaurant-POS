import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/common/enums/role';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/roles.repository';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleRepository) private roleRepository: RoleRepository
  ) { }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      if (RolesEnum[createRoleDto.role.toUpperCase()]) {
        await this.roleRepository.insert({
          role: RolesEnum[createRoleDto.role.toUpperCase()],
          status: true,
          createdAt: new Date().toISOString().toString(),
        })
        return{
          status:201,
          message:"Added Successfully"
        }
      } else {
        throw new HttpException("Invalid Role", HttpStatus.BAD_REQUEST)
      }
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllRoles() {
    try {
      return await this.roleRepository.find();
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getRoleById(id: number) {
    try {
      let role = await this.roleRepository.findOne(id);
      if (role) {
        return role
      }
      else {
        throw new HttpException("Cannot find the Role", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    try {

      let role = await this.roleRepository.findOne({ where: { id } });
      if (role.status === updateRoleDto.status) {
        if (RolesEnum[updateRoleDto.role.toUpperCase()]) {
          this.roleRepository.update({ id }, {
            role: RolesEnum[updateRoleDto.role.toUpperCase()],
          });
          return {
            status: 200,
            message: 'Updated Successfully'
          }
        }
        else {
          throw new HttpException("Invalid Role", HttpStatus.BAD_REQUEST)
        }
      }
      else {
        this.roleRepository.update({ id }, {
          status: updateRoleDto.status,
        });
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

  async removeRole(id: number) {
    try {
      const roleData = await this.roleRepository.findOne(id)
      if (roleData) {
        return this.roleRepository.remove(roleData)
      }
      else {
        throw new HttpException("Cannot find the Role", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

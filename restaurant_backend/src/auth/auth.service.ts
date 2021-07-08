import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async loginUser(username: string, password: string) {
        try {
            const user = await this.userRepository.findOne({ status: true, username: username, password: password }, { relations: ['role'] })
            if (!user) {
                throw new UnauthorizedException(`No user exists with this username ${username}`);
            } else {
                const token = await this.jwtService.signAsync({ id: user.id, email: user.email });
                const lastLogin = new Date().toISOString().toString();
                return { user, token, lastLogin }
            }
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

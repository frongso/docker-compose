import { JsonController, Get, Authorized, Post, Body } from 'routing-controllers';
import { Role } from '../../entities/role';
import { RoleMapUser } from '../../entities/role-map-user';
import { SaveRoleModel } from '../../model/role.save.model';

@JsonController('/role')
export class RoleController {
  @Get('/getallrole')
  // @Authorized(['ADMIN'])
  getallrole() {
    return Role.find();
  }

  @Post('/saverole')
  // @Authorized(['ADMIN'])
  async saveuser_role(@Body() saverolemodel: SaveRoleModel) {
    const rolemapuser = new RoleMapUser();
    rolemapuser.Roleid = saverolemodel.role;
    rolemapuser.Userid = saverolemodel.user;
    rolemapuser.save();
  }
}

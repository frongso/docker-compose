import { SaveRoleModel } from './../../model/role.save.model';
import { UpdateRoleModel } from '../../model/role.update.model';
import { Role } from './../../entities/role';
import { RoleMapUser } from './../../entities/rsm_role_map_use';
import { JsonController, Get, Post, Body, Delete, QueryParam, Res } from 'routing-controllers';
import { Response } from 'express';
import { User } from '../../entities/user';

@JsonController('/role')
export class RoleController {
  @Get('/')
  getall() {
    return Role.find();
  }

  @Get('/select')
  async getselect(@QueryParam('id') roleid: number, @Res() response: Response) {
    const rolemapuserselect = await RoleMapUser.find({
      where: { role: roleid },
    });
    return response.send(rolemapuserselect);
  }

  @Post('/save')
  async save(@Body() saverolemodel: SaveRoleModel) {
    Role.save(saverolemodel.role);
    const rolemapuser = new RoleMapUser();
    rolemapuser.role = saverolemodel.role;
    rolemapuser.user = saverolemodel.user;
    rolemapuser.save();
  }

  @Delete('/delete')
  async delete(@QueryParam('id') roleid: number, @Res() response: Response) {
    const rolemapuserDel = await RoleMapUser.find({
      where: { role: roleid },
    });
    RoleMapUser.remove(rolemapuserDel);
    Role.delete(roleid);
    return response.sendStatus(200);
  }

  @Post('/update')
  async update(@Body() updaterolemodel: UpdateRoleModel) {
    const roleId = updaterolemodel.roleId;
    const roleName = updaterolemodel.roleName;
    const updateUsers = updaterolemodel.users;

    // Update role name
    // Get role from database using id
    const updateRoles = await Role.findOne({
      where: { id: roleId },
    });
    updateRoles.name = roleName;
    updateRoles.save();

    // Update rolemapuser.user
    // Get Unupdate user[]
    const oldRoleMapUsers = await RoleMapUser.find({
      where: { role: roleId },
      relations: ['user'],
    });
    // Unupdate user in arr
    const oldRoleMapUsersArr = [];
    oldRoleMapUsers.forEach((oldRoleMapUser) => {
      oldRoleMapUsersArr.push(oldRoleMapUser.user.id);
    });

    // Delete old user that not have in update
    oldRoleMapUsersArr.forEach(async (oldRoleMapUser) => {
      if (!updateUsers.includes(oldRoleMapUser)) {
        const deleteRoleMapUser = await RoleMapUser.find({
          where: { user: oldRoleMapUser },
        });
        RoleMapUser.remove(deleteRoleMapUser);
      }
    });

    // Add user in update in to database
    updateUsers.forEach(async (updateUser) => {
      if (!oldRoleMapUsersArr.includes(updateUser)) {
        const updaterolemapuser = new RoleMapUser();
        updaterolemapuser.role = updateRoles;
        // Get user from userid in update
        const getUser = await User.findOne({
          where: { id: updateUser },
        });
        updaterolemapuser.user = getUser;
        updaterolemapuser.save();
      }
    });
    return 'ddcdwc';
  }
}

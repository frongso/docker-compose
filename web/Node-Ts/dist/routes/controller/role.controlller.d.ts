import { SaveRoleModel } from './../../model/role.save.model';
import { UpdateRoleModel } from '../../model/role.update.model';
import { Role } from './../../entities/role';
import { Response } from 'express';
export declare class RoleController {
    getall(): Promise<Role[]>;
    getselect(roleid: number, response: Response): Promise<Response<any>>;
    save(saverolemodel: SaveRoleModel): Promise<void>;
    delete(roleid: number, response: Response): Promise<Response<any>>;
    update(updaterolemodel: UpdateRoleModel): Promise<void>;
}

import { Controller, Get, JsonController, Body } from 'routing-controllers';
import { compute, maximumSum } from '../service/list.service';

@JsonController('/list')
export class ListController {
  @Get('/2list')
  compute2list() {
    return compute();
  }

  @Get('/maximum')
  findmax() {
    const n1 = 4;
    const matrix1 = [
      [0, -2, -7, 0],
      [10, 3, -6, 2],
      [-4, 1, -4, 1],
      [-1, 8, 0, 2],
    ];

    const n2 = 2;
    const matrix2 = [
      [-2, -3],
      [-1, -5],
    ];

    const n3 = 3;
    const matrix3 = [
      [1, 6, -2],
      [-2, -2, -3],
      [-2, -2, 7],
    ];
    return maximumSum(n1, matrix1);
  }
}

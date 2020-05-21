import { Stock } from './../../entities/stock';
import { JsonController, Post, Delete, Body } from 'routing-controllers';

@JsonController('/stock')
export class StockController {
  // create only stock
  @Post('/create')
  create(@Body() stock: Stock) {
    Stock.save(stock);
    return 'create stock !!';
  }

  // edit stock and add product in to ProductMapStock
  @Post('/edit')
  edit() {
    return 'edit will go here';
  }

  // delete stock when stock is empty
  @Delete()
  delete() {
    return 'delete will go here';
  }

  // also not forget to check admin
}

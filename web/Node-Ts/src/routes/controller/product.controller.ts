import { ProductMapStock } from './../../entities/rsm_product_map_stock';
import { Product } from './../../entities/product';
import { JsonController, Post, Delete, Body, QueryParam, Res } from 'routing-controllers';

@JsonController('/product')
export class ProductController {
  @Post('/create')
  create(@Body() product: Product) {
    Product.save(product);
    return 'create product!!';
  }

  @Post('/edit')
  edit(@QueryParam('id', { required: true }) productid : number, @Body() product : Product, @R) {
    return 'edit will go here';
  }

  @Delete('/delete')
  async delete(@QueryParam('id') productid: number) {
    const productmapstockDel = await ProductMapStock.find({
      where: { product: productid },
    });
    ProductMapStock.remove(productmapstockDel);
    Product.delete(productid);
    return 'delete product !!';
  }

  // also not forget to check admin
}

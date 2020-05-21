// import { Stock } from './stock';
// import { Entity, BaseEntity, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Product } from './product';

// @Entity({
//   name: 'msm_product',
//   schema: 'shopping_mall',
// })
// export class ProductMapStock extends BaseEntity {
//   @Column('bigint', {
//     name: 'RSM_PRS_ID',
//     primary: true,
//     nullable: false,
//     generated: true,
//     width: 22,
//   })
//   id: number;
//   @Column('varchar', {
//     name: 'RSM_PRS_QUANTITY',
//     nullable: false,
//     length: 50,
//   })
//   quantity: string;

//   @Column('bigint', {
//     name: 'MSM_PRO_CREATE_USER_ID',
//     nullable: false,
//     width: 22,
//   })
//   useradmin: number;

//   @ManyToOne((type) => Product, (product) => product.productmapstock)
//   @JoinColumn({ name: 'MSM_PRO_ID' })
//   product: Product;

//   @ManyToOne((type) => Stock, (stock) => stock.productmapstock)
//   @JoinColumn({ name: 'MSM_STK_ID' })
//   stock: Stock;
// }

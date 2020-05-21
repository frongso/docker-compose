// import { ProductMapStock } from './rsm_product_map_stock';
// import { Entity, BaseEntity, Column, OneToMany, JoinTable } from 'typeorm';

// @Entity({
//   name: 'msm_product',
//   schema: 'shopping_mall',
// })
// export class Product extends BaseEntity {
//   @Column('bigint', {
//     name: 'MSM_PRO_ID',
//     primary: true,
//     nullable: false,
//     generated: true,
//     width: 22,
//   })
//   id: number;
//   @Column('varchar', {
//     name: 'MSM_PRO_NAME',
//     nullable: false,
//     length: 50,
//   })
//   name: string;
//   @Column('bigint', {
//     name: 'MSM_PRO_PRICE',
//     nullable: false,
//   })
//   price: number;
//   @Column('varchar', {
//     name: 'MSM_PRO_DESC',
//     length: 50,
//   })
//   desc: string;

//   @Column('bigint', {
//     name: 'MSM_PRO_CREATE_USER_ID',
//     nullable: false,
//     width: 22,
//   })
//   useradmin: number;

//   @OneToMany((type) => ProductMapStock, (productmapstock) => productmapstock.product)
//   @JoinTable()
//   productmapstock: ProductMapStock;

//   // productmapuser : ProductMapUser
// }

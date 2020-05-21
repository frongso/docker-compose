// import { Entity, BaseEntity, Column, OneToMany, JoinTable } from 'typeorm';
// import { ProductMapStock } from './rsm_product_map_stock';

// @Entity({
//   name: 'msm_stock',
//   schema: 'shopping_mall',
// })
// export class Stock extends BaseEntity {
//   @Column('bigint', {
//     name: 'MSM_STK_ID',
//     primary: true,
//     nullable: false,
//     generated: true,
//     width: 22,
//   })
//   id: number;
//   @Column('varchar', {
//     name: 'MSM_STK_NAME',
//     nullable: false,
//     length: 50,
//   })
//   name: string;
//   @Column('varchar', {
//     name: 'MSM_STK_LOCATION',
//     length: 50,
//   })
//   location: string;

//   @Column('bigint', {
//     name: 'MSM_PRO_CREATE_USER_ID',
//     nullable: false,
//     width: 22,
//   })
//   useradmin: number;

//   @OneToMany((type) => ProductMapStock, (productmapstock) => productmapstock.stock)
//   @JoinTable()
//   productmapstock: ProductMapStock;

//   // stockmapuser : StockMapUser
// }

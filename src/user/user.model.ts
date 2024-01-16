import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'user',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}

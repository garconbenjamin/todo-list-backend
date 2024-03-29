import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'user',
  underscored: false,
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
  groupId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}

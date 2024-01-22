import {
  Column,
  Model,
  Table,
  BelongsTo,
  AfterUpdate,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'task',
  underscored: false,
})
export class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column({
    allowNull: false,
  })
  creatorId!: number;

  @Column
  followerId: number;

  @Column
  groupId: number;

  @Column
  parentId: number;

  @Column
  assigneeId: number;

  @Column
  startTime: Date;

  @Column
  dueTime: Date;

  @Column({ defaultValue: 1 })
  status: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  updatedBy?: number;

  @BelongsTo(() => User, 'creatorId')
  creator: User;

  @AfterUpdate
  static logUpdate(instance: Task) {
    const changedFields = instance.changed();

    if (changedFields && changedFields.length > 0) {
      changedFields.forEach((field) => {
        if (field === 'assigneeId' || field === 'status') {
          TaskLog.create({
            userId: instance.updatedBy,
            action: field,
            status: instance[field]?.toString() || 'Null',
            taskId: instance.id,
          });
        }
      });
    }
  }
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'taskLog',
})
export class TaskLog extends Model<TaskLog> {
  @Column
  userId: number;

  @Column
  action: string;

  @Column
  status: string;

  @Column
  taskId: number;

  @Column
  createdAt: Date;
}

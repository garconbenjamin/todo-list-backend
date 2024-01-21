import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
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
  groupId: number;

  @Column
  parentId: number;

  @Column
  assigneeId: number;

  @Column
  startTime: Date;

  @Column
  dueTime: Date;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => User, 'creatorId')
  creator: User;
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'taskFollow',
})
export class TaskFollow extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  userId: number;

  @Column
  taskId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Task, 'taskId')
  task: Task;
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

  @Column
  updatedAt: Date;
}

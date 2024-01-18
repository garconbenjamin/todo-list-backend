import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'task',
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

  @Column
  creator_id: number;

  @Column
  due_time: Date;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BelongsTo(() => User, 'creator_id')
  creator: User;
}

@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'task_assignment',
})
export class TaskAssignment extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  user_id: number;

  @Column
  task_id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Task, 'task_id')
  task: Task;
}

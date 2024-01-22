import { Injectable } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from './dto';

import { InjectModel } from '@nestjs/sequelize';
import { Task, TaskLog } from './task.model';
import { User } from '../user/user.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(TaskLog)
    private taskLogModel: typeof TaskLog,
  ) {}

  create(input: CreateTaskInput) {
    const { title, description, startTime, dueTime, creatorId, parentId } =
      input;
    return this.taskModel.create({
      title,
      description,
      startTime,
      dueTime,
      parentId,
      creatorId,
    });
  }

  getAssignmentsByUserId(userId: number) {
    return this.taskModel.findAll({
      where: { userId },
    });
  }

  findAll(where: Partial<Pick<Task, 'groupId' | 'parentId'>>) {
    return this.taskModel.findAll({ where });
  }

  findOne(id: number) {
    return this.taskModel.findByPk(id);
  }

  update(updateTaskInput: UpdateTaskInput, updatedBy: number) {
    const { id, ...restInput } = updateTaskInput;
    return this.taskModel.update(
      { ...restInput, updatedBy },
      {
        where: { id },
        individualHooks: true,
      },
    );
  }
  getTaskLogsByTaskId(taskId: number) {
    return this.taskLogModel.findAll({
      where: { taskId },
    });
  }
  handleCompleteParentTask = async (
    task: Task,
    updateTaskInput: UpdateTaskInput,
    userIdCtx: number,
  ) => {
    if (task.parentId && updateTaskInput.status) {
      const childTask = await this.findAll({
        parentId: task.parentId,
      });

      const incompletedTask = childTask.filter(
        (task) => task.status !== 3,
      ).length;
      if (incompletedTask === 0) {
        await this.update({ id: task.parentId, status: 3 }, userIdCtx);
      }
    }
  };

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

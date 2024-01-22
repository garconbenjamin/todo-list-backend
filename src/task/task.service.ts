import { Injectable } from '@nestjs/common';
import { CreateTaskInput, FollowTaskInput, UpdateTaskInput } from './dto';

import { InjectModel } from '@nestjs/sequelize';
import { Task, TaskFollow, TaskLog } from './task.model';
import { User } from '../user/user.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(TaskFollow)
    private taskFollowModel: typeof TaskFollow,
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

  async followTask(followTaskInput: FollowTaskInput) {
    const { userId, taskId } = followTaskInput;
    const [data] = await this.taskFollowModel.findOrCreate({
      where: { userId, taskId },
    });

    return data.dataValues;
  }
  async unfollowTask(followTaskInput: FollowTaskInput) {
    const { userId, taskId } = followTaskInput;
    await this.taskFollowModel.destroy({ where: { userId, taskId } });
    return 'Task unfollowed successfully';
  }
  getAssignmentsByUserId(userId: number) {
    return this.taskModel.findAll({
      where: { userId },
    });
  }

  getFollowersByTaskId(taskId: number) {
    return this.taskFollowModel.findAll({
      where: { taskId },
    });
  }
  getFollowTaskByUserId(userId: number) {
    return this.taskFollowModel.findAll({
      where: { userId },
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title', 'description', 'dueTime', 'createdAt'],
        },
      ],
    });
  }

  findAll(where: Pick<Task, 'groupId'>) {
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
  getTaskLogByTaskId(taskId: number) {
    return this.taskLogModel.findAll({
      where: { taskId },
    });
  }
  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

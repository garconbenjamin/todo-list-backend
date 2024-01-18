import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task, TaskAssignment } from './task.model';
import { User } from '../user/user.model';
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
    @InjectModel(TaskAssignment)
    private taskAssignmentModel: typeof TaskAssignment,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { title, description, due_time, creator_id } = createTaskDto;
    const task = await this.taskModel.create({
      title,
      description,
      due_time,
      creator_id,
    });
    return task;
  }
  async assign(assignTaskDto: any) {
    const { user_id, task_id } = assignTaskDto;
    const task = await this.taskModel.findOne({
      where: { id: task_id },
    });
    if (!task) {
      return 'Task does not exist';
    }
    const user = await this.userModel.findOne({
      where: { id: user_id },
    });
    if (!user) {
      return 'User does not exist';
    }
    await this.taskAssignmentModel.create({
      task_id,
      user_id,
    });

    return 'Task assigned successfully';
  }

  async getAssignmentsByUserId(user_id: number) {
    const assignments = await this.taskAssignmentModel.findAll({
      where: { user_id },
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title', 'description', 'due_time'],
          include: [
            {
              model: User,
              as: 'creator',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return assignments;
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

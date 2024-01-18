export class CreateTaskDto {
  title: string;
  description: string;
  due_time: Date;
  creator_id: number;
}

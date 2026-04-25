import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditService } from '../audit/audit.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly auditService: AuditService,
  ) {}

  async createTask(meetingId: string, payload: CreateTaskDto, actorId: string): Promise<Task> {
    const task = this.tasksRepository.create({
      ...payload,
      meetingId,
    });
    const saved = await this.tasksRepository.save(task);
    await this.auditService.logAction(actorId, 'CreateTask', 'Task', saved.id, { title: saved.title });
    return saved;
  }

  async createTasksFromMinutes(meetingId: string, tasks: CreateTaskDto[], actorId: string): Promise<Task[]> {
    const createdTasks = [];
    for (const task of tasks) {
      const created = await this.createTask(meetingId, task, actorId);
      createdTasks.push(created);
    }
    return createdTasks;
  }

  async updateTaskStatus(id: string, payload: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, payload);
    if (payload.status === 'Completed' && !task.completedAt) {
      task.completedAt = new Date();
    }
    const updated = await this.tasksRepository.save(task);
    await this.auditService.logAction(userId, 'UpdateTask', 'Task', updated.id, { changes: payload });
    return updated;
  }

  async getTasksForUser(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { assigneeId: userId },
      order: { dueDate: 'ASC', createdAt: 'ASC' },
    });
  }

  async getTasksByMeeting(meetingId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { meetingId },
      order: { createdAt: 'ASC' },
    });
  }
}

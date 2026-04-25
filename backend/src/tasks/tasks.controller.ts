import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/tasks')
@UseGuards(AuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Req() request: any) {
    const userId = request.user?.id ?? 'unknown';
    return { data: await this.tasksService.getTasksForUser(userId) };
  }

  @Patch(':id')
  async updateTask(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId = request.user?.id ?? 'unknown';
    return this.tasksService.updateTaskStatus(id, updateTaskDto, userId);
  }
}

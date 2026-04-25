import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('api/meetings')
@UseGuards(AuthGuard, RolesGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @Roles('Admin', 'Organizer')
  async createMeeting(@Req() request: any, @Body() createMeetingDto: CreateMeetingDto) {
    const userId = request.user?.id ?? 'unknown';
    return this.meetingsService.createMeeting(userId, createMeetingDto);
  }

  @Patch(':id')
  @Roles('Admin', 'Organizer')
  async updateMeeting(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    const userId = request.user?.id ?? 'unknown';
    return this.meetingsService.updateMeeting(id, updateMeetingDto, userId);
  }

  @Get()
  async getMeetings() {
    return { data: await this.meetingsService.getMeetings() };
  }

  @Get(':id')
  async getMeeting(@Param('id') id: string) {
    return this.meetingsService.getMeetingById(id);
  }
}

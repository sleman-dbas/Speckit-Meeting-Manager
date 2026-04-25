import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParticipantsService } from './participants.service';
import { AddParticipantsDto } from './dto/add-participants.dto';

@Controller('api/meetings/:meetingId/participants')
@UseGuards(AuthGuard, RolesGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @Roles('Admin', 'Organizer')
  async addParticipants(
    @Req() request: any,
    @Param('meetingId') meetingId: string,
    @Body() addParticipantsDto: AddParticipantsDto,
  ) {
    const actorId = request.user?.id ?? 'unknown';
    return this.participantsService.addParticipants(meetingId, addParticipantsDto, actorId);
  }
}

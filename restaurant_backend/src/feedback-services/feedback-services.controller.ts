import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { FeedbackServicesService } from './feedback-services.service';
import { CreateFeedbackServiceDto } from './dto/create-feedback-service.dto';
import { UpdateFeedbackServiceDto } from './dto/update-feedback-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback-Services')
@Controller('feedback-services')
export class FeedbackServicesController {
  constructor(private readonly feedbackServicesService: FeedbackServicesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createFeedbackServiceDto: CreateFeedbackServiceDto) {
    return this.feedbackServicesService.create(createFeedbackServiceDto);
  }

  @Get()
  getAllFeedbackServices() {
    return this.feedbackServicesService.getAllFeedbackServices();
  }

  @Get('status')
  getFeedbackServicesByStatus() {
    return this.feedbackServicesService.getFeedbackServicesByStatus();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.feedbackServicesService.findOne(id);
  }
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateFeedbackServiceDto: UpdateFeedbackServiceDto) {
    return this.feedbackServicesService.update(id, updateFeedbackServiceDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.feedbackServicesService.remove(id);
  }
}

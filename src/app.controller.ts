import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param('type') type: 'income' | 'expense') {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter(({ type }) => type === reportType);
  }

  @Get(':id')
  getReportById() {
    return [];
  }

  @Post()
  createReport() {
    return [];
  }

  @Put(':id')
  updateReport() {
    return [];
  }

  @Delete(':id')
  deleteReport() {
    return [];
  }
}

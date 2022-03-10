import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 } from 'uuid';
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
  getReportById(
    @Param('type') type: 'income' | 'expense',
    @Param('id') uuid: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return [
      data.report
        .filter(({ type }) => type === reportType)
        .find(({ id }) => id === uuid),
    ];
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: 'income' | 'expense',
  ) {
    const newReport = {
      id: v4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
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

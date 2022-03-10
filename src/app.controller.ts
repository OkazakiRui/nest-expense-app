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
  updateReport(
    @Param('type') type: 'income' | 'expense',
    @Param('id') uuid: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const prefReport = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === uuid);

    if (prefReport === null) return;

    const reportIndex = data.report.findIndex(({ id }) => id === prefReport.id);

    const newReport = {
      source,
      amount,
      updated_at: new Date(),
      id: prefReport.id,
      type: prefReport.type,
      created_at: prefReport.created_at,
    };
    data.report[reportIndex] = newReport;

    return newReport;
  }

  @Delete(':id')
  deleteReport() {
    return [];
  }
}

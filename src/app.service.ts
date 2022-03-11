import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { data, ReportType } from './data';

type ReportData = {
  uuid?: string;
  source: string;
  amount: number;
};

@Injectable()
export class AppService {
  getAllIncomeReports(reportType: ReportType) {
    return data.report.filter(({ type }) => type === reportType);
  }

  getReportById(reportType: ReportType, uuid: string) {
    return [
      data.report
        .filter(({ type }) => type === reportType)
        .find(({ id }) => id === uuid),
    ];
  }

  createReport(reportType: ReportType, { source, amount }: ReportData) {
    const newReport = {
      id: v4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(reportType: ReportType, { uuid, source, amount }: ReportData) {
    const prefReport = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === uuid);

    if (prefReport === null) return;

    const reportIndex = data.report.findIndex(({ id }) => id === prefReport.id);

    const newReport = {
      source,
      amount,
      updated_at: new Date(),
    };
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...newReport,
    };

    return data.report[reportIndex];
  }

  deleteReport(uuid: string) {
    const reportIndex = data.report.findIndex((report) => report.id === uuid);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}

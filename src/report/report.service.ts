import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { data, ReportType } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';

type ReportData = {
  source: string;
  amount: number;
};

type UpdateReportData = {
  uuid: string;
  source?: string;
  amount?: number;
};

@Injectable()
export class ReportService {
  getAllReports(reportType: ReportType): ReportResponseDto[] {
    return data.report
      .filter(({ type }) => type === reportType)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(reportType: ReportType, uuid: string): ReportResponseDto {
    const report = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === uuid);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(
    reportType: ReportType,
    { source, amount }: ReportData,
  ): ReportResponseDto {
    const newReport = {
      id: v4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    reportType: ReportType,
    { uuid, source, amount }: UpdateReportData,
  ): ReportResponseDto {
    const prefReport = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === uuid);

    if (!prefReport) return;

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

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(uuid: string) {
    const reportIndex = data.report.findIndex((report) => report.id === uuid);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}

const cron = require('node-cron');
const ReportService = require('../services/reportService');

cron.schedule('0 0 * * 0', async () => {
  try {
    console.log("Menghasilkan laporan mingguan...");
    await ReportService.generateWeeklyReport();
    console.log("Laporan mingguan berhasil dibuat dan disimpan di cache");
  } catch (error) {
    console.error("error saat menghasilkan laporan mingguan:", error);
  }
});

angular.module('noagendaqsoparty').constant('constants', {
  db: {
    dbName: 'noagendaqsoparty',
    contestantCollection: 'contestants',
    contestLogsCollection: 'contestLogs',
    qsoRecordsCollection: 'qsoRecords'
  },
    localStorage: {
        currentContestLog: 'CURRENT_CONTEST_LOG'
    }
});

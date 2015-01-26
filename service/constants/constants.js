angular.module('noagendaqsoparty').constant('constants', {
  db: {
    dbName: 'noagendaqsoparty',
    contestantCollection: 'contestants',
    contestLogsCollection: 'contestLogs',
    qsoRecordsCollection: 'qsoRecords'
  },
    localStorage: {
        currentContestLog: 'CURRENT_CONTEST_LOG',
        currentContestLogQsoData: 'CURRENT_CONTEST_LOG_QSO_DATA',
        currentUser: 'CURRENT_USER'
    },
    siteUris: {
        home: '/',
        register: '/register',
        login: '/login',
        logbook: '/logbook',
        contestlog: '/contestlog',
        results: '/results',
        rules: '/rules'
    },
    partials: {
        home: 'partial/home/home.html',
        register: 'partial/register/register.html',
        login: 'partial/login/login.html',
        logbook: 'partial/logbook/logbook.html',
        contestlog: 'partial/contestLog/contestLog.html',
        results: 'partial/results/results.html',
        rules: 'partial/rules/rules.html'
    }
});

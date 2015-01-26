angular.module('noagendaqsoparty').factory('contestLogDataService', function (messaging, events, constants, mongolab, modelTransformer, ContestLog) {

    var getContestLogsByCallSign = function (callSign) {
        return mongolab.query(constants.db.dbName, constants.db.contestLogsCollection, {q: {callsign: callSign}})
            .then(getContestLogsByCallSignSuccessHandler, getContestLogsByCallSignErrorHandler);
    };

    var getContestLogsByCallSignSuccessHandler = function (response) {
        if (response.data.length > 0) {
            var result;
            result = modelTransformer.transform(response.data, ContestLog);
            messaging.publish(events.message._GET_CONTEST_LOG_BY_CALL_SIGN_COMPLETE_, [result]);
        } else {
            getContestLogsByCallSignErrorHandler();
        }
    };

    var getContestLogsByCallSignErrorHandler = function () {
        messaging.publish(events.message._GET_CONTEST_LOG_BY_CALL_SIGN_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get contest logs from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_CONTEST_LOG_BY_CALL_SIGN_, getContestLogsByCallSign);

    var getContestLogsByContestantId = function (id) {
        return mongolab.query(constants.db.dbName, constants.db.contestLogsCollection, {q: {contestant: id}})
            .then(getContestLogsByContestantIdSuccessHandler, getContestLogsByContestantIdErrorHandler);
    };

    var getContestLogsByContestantIdSuccessHandler = function (response) {
        if (response.data.length > 0) {
            var result;
            result = modelTransformer.transform(response.data, ContestLog);
            messaging.publish(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_COMPLETE_, [result]);
        } else {
            getContestLogsByContestantIdErrorHandler();
        }
    };

    var getContestLogsByContestantIdErrorHandler = function () {
        messaging.publish(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get contest logs from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_, getContestLogsByContestantId);

    var getContestLogById = function (id) {
        return mongolab.queryById(constants.db.dbName, constants.db.contestLogsCollection, id, [])
            .then(getContestLogByIdSuccessHandler, getContestLogByIdErrorHandler);
    };

    var getContestLogByIdSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, ContestLog);
            messaging.publish(events.message._GET_CONTEST_LOG_BY_ID_COMPLETE_, [result]);
        }
        else {
            getContestLogByIdErrorHandler();
        }
    };

    var getContestLogByIdErrorHandler = function () {
        messaging.publish(events.message._GET_CONTEST_LOG_BY_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get contest log by id from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_CONTEST_LOG_BY_ID_, getContestLogById);

    var createContestLog = function (contest) {
        return mongolab.create(constants.db.dbName, constants.db.contestLogsCollection, contest)
            .then(createContestLogSuccessHandler, createContestLogErrorHandler);
    };

    var createContestLogSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, ContestLog);
            messaging.publish(events.message._CREATE_CONTEST_LOG_COMPLETE_, [result]);
        }
        else {
            createContestLogErrorHandler();
        }
    };

    var createContestLogErrorHandler = function () {
        messaging.publish(events.message._CREATE_CONTEST_LOG_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to create contest log', 'alert.warning']);
    };

    messaging.subscribe(events.message._CREATE_CONTEST_LOG_, createContestLog);

    var updateContestLog = function (contestLog) {
        contestLog._id = {$oid: contestLog.id};
        return mongolab.update(constants.db.dbName, constants.db.contestLogsCollection, contestLog)
            .then(updateContestLogSuccessHandler, updateContestLogErrorHandler);
    };

    var updateContestLogSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, ContestLog);
            messaging.publish(events.message._UPDATE_CONTEST_LOG_COMPLETE_, [result]);
        }
        else {
            updateContestLogErrorHandler();
        }
    };

    var updateContestLogErrorHandler = function () {
        messaging.publish(events.message._UPDATE_CONTEST_LOG_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to update contestant', 'alert.warning']);
    };

    messaging.subscribe(events.message._UPDATE_CONTEST_LOG_, updateContestLog);

    var deleteContestLog = function (contestLog) {
        contestLog._id = {$oid: contestLog.id};
        return mongolab.delete(constants.db.dbName, constants.db.contestLogsCollection, contestLog)
            .then(deleteContestLogSuccessHandler, deleteContestLogErrorHandler);
    };

    var deleteContestLogSuccessHandler = function (response) {
        if (response.status === 200) {
            messaging.publish(events.message._DELETE_CONTEST_LOG_COMPLETE_);
        }
        else {
            deleteContestLogErrorHandler();
        }
    };

    var deleteContestLogErrorHandler = function () {
        messaging.publish(events.message._DELETE_CONTEST_LOG_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to delete contest log', 'alert.warning']);
    };

    messaging.subscribe(events.message._DELETE_CONTEST_LOG_, deleteContestLog);

    var init = function () {
    };

    var contestLogDataService = {
        init: init
    };

    return contestLogDataService;
});

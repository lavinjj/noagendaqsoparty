angular.module('noagendaqsoparty').factory('qsoRecordDataService', function (messaging, events, constants, mongolab, modelTransformer, QsoRecord) {

    var getQsoRecordsByCallSign = function (callSign) {
        return mongolab.query(constants.db.dbName, constants.db.qsoRecordsCollection, {q: {callsign: callSign}, $orderby: { index : 1 }})
            .then(getQsoRecordsByCallSignSuccessHandler, getQsoRecordsByCallSignErrorHandler);
    };

    var getQsoRecordsByCallSignSuccessHandler = function (response) {
        if (response.data.length > 0) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._GET_QSO_RECORDS_BY_CALL_SIGN_COMPLETE_, [result]);
        } else {
            getQsoRecordsByCallSignErrorHandler();
        }
    };

    var getQsoRecordsByCallSignErrorHandler = function () {
        messaging.publish(events.message._GET_QSO_RECORDS_BY_CALL_SIGN_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get qso records from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_QSO_RECORDS_BY_CALL_SIGN_, getQsoRecordsByCallSign);

    var getQsoRecordsByContestantId = function (id) {
        return mongolab.query(constants.db.dbName, constants.db.qsoRecordsCollection, {q: {contestant: id}, $orderby: { index : 1 }})
            .then(getQsoRecordsByContestantIdSuccessHandler, getQsoRecordsByContestantIdErrorHandler);
    };

    var getQsoRecordsByContestantIdSuccessHandler = function (response) {
        if (response.data.length > 0) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._GET_QSO_RECORDS_BY_CONTESTANT_ID_COMPLETE_, [result]);
        } else {
            getQsoRecordsByContestantIdErrorHandler();
        }
    };

    var getQsoRecordsByContestantIdErrorHandler = function () {
        messaging.publish(events.message._GET_QSO_RECORDS_BY_CONTESTANT_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get qso records from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_QSO_RECORDS_BY_CONTESTANT_ID_, getQsoRecordsByContestantId);

    var getQsoRecordsByContestLogId = function (id) {
        return mongolab.query(constants.db.dbName, constants.db.qsoRecordsCollection, {q: {contestLog: id}, $orderby: { index : 1 }})
            .then(getQsoRecordsByContestLogIdSuccessHandler, getQsoRecordsByContestLogIdErrorHandler);
    };

    var getQsoRecordsByContestLogIdSuccessHandler = function (response) {
        if (response.data.length > 0) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_COMPLETE_, [result]);
        } else {
            getQsoRecordsByContestLogIdErrorHandler();
        }
    };

    var getQsoRecordsByContestLogIdErrorHandler = function () {
        messaging.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get qso records from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_, getQsoRecordsByContestLogId);

    var getQsoRecordById = function (id) {
        return mongolab.queryById(constants.db.dbName, constants.db.qsoRecordsCollection, id, [])
            .then(getQsoRecordByIdSuccessHandler, getQsoRecordByIdErrorHandler);
    };

    var getQsoRecordByIdSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._GET_QSO_RECORD_BY_ID_COMPLETE_, [result]);
        }
        else {
            getQsoRecordByIdErrorHandler();
        }
    };

    var getQsoRecordByIdErrorHandler = function () {
        messaging.publish(events.message._GET_QSO_RECORD_BY_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get qso record by id from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_QSO_RECORD_BY_ID_, getQsoRecordById);

    var createQsoRecord = function (contest) {
        return mongolab.create(constants.db.dbName, constants.db.qsoRecordsCollection, contest)
            .then(createQsoRecordSuccessHandler, createQsoRecordErrorHandler);
    };

    var createQsoRecordSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._CREATE_QSO_RECORD_COMPLETE_, [result]);
        }
        else {
            createQsoRecordErrorHandler();
        }
    };

    var createQsoRecordErrorHandler = function () {
        messaging.publish(events.message._CREATE_QSO_RECORD_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to create qso record', 'alert.warning']);
    };

    messaging.subscribe(events.message._CREATE_QSO_RECORD_, createQsoRecord);

    var updateQsoRecord = function (contestLog) {
        return mongolab.update(constants.db.dbName, constants.db.qsoRecordsCollection, contestLog)
            .then(updateQsoRecordSuccessHandler, updateQsoRecordErrorHandler);
    };

    var updateQsoRecordSuccessHandler = function (response) {
        if (response.data) {
            var result;
            result = modelTransformer.transform(response.data, QsoRecord);
            messaging.publish(events.message._UPDATE_QSO_RECORD_COMPLETE_, [result]);
        }
        else {
            updateQsoRecordErrorHandler();
        }
    };

    var updateQsoRecordErrorHandler = function () {
        messaging.publish(events.message._CREATE_QSO_RECORD_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to update contestant', 'alert.warning']);
    };

    messaging.subscribe(events.message._UPDATE_QSO_RECORD_, updateQsoRecord);

    var deleteQsoRecord = function (contestLog) {
        return mongolab.delete(constants.db.dbName, constants.db.qsoRecordsCollection, contestLog)
            .then(deleteQsoRecordSuccessHandler, deleteQsoRecordErrorHandler);
    };

    var deleteQsoRecordSuccessHandler = function (response) {
        if (response.status === 200) {
            messaging.publish(events.message._DELETE_QSO_RECORD_COMPLETE_);
        }
        else {
            deleteQsoRecordErrorHandler();
        }
    };

    var deleteQsoRecordErrorHandler = function () {
        messaging.publish(events.message._DELETE_QSO_RECORD_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to delete qso record', 'alert.warning']);
    };

    messaging.subscribe(events.message._DELETE_QSO_RECORD_, deleteQsoRecord);

    var init = function () {
    };

    var qsoRecordDataService = {
        init: init
    };

    return qsoRecordDataService;
});

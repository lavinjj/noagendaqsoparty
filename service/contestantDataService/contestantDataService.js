angular.module('noagendaqsoparty').factory('contestantDataService', function (messaging, events, constants, mongolab, modelTransformer, Contestant) {
  var contestants = [];

  var getContestantByUserName = function (username) {
    return mongolab.query(constants.db.dbName, constants.db.contestantCollection, {q: {UserName: username}})
      .then(getContestantByUserNameSuccessHandler, getContestantByUserNameErrorHandler);
  };

  var getContestantByUserNameSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result;
      result = modelTransformer.transform(response.data, Contestant);
      messaging.publish(events.message._GET_CONTESTANT_BY_USERNAME_COMPLETE_, [result]);
    } else {
      getContestantByUserNameErrorHandler();
    }
  };

  var getContestantByUserNameErrorHandler = function () {
    messaging.publish(events.message._GET_CONTESTANT_BY_USERNAME_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get contestants from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_CONTESTANT_BY_USERNAME_, getContestantByUserName);

  var getContestantByEmail = function (email) {
    mongolab.query(constants.db.dbName, constants.db.contestantCollection, {q: {Email: email}})
      .then(getContestantByEmailSuccessHandler, getContestantByEmailErrorHandler);
  };

  var getContestantByEmailSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result;
      result = modelTransformer.transform(response.data, Contestant);
      messaging.publish(events.message._GET_CONTESTANT_BY_EMAIL_COMPLETE_, [result]);
    } else {
      getContestantByUserNameErrorHandler();
    }
  };

  var getContestantByEmailErrorHandler = function () {
    messaging.publish(events.message._GET_CONTESTANT_BY_EMAIL_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get contestants from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_CONTESTANT_BY_EMAIL_, getContestantByEmail);

  var getContestants = function () {
    return mongolab.query(constants.db.dbName, constants.db.contestantCollection, [])
      .then(getContestantSuccessHandler, getContestantErrorHandler);
  };

  var getContestantSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result;
      result = modelTransformer.transform(response.data, Contestant);
      messaging.publish(events.message._GET_CONTESTANTS_COMPLETE_, [result]);
    } else {
      getContestantErrorHandler();
    }
  };

  var getContestantErrorHandler = function () {
    messaging.publish(events.message._GET_CONTESTANTS_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get contestants from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_CONTESTANTS_, getContestants);

  var getContestantById = function (id) {
    return mongolab.queryById(constants.db.dbName, constants.db.contestantCollection, id, [])
      .then(getContestantByIdSuccessHandler, getContestantByIdErrorHandler);
  };

  var getContestantByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_CONTESTANT_BY_ID_COMPLETE_,
        modelTransformer.transform(response.data, Contestant));
    }
    else {
      getContestantByIdErrorHandler();
    }
  };

  var getContestantByIdErrorHandler = function () {
    messaging.publish(events.message._GET_CONTESTANT_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get contestant by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_CONTESTANT_BY_ID_, getContestantById);

  var createContestant = function (contestant) {
    return mongolab.create(constants.db.dbName, constants.db.contestantCollection, contestant)
      .then(createContestantSuccessHandler, createContestantErrorHandler);
  };

  var createContestantSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_CONTESTANT_COMPLETE_,
        modelTransformer.transform(response.data, Contestant));
    }
    else {
      createContestantErrorHandler();
    }
  };

  var createContestantErrorHandler = function () {
    messaging.publish(events.message._CREATE_CONTESTANT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to create contestant', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_CONTESTANT_, createContestant);

  var updateContestant = function (contestant) {
    return mongolab.update(constants.db.dbName, constants.db.contestantCollection, contestant)
      .then(updateContestantSuccessHandler, updateContestantErrorHandler);
  };

  var updateContestantSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_CONTESTANT_COMPLETE_,
        modelTransformer.transform(response.data, Contestant));
    }
    else {
      updateContestantErrorHandler();
    }
  };

  var updateContestantErrorHandler = function () {
    messaging.publish(events.message._UPDATE_CONTESTANT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to update contestant', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_CONTESTANT_, updateContestant);

  var deleteContestant = function (contestant) {
    return mongolab.delete(constants.db.dbName, constants.db.contestantCollection, contestant)
      .then(deleteContestantSuccessHandler, deleteContestantErrorHandler);
  };

  var deleteContestantSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_CONTESTANT_COMPLETE_);
    }
    else {
      deleteContestantErrorHandler();
    }
  };

  var deleteContestantErrorHandler = function () {
    messaging.publish(events.message._DELETE_CONTESTANT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to delete contestant', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_CONTESTANT_, deleteContestant);

  var init = function () {
    contestants = [];
  };

  var contestantDataService = {
    init: init,
    getContestants: getContestants,
    getContestantSuccessHandler: getContestantSuccessHandler,
    getContestantErrorHandler: getContestantErrorHandler,
    getContestantByUserName: getContestantByUserName,
    getContestantByUserNameSuccessHandler: getContestantByUserNameSuccessHandler,
    getContestantByUserNameErrorHandler: getContestantByUserNameErrorHandler,
    getContestantByEmail: getContestantByEmail,
    getContestantByEmailSuccessHandler: getContestantByEmailSuccessHandler,
    getContestantByEmailErrorHandler: getContestantByEmailErrorHandler,
    getContestantById: getContestantById,
    getContestantByIdSuccessHandler: getContestantByIdSuccessHandler,
    getContestantByIdErrorHandler: getContestantByIdErrorHandler,
    createContestant: createContestant,
    createContestantSuccessHandler: createContestantSuccessHandler,
    createContestantErrorHandler: createContestantErrorHandler,
    updateContestant: updateContestant,
    updateContestantSuccessHandler: updateContestantSuccessHandler,
    updateContestantErrorHandler: updateContestantErrorHandler,
    deleteContestant: deleteContestant,
    deleteContestantSuccessHandler: deleteContestantSuccessHandler,
    deleteContestantErrorHandler: deleteContestantErrorHandler
  };

  return contestantDataService;
});
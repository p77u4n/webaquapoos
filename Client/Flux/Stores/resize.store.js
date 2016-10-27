var ResizeDispatcher = require('../Dispatchers/resize.dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _windowSize = {height : 0, width : 0}; //collection of todo items

/**
 * Create a TODO item.
 * @param {string} text The content of the TODO
 */

function updateSize(newSize) {
    //Using the current timestamp in place of a real id.
    _windowSize.height = newSize.height;
    _windowSize.width = newSize.width;
}

/**
 * Delete a TODO item.
 * @param {string} id
 */


var ResizeStore = assign({}, EventEmitter.prototype, {
    getSize: function() {
        return _windowSize;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: IndexDispatcher.register(function(payload) {
        var newSize = payload.windowSize;

        IndexTodoStore.emitChange();
        updateSize(newSize);
        return true;
        })
});

module.exports = ResizeStore;
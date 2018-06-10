const idb = require('idb');

// // In the following line, you should include the prefixes of implementations you want to test.
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// // DON'T use "var indexedDB = ..." if you're not in a function.
// // Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
// }

const DB_NAME = 'mdn-indexeddb-epublications';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_ID_LOGIN = 'store_login_id';
// const DB_CHECK_STATUS = 'check_status';


var db;

// Used to keep track of which view is displayed to avoid uselessly reloading it
var current_view_pub_key;

exports.openDb = () => {
    console.log("openDb ...");
    var req = idb.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_ID_LOGIN, { keyPath: 'id', autoIncrement: true });

        store.createIndex('_id', '_id', { unique: true });


    };

    // req.onupgradeneeded = function (evt) {
    //     console.log("openDb.onupgradeneeded");

    //     var store = evt.currentTarget.result.createObjectStore(
    //         DB_CHECK_STATUS, { keyPath: 'id', autoIncrement: true });

    //     store.createIndex('_status', '_status', { unique: true });
    //     store.createIndex('id', 'id status', { unique: true });

    // };

}


exports.getObjectStoreIdLogin = (store_name_id_login, mode) => {
    var tx = db.transaction(store_name_id_login, mode);
    return tx.objectStore(store_name_id_login);
}

// exports.getObjectCheckStatus = (check_status, mode) => {
//     var tx = db.transaction(check_status, mode);
//     return tx.objectStore(check_status);
// }

// exports.updateCheckStatus = (_status) => {
//     var store = getObjectCheckStatus(DB_CHECK_STATUS, 'readwrite');
//     var id = "id status"
//     var checkOn = store.get(id);

//     checkOn.onsuccess = () => {
//         var data = checkOn.result;

//         data._status = _status;

//         var updateStatusRequest = store.put(data);

//         console.log("The transaction that originated this request is " + updateStatusRequest.transaction);

//         updateStatusRequest.onsuccess = () => {

//         }
//     }

// }

exports.clearObjectStore = (store_name_id_login) => {
    var store = getObjectStoreIdLogin(DB_STORE_ID_LOGIN, 'readwrite');
    var req = store.clear();
    req.onsuccess = function (evt) {
        // displayActionSuccess("Store cleared");
        // displayPubList(store);
    };
    req.onerror = function (evt) {
        console.error("clearObjectStore:", evt.target.errorCode);
        // displayActionFailure(this.error);
    };
}

exports.getBlob = (key, store, success_callback) => {
    var req = store.get(key);
    req.onsuccess = function (evt) {
        var value = evt.target.result;
        if (value)
            success_callback(value.blob);
    };
}

exports.addPublicationFromUrl = (_id, url) => {
    console.log("addPublicationFromUrl:", arguments);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // Setting the wanted responseType to "blob"
    // http://www.w3.org/TR/XMLHttpRequest2/#the-response-attribute
    xhr.responseType = 'blob';
    xhr.onload = function (evt) {
        if (xhr.status == 200) {
            console.log("Blob retrieved");
            var blob = xhr.response;
            console.log("Blob:", blob);
            addPublication(_id, blob);
        } else {
            console.error("addPublicationFromUrl error:",
                xhr.responseText, xhr.status);
        }
    };
    xhr.send();

    // We can't use jQuery here because as of jQuery 1.8.3 the new "blob"
    // responseType is not handled.
    // http://bugs.jquery.com/ticket/11461
    // http://bugs.jquery.com/ticket/7248
    // $.ajax({
    //   url: url,
    //   type: 'GET',
    //   xhrFields: { responseType: 'blob' },
    //   success: function(data, textStatus, jqXHR) {
    //     console.log("Blob retrieved");
    //     console.log("Blob:", data);
    //     // addPublication(_id, data);
    //   },
    //   error: function(jqXHR, textStatus, errorThrown) {
    //     console.error(errorThrown);
    //     displayActionFailure("Error during blob retrieval");
    //   }
    // });
}


exports.addPublication = (_id, blob) => {
    console.log("addPublication arguments:", arguments);
    var obj = { _id: _id };
    if (typeof blob != 'undefined')
        obj.blob = blob;

    var store = getObjectStoreIdLogin(DB_STORE_ID_LOGIN, 'readwrite');
    var req;
    try {
        req = store.add(obj);
    } catch (e) {
        if (e.name == 'DataCloneError')
            // displayActionFailure("This engine doesn't know how to clone a Blob, " +
            //     "use Firefox");
            throw e;
    }
    req.onsuccess = function (evt) {
        console.log("Insertion in DB successful");
        // displayActionSuccess();
        // displayPubList(store);
    };
    req.onerror = function () {
        console.error("addPublication error", this.error);
        // displayActionFailure(this.error);
    };
}


exports.deletePublicationFromBib = (_id) => {
    console.log("deletePublication:", arguments);
    var store = getObjectStoreIdLogin(DB_STORE_ID_LOGIN, 'readwrite');
    var req = store.index('_id');
    req.get(_id).onsuccess = function (evt) {
        if (typeof evt.target.result == 'undefined') {
            // displayActionFailure("No matching record found");
            return;
        }
        deletePublication(evt.target.result.id, store);
    };
    req.onerror = function (evt) {
        console.error("deletePublicationFromBib:", evt.target.errorCode);
    };
}

exports.deletePublication = (key, store) => {
    console.log("deletePublication:", arguments);

    if (typeof store == 'undefined')
        store = getObjectStoreIdLogin(DB_STORE_ID_LOGIN, 'readwrite');

    // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
    // the result of the Object Store Deletion Operation algorithm is
    // undefined, so it's not possible to know if some records were actually
    // deleted by looking at the request result.
    var req = store.get(key);
    req.onsuccess = function (evt) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record == 'undefined') {
            // displayActionFailure("No matching record found");
            return;
        }
        // Warning: The exact same key used for creation needs to be passed for
        // the deletion. If the key was a Number for creation, then it needs to
        // be a Number for deletion.
        req = store.delete(key);
        req.onsuccess = function (evt) {
            console.log("evt:", evt);
            console.log("evt.target:", evt.target);
            console.log("evt.target.result:", evt.target.result);
            console.log("delete successful");
            // displayActionSuccess("Deletion successful");
            // displayPubList(store);
        };
        req.onerror = function (evt) {
            console.error("deletePublication:", evt.target.errorCode);
        };
    };
    req.onerror = function (evt) {
        console.error("deletePublication:", evt.target.errorCode);
    };
}

// openDb()
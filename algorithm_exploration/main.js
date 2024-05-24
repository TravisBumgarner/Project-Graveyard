"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var exifr = require("exifr");
var brand = Symbol('brand');
/** Take in a filename and date and generate a unique hash identifying a photo.
 * Theoretically this should be sufficient information to identify a photo uniquely
 * */
var generateUniqueHash = function (filename, date) {
    var data = filename + date;
    var hashedData = crypto.createHash('sha256').update(data).digest('hex');
    return hashedData;
};
var walkDirectoryRecursivelyAndHash = function (dir, fileLookup) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            walkDirectoryRecursivelyAndHash(filePath, fileLookup); // Recurse into subdirectories
        }
        else {
            var data = exifr.parse(filePath);
            console.log('Data:', data);
            var hash = generateUniqueHash(file, stat.mtime.toISOString());
            fileLookup[hash] = filePath; // Add to lookup
        }
    });
};
var main = function (backupLibraryRoot, activeLibraryRoot) {
    var backupHashList = {};
    var activeHashList = {};
    walkDirectoryRecursivelyAndHash(backupLibraryRoot, backupHashList);
    walkDirectoryRecursivelyAndHash(activeLibraryRoot, activeHashList);
    var missingFiles = {};
    // Find missing files
    for (var _i = 0, _a = Object.entries(backupHashList); _i < _a.length; _i++) {
        var _b = _a[_i], hash = _b[0], filename = _b[1];
        if (!activeHashList[hash]) {
            missingFiles[hash] = filename;
        }
    }
    console.log('Missing Files:', missingFiles);
};
var backupLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_input';
var activeLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_output';
main(backupLibraryRoot, activeLibraryRoot);

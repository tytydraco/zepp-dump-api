let seen = []
function foreachAttribute(object, handleAttributeName, handleAttributeValue) {
    var attributeNames = [];
    function recursion(object) {
        if (seen.indexOf(object) > -1 || object == undefined) {
            return
        }
        seen.push(object)
        for (var attribute of Object.getOwnPropertyNames(object)) {
            if (typeof object[attribute] == 'object') {
                attributeNames.push(attribute);
                recursion(object[attribute]);
                attributeNames = attributeNames.slice(0, attributeNames.length - 1);
            }
            else {
                handleAttributeName(attributeNames.join(".") + "." + attribute);
                handleAttributeValue(object[attribute]);
            }
        }
    }
    recursion(object);
}
var apiSyms = [];

var attributeName = "";
var handleAttributeName = function (name) {
    attributeName = name;
};
var handleAttributeValue = function (value) {
    if (typeof value == 'function') {
        apiSyms.push(attributeName + "=function() {}");
    } else {
        apiSyms.push(attributeName + "=" + value);
    }

};
foreachAttribute(globalThis, handleAttributeName, handleAttributeValue);

let index = 0
var x = JSON.stringify(apiSyms, undefined, 1)
let array = x.split("\n")

Page({
    build() {
        let id = timer.createTimer(
            50,
            50,
            () => {
                if (index == 0) {
                    console.log("|---START---|");
                }

                console.log("|" + array[index] + "|");
                index++

                if (index == array.length) {
                    console.log("|---DONE---|");
                    timer.stopTimer(id)
                }
            },
            {},
        )
    }
});

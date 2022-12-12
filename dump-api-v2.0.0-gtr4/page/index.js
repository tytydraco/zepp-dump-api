import * as app from '@zos/app'
import * as device from '@zos/device'
import * as display from '@zos/display'
import * as fs from '@zos/fs'
import * as i18n from '@zos/i18n'
import * as interaction from '@zos/interaction'
import * as page from '@zos/page'
import * as router from '@zos/router'
import * as sensor from '@zos/sensor'
import * as settings from '@zos/settings'
import * as storage from '@zos/storage'
import * as user from '@zos/user'
import * as utils from '@zos/utils'
import * as ui from '@zos/ui'
import * as ble from '@zos/ble'

globalThis.app = app
globalThis.device = device
globalThis.display = display
globalThis.fs = fs
globalThis.i18n = i18n
globalThis.interaction = interaction
globalThis.page = page
globalThis.router = router
globalThis.sensor = sensor
globalThis.settings = settings
globalThis.storage = storage
globalThis.user = user
globalThis.utils = utils
globalThis.ui = ui
globalThis.ble = ble

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
// foreachAttribute(app, handleAttributeName, handleAttributeValue);
// foreachAttribute(device, handleAttributeName, handleAttributeValue);
// foreachAttribute(display, handleAttributeName, handleAttributeValue);
// foreachAttribute(i18n, handleAttributeName, handleAttributeValue);
// foreachAttribute(interaction, handleAttributeName, handleAttributeValue);
// foreachAttribute(page, handleAttributeName, handleAttributeValue);
// foreachAttribute(router, handleAttributeName, handleAttributeValue);
// foreachAttribute(sensor, handleAttributeName, handleAttributeValue);
// foreachAttribute(settings, handleAttributeName, handleAttributeValue);
// foreachAttribute(storage, handleAttributeName, handleAttributeValue);
// foreachAttribute(user, handleAttributeName, handleAttributeValue);
// foreachAttribute(utils, handleAttributeName, handleAttributeValue);
// foreachAttribute(ui, handleAttributeName, handleAttributeValue);
// foreachAttribute(ble, handleAttributeName, handleAttributeValue);

let index = 0
var x = JSON.stringify(apiSyms, undefined, 1)
let array = x.split("\n")

Page({
  build() {
    let id = setInterval(
      () => {
        if (index == 0) {
          console.log("|---START---|");
        }

        console.log("|" + array[index] + "|");
        index++

        if (index == array.length) {
          console.log("|---DONE---|");
          clearInterval(id)
        }
      },
      50,
    )
  }
});

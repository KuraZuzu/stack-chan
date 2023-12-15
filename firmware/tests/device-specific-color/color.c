/**
 * デバイス固有の色を返す関数
 * @see: https://github.com/meganetaaan/moddable-examples/blob/master/bongo_colorful/cryptdigest/mac-address.c
 */
#include "xsPlatform.h"
#include "xs.h"
#include "mc.xs.h"
#include "esp_err.h"
#include "esp_system.h"

void mod_get_mac_address(xsMachine* the) {
    uint8_t ret[6];

    int32_t err = esp_efuse_mac_get_default(ret);
    if (err) xsUnknownError("failed to get mac address");

    xsResult = xsArrayBuffer(ret, 6);
}

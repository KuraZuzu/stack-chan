import { UARTServer } from 'uartserver'
import Preference from 'preference'

const DOMAIN = 'robot'

export class PreferenceServer extends UARTServer {
  #tx_characteristic
  constructor(option) {
    super()
    if (option?.onPreferenceChanged != null) {
      this.onPreferenceChanged = option.onPreferenceChanged
    }
  }
  onPreferenceChanged(_key, _value) {
    /* noop */
  }
  onCharacteristicNotifyEnabled(characteristic) {
    if ('tx' === characteristic.name) {
      this.#tx_characteristic = characteristic
    }
  }
  onCharacteristicNotifyDisabled(characteristic) {
    if ('tx' === characteristic.name) {
      this.#tx_characteristic = null
    }
  }
  onCharacteristicWritten(characteristic, value) {
    if ('rx' === characteristic.name) this.onRX(value)
  }
  onRX(data) {
    const { _batch, key, value } = JSON.parse(String.fromArrayBuffer(data))
    if (_batch != null) {
      for (const [key, value] of Object.entries(_batch)) {
        this.receiveAndSetPreference(key, value)
      }
    } else if (key != null && value != null) {
      this.receiveAndSetPreference(key, value)
    } else {
      trace('key/value pair not found\n')
    }
  }

  receiveAndSetPreference(key, value) {
    const currentValue = Preference.get(DOMAIN, key)
    if (currentValue != value) {
      trace(`changing preference ... ${key}: ${value}\n`)
      Preference.set(DOMAIN, key, value)
      if (this.#tx_characteristic) {
        this.notifyValue(
          this.#tx_characteristic,
          ArrayBuffer.fromString(
            JSON.stringify({
              key,
              value,
            })
          )
        )
      }
      this.onPreferenceChanged(key, value)
    }
  }
}

import { getDeviceSpecificColor } from "device-specific-color"
import Poco from 'commodetto/Poco'

const poco = new Poco(globalThis.screen)

const [r, g, b] = getDeviceSpecificColor()
const color = poco.makeColor(r, g, b)
poco.begin(0, 0, poco.width, poco.height)
poco.fillRectangle(color, 0, 0, poco.width, poco.height)
poco.end()

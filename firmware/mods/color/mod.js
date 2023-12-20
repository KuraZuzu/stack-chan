import { getDeviceSpecificColor } from 'color'

export function onRobotCreated(robot) {
    /**
     * Change color
     */
    const [r, g, b] = getDeviceSpecificColor()
    let flag = false
    robot.button.c.onChanged = function () {
        if (this.read()) {
            robot.setColor('secondary', r, g, b)
            flag = !flag
        }
    }
}

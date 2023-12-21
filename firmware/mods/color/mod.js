import { getDeviceSpecificColor } from 'color'

export function onRobotCreated(robot) {
    /**
     * Change color
     */
    const [r, g, b] = getDeviceSpecificColor()
    robot.setColor('secondary', r, g, b)
}

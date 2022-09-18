export const external = ['vue']

export const input = '../delfin/index.js'

export const onwarn = (msg, warn) => !/Circular|preventAssignment/.test(msg) && warn(msg);

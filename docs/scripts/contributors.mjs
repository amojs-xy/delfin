#!/usr/bin/env zx

import 'zx/globals'

$.verbose = false

const { stdout: authors } = await $`git log | grep "^Author: " | awk '{print $2}' | sort | uniq -c | sort -k1,1nr`
const contributors = authors.split('\n').reduce((acc, cur) => {

  if (cur) {
    const author = cur.trim().split(' ')
    acc.push(author)
  }

  return acc
}, [])

console.log(contributors)

export const urlWrapper = url => url.startsWith('http')?url:`/oss/download?name=${url}`

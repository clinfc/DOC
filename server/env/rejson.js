
function data(data = '', code = 0, msg = '') {
  return { code, msg, data}
}

function success(msg = 'success', data = '', code = 0) {
  return { code, msg, data}
}

function error(msg = 'error', code = -1, data = '') {
  return { code, msg, data}
}

export default { data, success, error }

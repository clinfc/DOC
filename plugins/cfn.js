import cfn from './custom/cfn'

export default (ctx, inject) => {
  inject('cfn', cfn)
}

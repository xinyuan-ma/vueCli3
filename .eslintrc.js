// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  // 使用推荐设置
  // extends: 'lvmama',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    Vue: true,
    NativeUtil: true,
    lvHeader: true,
    Swiper: true,
    loginUtil: true,
    Swipe: true,
    axios: true,
    statisticsUtil: true
  }
}

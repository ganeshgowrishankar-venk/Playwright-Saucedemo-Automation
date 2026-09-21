const password = (environmentVariable) => process.env[environmentVariable] || 'secret_sauce';

module.exports = {
  standard: {
    username: 'standard_user',
    password: password('STANDARD_USER_PASSWORD'),
    expectedLogin: 'success'
  },
  lockedOut: {
    username: 'locked_out_user',
    password: password('LOCKED_OUT_USER_PASSWORD'),
    expectedLogin: 'locked'
  },
  problem: {
    username: 'problem_user',
    password: password('PROBLEM_USER_PASSWORD'),
    expectedLogin: 'success'
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: password('PERFORMANCE_GLITCH_USER_PASSWORD'),
    expectedLogin: 'success'
  },
  error: {
    username: 'error_user',
    password: password('ERROR_USER_PASSWORD'),
    expectedLogin: 'success'
  }
};

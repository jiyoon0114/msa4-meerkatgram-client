export const email =(val) => {
  const regexp = /^[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}@[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}\.[a-zA-Z]{2,3}$/;
  if(!val) {
    return '이메일은 필수입니다.';
  }

  if(!regexp.test(val)) {
      return '이메일 양식이 올바르지 않습니다.';
  }

  return '';
}

export const password =(val) => {
  const regexp = /^[0-9a-zA-Z!@#$%^&*()]{8,20}$/;
  if(!val) {
    return '비밀번호는 필수입니다.';
  }

  if(!regexp.test(val)) {
      return '비밀번호 양식이 올바르지 않습니다.';
  }

  return '';
}
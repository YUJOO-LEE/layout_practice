// 인수로 전달된 값을 type이 SET_MEMBERS 인 액션 객체에 담아 리턴

/*
action = {
  type: 'SET_MEMBERS',
  payload: 전달될 값
}
*/

export const setMembers = (member) => {
  return {
    type: 'SET_MEMBERS',
    payload: member
  }
}


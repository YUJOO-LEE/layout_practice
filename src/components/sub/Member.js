import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../common/Layout';

export default function Member() {

  const history = useRef(useHistory());
  /*
    useHistory : URL 주소를 변경할 때 사용하는 Hook
    - 리액트는 url변경 없이 컴포넌트만 변경시킬 수 있지만
    useHistory로 url 주소를 변경해서 사용자가 인식하도록 함
    - 사용자 친화적 페이지 구축

    - Router v5 : useHistory
    - Router v6 : useNavigate
  */

  const initVal = {
    userId: '',
    email: '',
    pwd1: '',
    pwd2: '',
    gender: null,
    interests: null,
    edu: '',
    comments: '',
  };

  const [ val, setVal ] = useState(initVal);
  const [ err, setErr ] = useState({});
  const [ submit, setSubmit ] = useState(false);

  const checkVal = (value) => {
    const errs = {};
    const reg = {
      '영문자': /[a-zA-z]/,
      '숫자': /[0-9]/,
      '특수문자': /[!@#$%^&*()_+]/,
    }

    if (value.userId.length < 5) {
      errs.userId = '아이디를 5글자 이상 입력하세요.';
    }

    if (value.email.length < 8 || !/@/.test(value.email)) {
      errs.email = '이메일 형식에 맞게 8글자 이상 입력하세요.';
    }

    const testPwd = (val) => {
      const errType = [];
      if (val.length < 8) errType.push('8글자 이상');
      for (const curKey of Object.keys(reg)) {
        if (!reg[curKey].test(val)) errType.push(curKey);
      }
      return errType.join(', ');
    }
    if (testPwd(value.pwd1)) {
      errs.pwd1 = '형식에 맞게 입력하세요. (' + testPwd(value.pwd1) + ')';
    }

    if (value.pwd2 < 3 || value.pwd1 !== value.pwd2) {
      errs.pwd2 = '비밀번호를 동일하게 입력하세요.';
    }

    if (!value.gender) {
      errs.gender = '성별을 선택하세요.';
    }

    if (!value.interests) {
      errs.interests = '관심사를 하나 이상 선택하세요.';
    }

    if (value.comments < 10) {
      errs.comments = '남기는 말을 10글자 이상 입력하세요.';
    }

    if (!value.edu) {
      errs.edu = '학력을 선택하세요.';
    }

    return errs;
  }

  const handleReset = () => {
    setVal(initVal);
    setErr({});
    setSubmit(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(checkVal(val));
    setSubmit(true);
  }

  // 함수가 호이스팅 되는 것을 방지하기 위해 변수를 먼저 선언하고 후할당한다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({...val, [name]: value});
    // key값을 변수로 지정할때 대괄호로 묶는다.
  }

  const handleRadio = (e) => {
    const { name } = e.target;
    const isChecked = e.target.checked;
    setVal({...val, [name]: isChecked});
  }

  const handleCheck = (e) => {
    const { name } = e.target;
    let isChecked = false;
    isChecked = e.target.checked ? true : false;
    setVal({...val, [name]: isChecked});
  }

  const handleSelect = (e) => {
    const { name } = e.target;
    const isSelected = e.target.value;
    setVal({...val, [name]: isSelected});
  }

  useEffect(() => {
    const len = Object.keys(err).length;
    if (!len && submit) {
      alert('회원 가입이 완료되었습니다. 메인 페이지로 이동합니다');
      history.push('/youtube');
    };
  }, [err, submit])
  

  return (
    <Layout name='member'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className='hidden'>회원 가입 폼 양식</legend>
          <table border={1}>
            <caption className='hidden'>회원 가입 정보 입력</caption>
            <tbody>
              <tr>
                <th scope='row'>
                  <label htmlFor="userId">USER ID</label>
                </th>
                <td>
                  <input type="text"
                    placeholder='아이디를 입력하세요'
                    name="userId" id="userId"
                    value={val.userId}
                    onChange={handleChange}
                  />
                  {err.userId && <span className='err'>{err.userId}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <label htmlFor="email">EMAIL</label>
                </th>
                <td>
                  <input type="text"
                    placeholder='이메일 주소를 입력하세요'
                    name="email" id="email"
                    value={val.email}
                    onChange={handleChange}
                  />
                  {err.email && <span className='err'>{err.email}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <label htmlFor="pwd1">PASSWORD</label>
                </th>
                <td>
                  <input type="password"
                    placeholder='비밀번호를 입력하세요'
                    name="pwd1" id="pwd1"
                    value={val.pwd1}
                    onChange={handleChange}
                  />
                  {err.pwd1 && <span className='err'>{err.pwd1}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <label htmlFor="pwd2">PASSWORD CHECK</label>
                </th>
                <td>
                  <input type="password"
                    placeholder='비밀번호를 재입력하세요'
                    name="pwd2" id="pwd2"
                    value={val.pwd2}
                    onChange={handleChange}
                  />
                  {err.pwd2 && <span className='err'>{err.pwd2}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>GENDER</th>
                <td>
                  <label htmlFor='male'>MALE</label>
                  <input type="radio"
                    name='gender' id='male'
                    onChange={handleRadio}
                  />
                  <label htmlFor='female'>FEMALE</label>
                  <input type="radio"
                    name='gender' id='female'
                    onChange={handleRadio}
                  />
                  {err.gender && <span className='err'>{err.gender}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>INTERESTS</th>
                <td>
                  <label htmlFor='sports'>SPORTS</label>
                  <input type="checkbox"
                    name='interests' id='sports'
                    onChange={handleCheck}
                  />

                  <label htmlFor='music'>MUSIC</label>
                  <input type="checkbox"
                    name='interests' id='music'
                    onChange={handleCheck}
                  />

                  <label htmlFor='game'>GAME</label>
                  <input type="checkbox"
                    name='interests' id='game'
                    onChange={handleCheck}
                  />
                  {err.interests && <span className='err'>{err.interests}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <label htmlFor="edu">EDUCATION</label>
                </th>
                <td>
                  <select name="edu" id="edu"
                    onChange={handleSelect}
                  >
                    <option value="">학력을 선택하세요</option>
                    <option value="elementary">초등학교 졸업</option>
                    <option value="middle">중학교 졸업</option>
                    <option value="high">고등학교 졸업</option>
                    <option value="college">대학교 졸업</option>
                  </select>
                  {err.edu && <span className='err'>{err.edu}</span>}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <label htmlFor="comments">COMMENT</label>
                </th>
                <td>
                  <textarea 
                    name="comments" id="comments" 
                    value={val.comments}
                    onChange={handleChange}
                    rows="5"
                    placeholder='남기실 말을 입력하세요'
                  ></textarea>
                  {err.comments && <span className='err'>{err.comments}</span>}
                </td>
              </tr>

              <tr>
                <th colSpan={2}>
                  <button type='reset' onClick={handleReset}>RESET</button>
                  <button type='submit'>SUBMIT</button>
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
}
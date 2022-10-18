import { useState } from 'react';
import Layout from '../common/Layout';

export default function Member() {

  const initVal = {
    userId : '',
  };

  const [ val, setVal ] = useState(initVal);
  const [ err, setErr ] = useState({});

  const checkVal = (value) => {
    const errs = {};

    if (value.userId.length < 5) {
      errs.userId = '아이디를 5글자 이상 입력하세요.';
    }

    return errs;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(checkVal(val));
  }

  // 함수가 호이스팅 되는 것을 방지하기 위해 변수를 먼저 선언하고 후할당한다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({...val, [name]: value});
    // key값을 변수로 지정할때 대괄호로 묶는다.
  }

  console.log(val);

  return (
    <Layout name='member'>
      <form action="">
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
                <th colSpan={2}>
                  <button type='reset'>RESET</button>
                  <button type='submit' onClick={handleSubmit}>SUBMIT</button>
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
}
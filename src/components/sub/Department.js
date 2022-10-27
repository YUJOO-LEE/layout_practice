import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';


export default function Department() {
  //const path = useRef(process.env.PUBLIC_URL);

  //useDispatch로부터 리듀서에 액션 객체 전달하는 함수 활성화
  const dispatch = useDispatch();
  const Members = useSelector((store)=> store.memberReducer.members);

  /*
  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/db/members.json`).then((json)=>{
      setMembers(json.data.members);
    })
  }, [])
  */

  return (
    <Layout name='department'>
    <button onClick={()=>{
      const newMembers = [...Members];
      newMembers[0].name = 'Emma';
      // 새로운 데이터를 액션 생성 함수로 넣어서
      // 생성한 객체를dispatch에 의해서 리듀서에 전달
      dispatch(setMembers(newMembers));
    }}>멤버 수정</button><br />
    
      {Members.map((data, index)=>{

        return (
        <article key={index}>
          <div className="inner">
            <div className="pic">
              <img src={`${process.env.PUBLIC_URL}/img/${data.pic}`} alt={data.name} />
            </div>
            <h3>{data.name}</h3>
            <p>{data.position}</p>
          </div>
        </article>
        );
      })}
    </Layout>
  );
}

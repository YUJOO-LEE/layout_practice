import Layout from '../common/Layout';
import { useSelector } from 'react-redux';


export default function Department() {
  //const path = useRef(process.env.PUBLIC_URL);

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

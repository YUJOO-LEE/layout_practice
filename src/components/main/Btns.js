export default function Btns(props) {
  return (
    <ul className="scrollNavi">
      <li className={props.curIndex === 0 ? 'on' : null}
        onClick={()=>props.setIndex(0)}
      ></li>
      <li className={props.curIndex === 1 ? 'on' : null}
        onClick={()=>props.setIndex(1)}
      ></li>
      <li className={props.curIndex === 2 ? 'on' : null}
        onClick={()=>props.setIndex(2)}
      ></li>
      <li className={props.curIndex === 3 ? 'on' : null}
        onClick={()=>props.setIndex(3)}
      ></li>
    </ul>
  );
}
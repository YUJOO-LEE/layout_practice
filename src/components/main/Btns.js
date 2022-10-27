export default function Btns(props) {
  return (
    <ul className="scrollNavi">
      <li
        onClick={()=>props.setIndex(0)}
      ></li>
      <li
        onClick={()=>props.setIndex(1)}
      ></li>
      <li
        onClick={()=>props.setIndex(2)}
      ></li>
      <li
        onClick={()=>props.setIndex(3)}
      ></li>
      <li
        onClick={()=>props.setIndex(4)}
      ></li>
    </ul>
  );
}
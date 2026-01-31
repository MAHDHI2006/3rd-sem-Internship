function Props(props) {
  return (
    <div>
      <h4>This is Props</h4>
      <ol>
        <li>Props:</li>
        <ul>
          <li>Welcome</li>
          <li>
            I completed my {props.grade} grade by the age of {props.age} years old
          </li>
          <li><img src={props.img}></img></li>
        </ul>
    
        <li>Football Players:</li>
        <ul>
          <li>Cristiano Ronaldo</li>
          <li>MO Salah</li>
          <li>Neymar Jr.</li>
          <li>Kylian Mbappe</li>
          <li>Kevin De Bruyne</li>
          <li>New Generation Best player is {props.player}</li>
        </ul>
      </ol>
    </div>
  );
}

export default Props;

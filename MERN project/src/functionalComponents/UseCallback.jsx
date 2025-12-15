const UseCallback = () => {
    const [Theme, ToggleTheme] = useState(false);
    const styling = {
        backgroundColor: Theme ? 'black' : 'white',
        color: Theme ? 'white' : 'black',
    };
  return ( 
  <div>
    <div style={styling}>
    <button onClick={() => ToggleTheme(!Theme)}>Toggle Theme</button>
    <h3>UseCallback Hook</h3>
    </div>
  </div>
  );
};   
export default UseCallback;
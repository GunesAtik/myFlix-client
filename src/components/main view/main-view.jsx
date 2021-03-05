class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor
    // so React can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {};
  }

  //This overrides the render() method of the superclass
  //No need to call super() though, as it does nothing my default
  render() {
    return (
      <div className="Main-view"></div>
    );
  }
}
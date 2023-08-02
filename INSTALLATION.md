# Installing into an app

In the consuming application's package.json file, include this project
as a dependency under the key value "conference-react":

```
"conference-react": "git@github.com:Teladoc/conference-react.git"
```

Then you'll want to run:

```
npm i
```

When thats all set, you should be ready to go to implement one of the
provided [components](#components):


```
import Conference from 'td-react-component';


class MyComponent extends Component {
  render() {
    let config = this.props;

    return (
      <div>
        <Conference config={config} />
      </div>
    );
  }
}
```


import React from 'react';
import Paper from 'material-ui/lib/paper';

const style = {
  height: 'auto',
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',

};

export default class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
         <Paper style={style} zDepth={3}>
           <div className="row">
             <h3 className="docTitle">Welcome to Andela</h3>
           </div>
           <div className="row">
             <p className="content">Welcome to Andela
               Nevertheless, it gained its audience quickly. Time has passed, and even those who used to be fans of skeuomorphism, became used to material design and, actually, found it quite fascinating. Like any true love, the qualities of the trend emerged later, and they finally realized how beautiful and easy-to-perceive this trend was.

Now that material design is no longer something new to us, we can see the key advantages of it. What does it do? It creates focus, it channels your attention. You don’t get side-tracked by superfluous design items and your eye sees the vital information, which is achieved by employing deliberately large-scale typography and bold colors.

Using a material design template, you may incorporate loud images, and not be afraid that your website design will appear overloaded.
             </p>
           </div>
         </Paper>
      </div>
    );
  }
}

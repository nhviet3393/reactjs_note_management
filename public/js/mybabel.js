/*function getMajor(marjor) {
    alert(major);
};

class VietNgo extends React.Component{
    getInfo(){
      alert(this.props.children);
    }

    render(){
        return(
            <div>
                <h1 className="bg-yellow">Viet Ngo</h1>
                <Major data="Web Developer" exp="4 year olds"> Now I am working for Engma Ltd
                </Major>
                <Major data="IT Support" exp="2 year olds" />
            </div>
        );
    }
};

class Major extends React.Component{
    render(){
        return(
            <div>
                <h3 className="bg-blue">{this.props.data} - {this.props.exp}</h3>
                <p>{this.props.children}</p>
                <button onClick={this.getInfo}>Get Info</button>
                <button onClick={() => {getMajor(this.props.data)}}>Get Major</button>
            </div>
        );
    };
};

ReactDOM.render(
    <VietNgo />,
    document.getElementById('root')
);*/


/*Note Management*/
var list;
function addDiv() {
    ReactDOM.render(
    <InputDiv/>,
        document.getElementById('div-add')
);
}

class Note extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            onEdit: false,
        };
    }

    delete(){
        $.post('/deleteNote', {note_id: this.props.id}, function (resp) {
            list.setState({mang: resp});
        });
    }

    getEdit(){
       this.setState({onEdit: true}); //get edit form
    }

    postEdit(){
        var that = this;
        $.post('/editNote', {note_id: this.props.id, value: this.refs.txt.value}, function (resp) {
            list.setState({mang: resp});
            that.setState({onEdit: false}); //cancel edit
        });
    }

    cancelEdit(){
        this.setState({onEdit: false}); //cancel edit
    }

    render(){
        if(this.state.onEdit){
            return(
                <div className="div-note">
                    <input defaultValue={this.props.children} ref="txt" />
                <button onClick={this.postEdit.bind(this)}>Save</button>
                <button onClick={this.cancelEdit.bind(this)}>Cancel</button>
                </div>
            )
        }
        else{
            return(
                <div className="div-note">
                    <p>{this.props.children}</p>
                <button onClick={this.delete.bind(this)}>Delete</button>
                <button onClick={this.getEdit.bind(this)}>Edit</button>
                </div>
            );
        }
    }
}

class List extends React.Component{
    constructor(props){
        super(props);
        list = this;
        this.state = {
            // mang: ["Hi", "Hello", "KhoaPham"],
            mang: [],
        };
    }

    //get datas of mang from url /getNotes
    componentDidMount(){
        var that = this;
        $.post("/getNotes", function (data) {
            that.setState({mang: data})
        });
    }

    render(){
        return(
            <div className="div-list">
                <div id="div-add"></div>
                <button onClick={addDiv}>Add</button>
                {
                    this.state.mang.map(function (note, index) {
                        return <Note key={index} id={index}>{note}</Note>
                    })
                }
            </div>
        );
    }
}

class InputDiv extends React.Component{
    send(){
        //add new value of input into mang
        // list.setState({mang: list.state.mang.concat(this.refs.txt.value)});
        $.post('/addNote', {note: this.refs.txt.value}, function(resp){
            list.setState({mang: resp});
        });
        //remove #div-add
        ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
    }

    render(){
        return(
            <div className="div-inputdiv">
            <input type="text" ref="txt" placeholder="Enter your note!" />
            <button onClick={() => this.send(this)}>Submit</button>
        </div>
    );
    }
}

ReactDOM.render(
    <div>
        <List/>
    </div>,
    document.getElementById('root')
);
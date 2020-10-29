import React from "react";
import "./Index.css";
import Send from "../../assets/send.svg";
import Img from "../../assets/Ellipse 2.png";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import socketIOClient from "socket.io-client";
import Chat from "./Chat";
import Users from "./Users";
import Api from "../config/Api";
const socket = socketIOClient(process.env.REACT_APP_API_URL);
export default class Home extends React.Component {
  state = {
    open: false,
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmpassword: "",
    msg: "",
    text: "",
    name_text: "",
    nick_text: "",
    data: [{}],
    online: [],
  };
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Logout = this.Logout.bind(this);
  }

  open() {
    var container = document.getElementsByClassName("container-main");
    if (container[0].className === "container-main") {
      container[0].className = "container-main animation";
      this.setState({ open: true });
    } else {
      container[0].className = "container-main";
      this.setState({ open: false });
    }
  }
  componentDidUpdate() {
    var mensagens = document.getElementsByClassName("mensagens");
    mensagens[0].scrollTop = mensagens[0].scrollHeight;
  
  }
   componentDidMount() {
  
    Api.post("/validate",JSON.parse(window.localStorage.getItem("logToken")))
      .then((res) => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          userId: res.data.userId,
          email: res.data.email,
        });
        socket.emit("join", res.data.name);
 
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
      })
      .catch((err) => {
        this.props.history.push("/");
        console.log(err);
      });

     
      socket.on("update", (data) => {
        var dados = Object.values(data);
        this.setState({ online: dados });
      });
  
      socket.on("chat", (data) => {
        this.setState({
          data: data,
        });
      });

    
    var root = document.getElementsByClassName("inputmsg");
    root[0].addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSubmit(e);
      }
    });  
  }
  
  Logout() {
    window.localStorage.removeItem("logToken");
    Api.defaults.headers.Authorization = `Bearer `;
    this.props.history.push("/");
  }

  handleChange(e) {
    this.setState({ msg: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.msg) {
      socket.emit("send", [
        this.state.msg,
        this.state.name,
        this.state.nickname,
      ]);
    }
    this.setState({ msg: "" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-main">
          <button className="open" onClick={this.open}>
            {this.state.open ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </button>
          <div className="img-name">
            <div className="img">
              <img src={Img} alt="img" />
            </div>
            <h4>{!this.state.open ? this.state.name : ""}</h4>
          </div>
          <div className="connection">
            <div>
              {this.state.open ? (
                <div className="options">
                  <input
                    placeholder="Nickname"
                    className="input"
                    value={this.state.nickname}
                  />

                  <input
                    placeholder="Email"
                    className="input"
                    value={this.state.email}
                  />

                  <input
                    placeholder="Password"
                    className="input"
                    value={this.state.password}
                  />

                  <input
                    placeholder="ConfirmPassword"
                    className="input"
                    value={this.state.confirmpassword}
                  />

                  <button className="btnmain">Send</button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="btn">
              <button className="logout" onClick={this.Logout}>
                Sair
              </button>
            </div>
          </div>
        </div>
        <div className="container-content">
          <div className="users-online">
            <Users data={this.state.online} />
          </div>

          <Chat data={this.state.data} name={this.state.name} />
        </div>
        <div className="container-footer">
          <input
            placeholder="Digite algo..."
            className="inputmsg"
            value={this.state.msg}
            onChange={this.handleChange}
          />
          <button className="send" onClick={this.handleSubmit}>
            <img src={Send} alt="send" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

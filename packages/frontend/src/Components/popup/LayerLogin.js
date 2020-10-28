import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { observer, inject } from "mobx-react";
import ShowHelperText from "../ShowHelperText";
import Validate from "../../utils/validate";

@inject("loginStore")
@observer
class LayerLogin extends Component {
    state = {
        email: {
            value: "",
            validate: false,
            getValidateText: () =>
                this.state.email.validate
                    ? "사용 가능한 이메일 주소입니다"
                    : "잘못된 이메일 형식 입니다",
            getError: () => {
                let error = false;

                if (this.state.email.value !== "") {
                    error = !this.state.email.validate;
                }

                return error;
            },
        },
        password: {
            value: "",
            validate: false,
            getValidateText: () =>
                this.state.password.validate
                    ? "사용 가능한 비밀번호입니다"
                    : "6자이상 15자 이하 입력해주세요",
            getError: () => {
                let error = false;

                if (this.state.password.value !== "") {
                    error = !this.state.password.validate;
                }

                return error;
            },
        },
    };

    userIdHandler = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            email: {
                ...prevState.email,
                value: value,
                validate: Validate.getEmalValidate(value),
            },
        }));
    };

    userPwHandler = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                value: value,
                validate: Validate.getPasswordValidate(value),
            },
        }));
    };

    sendUserInfo = () => {
        const onClose = this.props.onClose;
        const sendAccountInfo = JSON.stringify({
            userId: this.state.email.value,
            userPassword: this.state.password.value,
        });
        const { changeUserId, changeUserState } = this.props.loginStore;

        if (this.state.email.validate && this.state.password.validate) {
            fetch("/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: sendAccountInfo,
            })
                .then((res) => res.json())
                .then((json) => {
                    if (!json.sucess) {
                        console.log("로그인실패");
                    } else {
                        console.log("로그인성공");
                        console.log(json._userId);
                        changeUserState();
                        changeUserId(json._userId);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(json._userId)
                        );

                        onClose();
                    }
                });
        } else {
            alert("아이디와 패스워드를 알맞게 입력해주세요");
        }
    };

    findPasswordHandler = () => {
        this.props.openFindPassword();
    };

    btnJoinHandler = () => {
        this.props.openJoinLayer();
    };

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <div>
                    <TextField
                        id='userIdInput'
                        label='이메일주소'
                        placeholder='ex)nyangterest@email.com'
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        onChange={this.userIdHandler}
                        error={email.getError()}
                    />
                    {ShowHelperText(email)}
                </div>
                <div>
                    <TextField
                        id='userPasswordInput'
                        label='비밀번호'
                        placeholder='비밀번호를 입력해주세요'
                        margin='normal'
                        variant='outlined'
                        type='password'
                        fullWidth={true}
                        onChange={this.userPwHandler}
                        error={password.getError()}
                    />
                    {ShowHelperText(password)}
                </div>
                <div>
                    <button
                        type='button'
                        style={{
                            fontSize: "16px",
                            color: "#808080",
                            fontWeight: "bold",
                        }}
                        onClick={this.findPasswordHandler}
                    >
                        가입한 이메일 / 비밀번호 찾기
                    </button>
                </div>
                <div
                    style={{
                        marginTop: "30px",
                        paddingTop: "30px",
                        borderTop: "1px solid #eee",
                    }}
                >
                    <Button
                        fullWidth={true}
                        size='large'
                        variant='contained'
                        style={{ background: "#a1ceab", color: "#fff" }}
                        onClick={this.sendUserInfo}
                    >
                        로그인
                    </Button>
                    <Button
                        fullWidth={true}
                        size='large'
                        variant='contained'
                        style={{ marginTop: "15px" }}
                        onClick={this.btnJoinHandler}
                    >
                        회원가입
                    </Button>
                </div>
            </div>
        );
    }
}

export default LayerLogin;

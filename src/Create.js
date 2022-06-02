import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDictFB } from "./redux/modules/dict";

const Create = (props) => {
  const text = React.useRef(null);
  const mean = React.useRef(null);
  const example = React.useRef(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const addDictionary = () => {
    dispatch(
      createDictFB({
        text: text.current.value,
        mean: mean.current.value,
        example: example.current.value,
      })
    );
    text.current.value = "";
    mean.current.value = "";
    example.current.value = "";

    history.push("/");
  };

  return (
    <Input>
      <label>단어</label>
      <input type="text" ref={text} />
      <label>뜻</label>
      <input type="text" ref={mean} />
      <label>예문</label>
      <input type="text" ref={example} />
      <button onClick={addDictionary}>추가하기</button>
    </Input>
  );
};

const Input = styled.div`
  height: 40vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    border-radius: 5px;
    width: 300px;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  & input:focus {
    border: 1px solid #a673ff;
    outline: none;
  }
  & button {
    width: 300px;
    color: #fff;
    border: #a673ff;
    background: slateblue;
    margin: auto;
    padding: 10px 0;
    border-radius: 5px;
  }
`;

export default Create;
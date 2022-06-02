import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateDictFB, deleteDictFB } from "./redux/modules/dict";
import styled from "styled-components";

const Update = (props) => {
  const text = React.useRef(null);
  const mean = React.useRef(null);
  const example = React.useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const dict_index = params.index;

  const dict_list = useSelector((state) => state.dict.list);

  const updateDict = () => {
    dispatch(
      updateDictFB(dict_list[dict_index].id, {
        text: text.current.value,
        mean: mean.current.value,
        example: example.current.value,
      })
    );
    history.goBack();
  };
  return (
    <div className="update-word">
      <UpdateInput>
        <label>단어</label>
        <input
          ref={text}
          defaultValue={dict_list[dict_index] ? dict_list[dict_index].text : ""}
        />
        <label>뜻</label>
        <input
          ref={mean}
          defaultValue={dict_list[dict_index] ? dict_list[dict_index].mean : ""}
        />
        <label>예문</label>
        <input
          ref={example}
          defaultValue={
            dict_list[dict_index] ? dict_list[dict_index].example : ""
          }
        />
        <div className="update-btn">
          <button onClick={updateDict}>수정하기</button>
          <button
            onClick={() => {
              dispatch(deleteDictFB(dict_list[dict_index].id));
              history.goBack();
            }}
          >
            삭제하기
          </button>
        </div>
      </UpdateInput>
    </div>
  );
};

const UpdateInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    width: 300px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
  }
  & input:focus {
    border: 1px solid #a673ff;
    outline: none;
  }
  & button {
    width: 300px;
    color: #fff;
    border: #a673ff;
    border-radius: 5px;
    background: slateblue;
    padding: 10px 0;
    margin: 20px 0 0 25px;
  }
`;

export default Update;
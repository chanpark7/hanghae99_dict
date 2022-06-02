import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Dictionary = (props) => {
  let history = useHistory();

  const dict_list = useSelector((state) => state.dict.list);

  return (
    <ListStyle>
      {dict_list.map((list, index) => {
        return (
          <ItemStyle
            className="list_item"
            key={index}
            onClick={() => {
              history.push("/update/" + index);
            }}
          >
            <div className="word-item">
              <label>[단어]</label>
              <p>{list.text}</p>

              <label>[뜻]</label>
              <p>{list.mean}</p>

              <label>[예문]</label>
              <p style={{ color: "blue" }}>{list.example}</p>
            </div>
          </ItemStyle>
        );
      })}
      <Createbutton
        onClick={() => {
          history.push("/create");
        }}
      >
        +
      </Createbutton>
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
  border-radius: 10px;
`;

const ButtonAnimation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Createbutton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  color: white;
  border: #a673ff;
  background: slateblue;
  font-weight: bold;
  font-size: 70px;
  border-radius: 50px;
  &:hover {
    animation: ${ButtonAnimation} 2s linear infinite;
  }
`;

export default Dictionary;
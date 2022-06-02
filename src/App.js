import React from "react";
import Dictionary from "./Dictionary";
import Create from "./Create";
import Update from "./Update";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDictFB } from "./redux/modules/dict";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

function App() {
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.dict.is_loaded);
  const history = useHistory();

  React.useEffect(async () => {
    dispatch(loadDictFB());
  }, []);

  return (
    <div className="App">
      <Container>
        <Title
          onClick={() => {
            history.push("/");
          }}
        >
         나만의 단어장
        </Title>
        <Line />
        <Route path="/" exact component={Dictionary} />
        <Route path="/create" component={Create} />
        <Route path="/update/:index" component={Update} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 400px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;
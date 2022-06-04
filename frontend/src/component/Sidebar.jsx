import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function Sidebar(props) {
  return (
    <ListGroup
      className={`${props.className} sidebar d-none d-lg-block`} style={{width: '240px'}}
    >
      <ListGroup.Item>전체 게시글</ListGroup.Item>
      <ListGroup.Item>TEST 1</ListGroup.Item>
      <ListGroup.Item>TEST 2</ListGroup.Item>
      <ListGroup.Item>TEST 3</ListGroup.Item>
      <ListGroup.Item>TEST 4</ListGroup.Item>
    </ListGroup>
  );
}

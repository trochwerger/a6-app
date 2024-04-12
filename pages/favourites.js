import React from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Container>
      <Row>
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col key={objectID} xs={12} sm={6} md={4} lg={3} xl={2}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <p>Nothing Here. Try adding some new artwork to the list.</p>
        )}
      </Row>
    </Container>
  );
}

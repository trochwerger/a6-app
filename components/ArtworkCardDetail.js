import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Card, Button, Container } from "react-bootstrap";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Container className="artwork-card-detail">
      <Card className="">
        {data.primaryImage && (
          <Card.Img
            variant="top"
            src={data.primaryImage}
            className="artwork-card-detail-img"
          />
        )}
        <Card.Body>
          <br />
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text className="artwork-card-detail-info">
            <strong>Date: </strong> {data.objectDate || "N/A"}
            <br />
            <strong>Classification: </strong>
            {data.classification || "N/A"}
            <br />
            <strong>Medium: </strong>
            {data.medium || "N/A"}
            <br />
            <br />
            <strong>Artist: </strong>
            {data.artistDisplayName || "N/A"}{" "}
            {data.artistWikidata_URL && (
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
            )}
            <br />
            <strong>Credit Line: </strong>
            {data.creditLine || "N/A"}
            <br />
            <strong>Dimensions: </strong>
            {data.dimensions || "N/A"}
          </Card.Text>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

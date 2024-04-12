/*********************************************************************************
 *  WEB422 – Assignment 6
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Tomas Rochwerger Student ID: 159432210 Date: 04/12/2024
 *
 ********************************************************************************/

import { Image, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="MET New York"
      />
      <Row>
        <Col md={6}>
          <br />
          <p>
            The Metropolitan Museum of Art, colloquially referred to as the Met,
            is an art museum in New York City. It is the largest art museum in
            the Americas and fourth-largest in the world. The collection is
            divided into 17 curatorial departments. The main building at 1000
            Fifth Avenue, along the Museum Mile on the eastern edge of Central
            Park on Manhattan&apos;s Upper East Side, is by area one of the
            world&apos;s largest art museums.
          </p>
          <br />
          <p>
            The Metropolitan Museum of Art was founded in 1870 with its mission
            to bring art and art education to the American people. The
            museum&apos;s permanent collection consists of works of art ranging
            from the ancient Near East and ancient Egypt, through classical
            antiquity to the contemporary world. It includes paintings,
            sculptures, and graphic works from many European Old Masters, as
            well as an extensive collection of American, modern, and
            contemporary art. The Met also maintains extensive holdings of
            African, Asian, Oceanian, Byzantine, and Islamic art. The museum is
            home to encyclopedic collections of musical instruments, costumes,
            and decorative arts and textiles, as well as antique weapons and
            armor from around the world. Several notable interiors, ranging from
            1st-century Rome through modern American design, are installed in
            its galleries.
          </p>
        </Col>
        <Col md={6}>
          <br />
          <p>
            The Met&apos;s permanent collection is curated by seventeen separate
            departments, each with a specialized staff of curators and scholars,
            as well as six dedicated conservation departments and a Department
            of Scientific Research. The permanent collection includes works of
            art from classical antiquity and ancient Egypt; paintings and
            sculptures from nearly all the European masters; and an extensive
            collection of American and modern art.
          </p>
          <p>
            The Met maintains extensive holdings of African, Asian, Oceanian,
            Byzantine, and Islamic art. The museum is also home to encyclopedic
            collections of musical instruments, costumes and accessories, and
            antique weapons and armor from around the world. A great number of
            period rooms, ranging from first-century Rome through modern
            American design, are permanently installed in the Met&apos;s
            galleries. Since the late 1800s, the Museum has been collecting
            diverse materials from all over the world. It reaches out to
            &quot;exhibition designers, architects, graphic designers, lighting
            designers, and production designers&quot; that enables the museum to
            maintain its collection in good conditions.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
          </a>
        </Col>
      </Row>
    </>
  );
}

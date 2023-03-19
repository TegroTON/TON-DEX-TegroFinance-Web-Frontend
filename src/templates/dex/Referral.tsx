import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  Dropdown,
  Nav,
  Stack,
  Accordion,
} from "react-bootstrap";
import { useState, useContext } from "react";
import { DexContext, DexContextType } from "../../context";
import { bytesToHex } from "ton3-core/dist/utils/helpers";
// @ts-ignore
import * as encoder from "int-encoder";
import { Address, Coins } from "ton3-core";
import FagItems from "./components/FaqItem";
import { Notify } from "./components/Notify";
import Hints from "./components/Hints";

// const kr = [...Array(0x11FF + 1).keys()].slice(0x1100).map(x => String.fromCharCode(x));

encoder.alphabet(
  "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЮЭЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"
);
// дARХKXhGKНгUБв0ВguЛGаQтЫУеЭэШnQDИШгъF
// ipnROvNU39wb0HVNr3riz56OxMRWH36WuYVA7WhooJZ
// 83cdae8567bb7f5607486f9d1dd1219e7aa179abc21dfac14caf6bbc0738e8f3
// g82uhWe7f1YHSG+dHdEhnnqheavCHfrBTK9rvAc46PM=

const compressAddr = (addr: Address | null): string => {
  if (!addr) return "";

  // return encoder.encode(`0x${bytesToHex(addr.hash)}`, 16);
  return addr.toString("base64", { bounceable: false, testOnly: true });
};

export const decompressAddr = (input: string): Address | null => {
  if (!input) return null;
  try {
    // return new Address(`0:${encoder.decode(input, 16)}`);
    return new Address(input);
  } catch {
    return null;
  }
};

export function ReferralPage() {
  const { walletInfo, referrals } = useContext(DexContext) as DexContextType;
  // console.log("raw", bytesToHex(walletInfo && walletInfo.address ? walletInfo.address.hash : new Uint8Array(0)))
  const compressed = compressAddr(walletInfo?.address || null);
  // console.log("compressed", compressed)
  // console.log("decompressed", decompressAddr(compressed)?.toString("base64", {bounceable: true}))
  const refUrl = `https://tegro.fi/?ref=${compressed}`;
  // const referrals = [{address: new Address("EQCDza6FZ7t_VgdIb50d0SGeeqF5q8Id-sFMr2u8Bzjo8_mZ"),volume_tgr: new Coins("164.137052029"),invited:1673975745},
  //                    {address: new Address("EQCDza6FZ7t_VgdIb50d0SGeeqF5q8Id-sFMr2u8Bzjo8_mZ"),volume_tgr: new Coins("164.137052029"),invited:1673975745},
  //                    {address: new Address("EQCDza6FZ7t_VgdIb50d0SGeeqF5q8Id-sFMr2u8Bzjo8_mZ"),volume_tgr: new Coins("164.137052029"),invited:1673975745}]

  const friends = referrals.length;
  const swapVolume = referrals.reduce(
    (acc, item) => acc + Number(item.volumeTGR.toString()),
    0
  );
  const swapEarn = swapVolume * 0.0005;
  // console.log(referrals)
  const [showAlertReferral, setShowAlertReferral] = useState(false);

  return (
    <>
      {showAlertReferral && (
        <Notify
          position="top-center"
          onClose={() => setShowAlertReferral(false)}
          text="Referral link copied! 😊"
        />
      )}
      <section className="section hero py-4 py-md-5 border-bottom">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="fw-900 fs-40 mb-3">
                Invite your friends.
                <span className="d-block">Earn cryptocurrency together</span>
              </h1>
              <p className="fs-18 mb-4">
                Earn <span className="fw-500 color-grey">12.5%</span> from
                friends swap commission on Tegro.Finance
              </p>
              <a
                href="https://tegro.gitbook.io/en/dex/referral-program"
                className="btn btn-sm btn-outline-primary"
                target="__blank"
              >
                Read More <i className="fa-solid fa-angle-right ms-2" />
              </a>
            </Col>
            <Col lg={5} className="ms-auto">
              <Card className="card box-blur overflow-visible">
                <Card.Title className="card-title fs-20 mb-4">
                  My Referral Link
                </Card.Title>
                <Form.Group className="d-flex align-items-center mb-3">
                  <InputGroup>
                    {walletInfo?.isConnected ? (
                      <>
                        <Form.Control className="fs-14" value={refUrl} />
                        <InputGroup.Text className="px-2">
                          <Hints 
                          show="top"
                          text="Copy"
                          content={
                            <>
                            <Button
                            variant="icon rounded border-0 fs-14"
                            onClick={() => {
                              navigator.clipboard.writeText(refUrl);
                              setShowAlertReferral(true);
                            }}
                          >
                            <i className="fa-regular fa-copy fa-lg" />
                          </Button>
                            </>
                          }
                          />
                          
                        </InputGroup.Text>
                      </>
                    ) : (
                      <>
                        <Form.Control
                          className="fs-14 opacity-50 color-grey"
                          value="Connect your wallet to get a link"
                          disabled
                        />
                      </>
                    )}
                  </InputGroup>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light ms-2 px-3"
                      id="dropdown-basic"
                    >
                      <i className="fa-regular fa-share-nodes fa-lg" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">
                        <i className="fa-brands fa-telegram"></i>
                        <span className="ms-3">Telegram</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <i className="fa-brands fa-facebook"></i>
                        <span className="ms-3">Facebook</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <i className="fa-brands fa-twitter"></i>
                        <span className="ms-3">Twitter</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Row>
                  <Col sm={8} className="mb-2 mb-sm-0">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="border rounded-8 py-2 py-sm-3"
                    >
                      <div className="px-2 px-sm-3 border-end">
                        <div className="fs-12 fw-500 mb-2 text-nowrap">
                          You will get
                        </div>
                        <div className="fs-24 fw-700 color-blue">100%</div>
                      </div>
                      <ul className="list-unstyled small fw-500 m-0 px-2 px-sm-3 w-100">
                        <li className="d-flex mb-1">
                          Swaps{" "}
                          <span className="text-muted ms-auto">12.5%</span>
                        </li>
                        {/*
                                                <li className="d-flex mb-1">Farms <span className="text-muted ms-auto">5%</span></li>
                                                <li className="d-flex">Launchpools <span className="text-muted ms-auto">5%</span></li>
                                                */}
                      </ul>
                    </Stack>
                  </Col>
                  <Col sm={4}>
                    <div className="border rounded-8 p-2 p-sm-3">
                      <div className="fs-12 fw-500 mb-2">Friends will get</div>
                      <div className="fs-24 fw-700 color-blue">0%</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="section__blur">
          <div className="blur__circle-1" />
          <div className="blur__circle-2" />
        </div>
      </section>
      <section className="section hero">
        <Container>
          {/*
                   <Row className="mb-5">
                        <Col md={6} lg={4} className="mb-3 mb-lg-0">
                            <Card className="p-4">
                                <Stack direction="horizontal" gap={2} className="mb-4">
                                    <div className="me-auto">
                                        <h4 className="fs-16 fw-500 text-muted mb-3">Farms Referral</h4>
                                        <p className="fs-24 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                    <i className="fa-duotone fa-money-bill-wheat card-item-icon bg-soft-red" />
                                </Stack>
                                <ButtonGroup>
                                    <Button variant="red btn-sm w-50 me-1">Withdraw</Button>
                                    <Button variant="outline-red btn-sm w-50 ms-1">History</Button>
                                </ButtonGroup>
                            </Card>
                        </Col>
                        <Col md={6} lg={4} className="mb-3 mb-lg-0">
                            <Card className="p-4">
                                <Stack direction="horizontal" gap={2} className="mb-4">
                                    <div className="me-auto">
                                        <h4 className="fs-16 fw-500 text-muted mb-3">Launchpools Referral</h4>
                                        <p className="fs-24 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                    <i className="fa-duotone fa-square-poll-horizontal card-item-icon bg-soft-purple" />
                                </Stack>
                                <ButtonGroup>
                                    <Button variant="purple btn-sm w-50 me-1">Withdraw</Button>
                                    <Button variant="outline-purple btn-sm w-50 ms-1">History</Button>
                                </ButtonGroup>
                            </Card>
                        </Col>
                        <Col md={12} lg={4} className="mb-3 mb-lg-0">
                            <Card className="p-4">
                                <Stack direction="horizontal" gap={2} className="mb-4">
                                    <div className="me-auto">
                                        <h4 className="fs-16 fw-500 text-muted mb-3">Swaps Referral</h4>
                                        <p className="fs-24 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                    <i className="fa-duotone fa-arrow-up-arrow-down card-item-icon bg-soft-green" />
                                </Stack>
                                <ButtonGroup>
                                    <Button variant="green btn-sm w-50 me-1">Withdraw</Button>
                                    <Button variant="outline-green btn-sm w-50 ms-1">History</Button>
                                </ButtonGroup>
                            </Card>
                        </Col>
                                            </Row>
                                            */}
          {/*<Nav variant="pills" className="box-blur border w-100 mb-4" defaultActiveKey="/referral">*/}
          {/*    <Nav.Item>*/}
          {/*        <Nav.Link href="/referral">Referral List</Nav.Link>*/}
          {/*    </Nav.Item>*/}
          {/*    <Nav.Item>*/}
          {/*        <Nav.Link href="#!">Swaps</Nav.Link>*/}
          {/*    </Nav.Item>*/}

          {/*</Nav>*/}
          <Card className="p-4 mb-4">
            <Card.Title className="card-title fs-20 fw-700 mb-4">
              Dashboard
            </Card.Title>
            <Row>
              <Col md={6} xl className="mb-4 mb-xl-0">
                <Card.Body className="bg-light border rounded-8 p-4">
                  <Stack direction="horizontal" gap={2} className="mb-4">
                    <i
                      className="fa-duotone fa-users dropdown-item-icon rounded-circle fs-20"
                      style={{
                        width: "48px",
                        height: "48px",
                        lineHeight: "48px",
                      }}
                    />
                    <div className="ms-3">
                      <h4 className="fs-12 fw-500 text-muted mb-1">
                        Total Friends
                      </h4>
                      <p className="fs-20 fw-700 mb-0">{friends}</p>
                    </div>
                  </Stack>
                  <div className="d-flex align-items-center">
                    <img
                      src="/assets/images/token/tgr.png"
                      alt=""
                      width={48}
                      height={48}
                    />
                    <div className="ms-3">
                      <h4 className="fs-12 fw-500 text-muted mb-1">
                        Total earn
                      </h4>
                      <p className="fs-20 fw-700 mb-0">{`${swapEarn.toFixed(
                        9
                      )} TGR`}</p>
                    </div>
                  </div>
                </Card.Body>
              </Col>
              <Col md={6} xl className="mb-4 mb-xl-0">
                <Card.Body className="border rounded-8 p-4">
                  <div className="mb-4">
                    <h4 className="fs-12 fw-500 text-muted mb-1">
                      Friends swap volume
                    </h4>
                    <p className="fs-20 fw-700 mb-0">{`${swapVolume} TGR`}</p>
                  </div>
                  <div className="mb-0">
                    <h4 className="fs-12 fw-500 text-muted mb-1">
                      Total Swap earn
                    </h4>
                    <p className="fs-20 fw-700 mb-0">{`${swapEarn.toFixed(
                      9
                    )} TGR`}</p>
                  </div>
                </Card.Body>
              </Col>
              <Col md={12} xl className="mb-4 mb-xl-0">
                <Card.Body className="border rounded-8 p-4">
                  <Stack direction="horizontal" gap={2} className="mb-2">
                    <div className="me-auto">
                      <h4 className="fs-16 fw-500 text-muted mb-2">
                        Unpaid Referral Earn
                      </h4>
                      <p className="fs-24 fw-700 mb-0">{`${swapEarn.toFixed(
                        9
                      )} TGR`}</p>
                    </div>
                    <i className="fa-duotone fa-arrow-up-arrow-down card-item-icon bg-soft-green" />
                  </Stack>
                  <ButtonGroup className="w-100">
                    <Button variant="green btn-sm w-50 me-1" disabled>
                      Min withdraw 100 TGR
                    </Button>
                    {/*<Button variant="outline-green btn-sm w-50 ms-1">History</Button>*/}
                  </ButtonGroup>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="p-0" style={{ contain: "paint" }}>
            <div className="d-block d-md-flex align-items-center box-blur px-4 py-3 border-bottom">
              <h1 className="fs-20 me-auto m-0">Referral List</h1>
              {/*<Form className="ms-auto mt-3 mt-md-0">*/}
              {/*    <InputGroup>*/}
              {/*        <Form.Control*/}
              {/*            placeholder="Search wallet / ref.link..."*/}
              {/*            aria-label="Search wallet / ref.link..."*/}
              {/*            style={{ minHeight: '46px' }}*/}
              {/*        />*/}
              {/*        <InputGroup.Text id="basic-addon1">*/}
              {/*            <i className="fa-regular fa-magnifying-glass" />*/}
              {/*        </InputGroup.Text>*/}
              {/*    </InputGroup>*/}
              {/*</Form>*/}
            </div>
            <table className="table table-tokens">
              <thead className="sticky-top" style={{ top: "79px" }}>
                <tr className="text-end">
                  {referrals.length ? (
                    <>
                      <th scope="col" className="text-start">
                        Wallet Address
                      </th>
                      <th scope="col">Swap Volume</th>
                      <th scope="col">Total Earn</th>
                    </>
                  ) : (
                    <th scope="col" className="text-center">
                      <div className="bg-light fs-14 fw-500 p-3 rounded-8 d-inline">
                        You don't have any referrals yet 😕
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr className="text-end">
                    <th scope="row" className="text-start">
                      <div className="d-flex align-items-center">
                        <i className="fa-regular fa-wallet dropdown-item-icon" />
                        <div className="ms-3">
                          <div
                            className="fw-500 text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            {r.address.toString("base64", { bounceable: true })}
                          </div>
                          <div className="small text-muted fw-500 mt-1">
                            {new Date(r.invited * 1000).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="fw-500">
                        {`${r.volumeTGR.toString()} TGR`}
                      </div>
                    </td>
                    <td>
                      <div className="fw-500">
                        {`${new Coins(r.volumeTGR).mul(0.0005).toString()} TGR`}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*<div className="text-center p-5">*/}
            {/*    <div className="d-inline bg-light px-4 py-3 rounded-8">*/}
            {/*        <i className="fa-solid fa-circle-notch fa-spin me-2" /> Loading*/}
            {/*    </div>*/}
            {/*</div>*/}
          </Card>
        </Container>
      </section>
      <section className="section py-5">
        <Container>
          <h2 className="fs-24 fw-700 mb-5" id="FAQ">
            FAQ
          </h2>
          <Accordion className="row">
            <Col lg={6}>
              {/* item */}
              <FagItems
                eventKey="1"
                title="Where do I get my referral link?"
                text="Connect a wallet and find your referral link in the Referral section."
              />
              {/* item */}
              <FagItems
                eventKey="2"
                title="How do I invite a referral friend?"
                text="Invite your friends to register via your referral link."
              />
              {/* item */}
              <FagItems
                eventKey="3"
                title="Where are all my generated referral links?"
                text="View all of your generated links on the 'Referral Links' section of the Referral page."
              />
            </Col>
            <Col lg={6}>
              {/* item */}
              <FagItems
                eventKey="4"
                title="In what crypto currency the referral commission is accounted to my referral balance?"
                text="The referral rewards are accounted in TGR tokens only."
              />
              {/* item */}
              <FagItems
                eventKey="5"
                title="How much crypto can I earn via the Swap Referral Program?"
                text="You can earn from 12.5% in TGR right after your friends have made a swap."
              />
              {/* item */}
              <FagItems
                eventKey="6"
                title="Is the Swap referral program active for all swap pairs?"
                text="Yes."
              />
            </Col>
          </Accordion>
        </Container>
      </section>
    </>
  );
}

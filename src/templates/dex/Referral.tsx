import { Container, Row, Col, Card, Button, ButtonGroup, Form, InputGroup, Dropdown, Nav, Stack, Accordion } from 'react-bootstrap';

export function ReferralPage() {
    return (
        <>
            <section className="section hero py-4 py-md-5 border-bottom">
                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h1 className="fw-900 fs-40 mb-3">
                                Invite your friends.
                                <span className="d-block">Earn cryptocurrency together</span>
                            </h1>
                            <p className="fs-18 mb-4">
                                Earn up to <span className="fw-500 color-grey">20%</span> from friends swap commission on Biswap
                                <br /> and <span className="fw-500 color-grey">5%</span> from their earnings on Farms &amp; Launchpools
                            </p>
                            <a href="#!" className="btn btn-sm btn-outline-primary" target="__blank">
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
                                        <Form.Control className="fs-14" defaultValue="https://tegro.finance/?ref=6e02054c95b51f663878" />
                                        <InputGroup.Text className="p-1">
                                            <Button variant="outline-light btn-sm border-0 fs-14">
                                                <i className="fa-regular fa-copy fa-lg" />
                                            </Button>
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light ms-2 px-3" id="dropdown-basic">
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
                                        <Stack direction="horizontal" gap={2} className="border rounded-8 py-2 py-sm-3">
                                            <div className="px-2 px-sm-3 border-end">
                                                <div className="fs-12 fw-500 mb-2 text-nowrap">You will get</div>
                                                <div className="fs-24 fw-700 color-blue">100%</div>
                                            </div>
                                            <ul className="list-unstyled small fw-500 m-0 px-2 px-sm-3 w-100">
                                                <li className="d-flex mb-1">Swaps <span className="text-muted ms-auto">10%</span></li>
                                                <li className="d-flex mb-1">Farms <span className="text-muted ms-auto">5%</span></li>
                                                <li className="d-flex">Launchpools <span className="text-muted ms-auto">5%</span></li>
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
                    <Nav variant="pills" className="box-blur border w-100 mb-4" defaultActiveKey="/referral">
                        <Nav.Item>
                            <Nav.Link href="/referral">Swaps</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Farms</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Launchpools</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Card className="p-4 mb-4">
                        <Card.Title className="card-title fs-20 fw-700 mb-4">Dashboard</Card.Title>
                        <Row>
                            <Col md={6} xl className="mb-4 mb-xl-0">
                                <Card.Body className="bg-light border rounded-8 p-4">
                                    <Stack direction="horizontal" gap={2} className="mb-4">
                                        <i className="fa-duotone fa-users dropdown-item-icon rounded-circle fs-20" style={{ width: '48px', height: '48px', lineHeight: '48px' }} />
                                        <div className="ms-3">
                                            <h4 className="fs-12 fw-500 text-muted mb-1">Active Friends / Total Friends</h4>
                                            <p className="fs-20 fw-700 mb-0">0 / 0</p>
                                        </div>
                                    </Stack>
                                    <div className="d-flex align-items-center">
                                        <img src="/assets/images/favicon.svg" alt="" width={48} height={48} />
                                        <div className="ms-3">
                                            <h4 className="fs-12 fw-500 text-muted mb-1">Total earned</h4>
                                            <p className="fs-20 fw-700 mb-0">0.0000 TGR</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col md={6} xl className="mb-4 mb-xl-0">
                                <Card.Body className="border rounded-8 p-4">
                                    <div className="mb-4">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Swap friends</h4>
                                        <p className="fs-20 fw-700 mb-0">0</p>
                                    </div>
                                    <div className="mb-0">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Swap earned</h4>
                                        <p className="fs-20 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col md={6} xl className="mb-4 mb-xl-0">
                                <Card.Body className="border rounded-8 p-4">
                                    <div className="mb-4">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Farms friends</h4>
                                        <p className="fs-20 fw-700 mb-0">0</p>
                                    </div>
                                    <div className="mb-0">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Farms earned</h4>
                                        <p className="fs-20 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col md={6} xl className="mb-4 mb-xl-0">
                                <Card.Body className="border rounded-8 p-4">
                                    <div className="mb-4">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Launchpool friends</h4>
                                        <p className="fs-20 fw-700 mb-0">0</p>
                                    </div>
                                    <div className="mb-0">
                                        <h4 className="fs-12 fw-500 text-muted mb-1">Total Launchpool earned</h4>
                                        <p className="fs-20 fw-700 mb-0">0.0000 TGR</p>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="p-0" style={{ contain: 'paint' }}>
                        <div className="d-block d-md-flex align-items-center box-blur px-4 py-3 border-bottom">
                            <h1 className="fs-20 me-auto m-0">Referral List</h1>
                            <form className="ms-auto mt-3 mt-md-0">
                                <div className="input-group">
                                    <input type="search" className="form-control" placeholder="Search wallet / ref.link..." style={{ minHeight: '46px' }} />
                                    <button className="input-group-text border-0"><i className="fa-regular fa-magnifying-glass" /></button>
                                </div>
                            </form>
                        </div>
                        <table className="table table-tokens">
                            <thead className="sticky-top" style={{ top: '79px' }}>
                                <tr className="text-end">
                                    <th scope="col" className="text-start">Wallet Address</th>
                                    <th scope="col">Farms Liquidity</th>
                                    <th scope="col">Stacked in Launchpools</th>
                                    <th scope="col">Total Earned</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                                <tr className="text-end">
                                    <th scope="row" className="text-start">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-regular fa-wallet dropdown-item-icon" />
                                            <div className="ms-3">
                                                <div className="fw-500 text-truncate" style={{ maxWidth: '150px' }}>mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                                <div className="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="fw-500">$0.00</div>
                                        <div className="color-grey fw-500 small mt-1">USD</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                    <td>
                                        <div className="fw-500">
                                            0.0000 TGR
                                        </div>
                                        <div className="color-grey fw-500 small mt-1">$0.00</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center p-5">
                            <div className="d-inline bg-light px-4 py-3 rounded-8">
                                <i className="fa-solid fa-circle-notch fa-spin me-2" /> Loading
                            </div>
                        </div>
                    </Card>
                </Container>
            </section>
            <section className="section py-5">
                <Container>
                    <h2 className="fs-24 fw-700 mb-5">FAQ</h2>
                    <Accordion className="row" defaultActiveKey="0">
                        <Col lg={6} className="mb-3">
                            {/* item */}
                            <Accordion.Item eventKey="0" className="card mb-3 p-0">
                                <Accordion.Header>Where do I get my referral link?</Accordion.Header>
                                <Accordion.Body>
                                    Connect a wallet and find your referral link in the Referral section.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="1" className="card mb-3 p-0">
                                <Accordion.Header>How do I invite a referral friend?</Accordion.Header>
                                <Accordion.Body>
                                    Invite your friends to register via your referral link.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="2" className="card mb-3 p-0">
                                <Accordion.Header>Are there separate balances for referral rewards from friends' Swaps, Farms, Launchpools?</Accordion.Header>
                                <Accordion.Body>
                                    Yes, there are three separate balances for the referral rewards.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="3" className="card mb-3 p-0">
                                <Accordion.Header>How do I generate a new referral link?</Accordion.Header>
                                <Accordion.Body>
                                    Find 'My Referral Link' block and click on the 'plus' button near the link field. Choose the profit share for your friends and click generate a referral link.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="4" className="card mb-3 p-0">
                                <Accordion.Header>How does profit sharing work?</Accordion.Header>
                                <Accordion.Body>
                                    Profit sharing allows you to share a portion of referral rewards with your invited friends. The percentage can be: 0%, 10% 25%, 50%
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="5" className="card mb-3 p-0">
                                <Accordion.Header>Where are all my generated referral links?</Accordion.Header>
                                <Accordion.Body>
                                    View all of your generated links on the 'Referral Links' section of the Referral page.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="6" className="card mb-3 p-0">
                                <Accordion.Header>In what crypto currency the referral commission is accounted to my referral balance?</Accordion.Header>
                                <Accordion.Body>
                                    The referral rewards are accounted in TGR tokens only.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="7" className="card mb-3 p-0">
                                <Accordion.Header>Are there fees for referral rewards withdrawal from referral balances?</Accordion.Header>
                                <Accordion.Body>
                                    Once you withdraw from your referral balances, a BSC network fee of approximately 0.5 TGR will be charged.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Col>
                        <Col lg={6} className="mb-3">
                            {/* item */}
                            <Accordion.Item eventKey="8" className="card mb-3 p-0">
                                <Accordion.Header>How much crypto can I earn via the Swap Referral Program?</Accordion.Header>
                                <Accordion.Body>
                                    You can earn from 10% to 20% in TGR right after your friends have made a swap. The percentage depends on the amount of staked TGR tokens in TGR Holder Pool:
                                    <ul className="list-unstyled mt-3">
                                        <li className="mb-2">0 TGR Staked = 10% Reff Bonus</li>
                                        <li className="mb-2">200 TGR Staked = 12% Reff Bonus</li>
                                        <li className="mb-2">1 000 TGR Staked = 14% Reff Bonus</li>
                                        <li className="mb-2">3 000 TGR Staked = 16% Reff Bonus</li>
                                        <li className="mb-2">7 000 TGR Staked = 18% Reff Bonus</li>
                                        <li>10 000 TGR Staked = 20% Reff Bonus</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="9" className="card mb-3 p-0">
                                <Accordion.Header>What percentage of Swap referral rewards will I earn if I have 0 TGR staked in TGR Holder Pool?</Accordion.Header>
                                <Accordion.Body>
                                    If you have 0 TGR staked in the TGR Holder pool, you will be getting 10% by default. To earn more in the Swap Referral Program on Biswap, you need to stake TGR in the Holder Pool.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="10" className="card mb-3 p-0">
                                <Accordion.Header>Is the Swap referral program active for all swap pairs?</Accordion.Header>
                                <Accordion.Body>
                                    No. Referral Program consider only whitelisted pairs, including but not limited to:ETH - BTCB, BUSD - USDT, BTCB - USDT, ETH - USDT, USDC - USDT, BNB - TGR, ETH - BNB, BNB - USDT, BNB - BUSD, BNB - BTCB, USDT - TGR, LINK - BNB, ADA - BNB, DOGE - BNB, CAKE - BNB, UST - BUSD, DOT - BNB, DAI - USDT, UNI - BNB, FIL - USDT, USDT - LTC, BUSD - VAI, SOL - BNB, BUSD - TUSD, BFG - TGR, XVS - BNB, AVAX - BNB. Find the complete list of whitelisted pairs in Biswap Docs
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="11" className="card mb-3 p-0">
                                <Accordion.Header>How much can I earn from my friends' Farms &amp; Launchpools?</Accordion.Header>
                                <Accordion.Body>
                                    You can expect a 5% return from your friends' earnings in TGR.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="12" className="card mb-3 p-0">
                                <Accordion.Header>Is Referral Program Active for all Launchpools?</Accordion.Header>
                                <Accordion.Body>
                                    No. Referral Program is active only for Stake BSW - Earn BSW Launchpool without auto-compound.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="13" className="card mb-3 p-0">
                                <Accordion.Header>When will I get my referral reward from Farms &amp; Launchpools?</Accordion.Header>
                                <Accordion.Body>
                                    You will get your referral reward the moment your friend makes Harvest.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="14" className="card mb-3 p-0">
                                <Accordion.Header>Can I profit from the Referral Program without any investments from my side?</Accordion.Header>
                                <Accordion.Body>
                                    Yes, you can earn 10% from the Swap Referral Program and 5% from Farms &amp; Launchpools without any required investments from your side.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Col>
                    </Accordion>
                </Container>
            </section>
        </>
    )
}
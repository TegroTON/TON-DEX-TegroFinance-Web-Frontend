import React, { useState, useRef } from "react";
import StakingCards from "./components/StakingCards";
import FagItems from "./components/FaqItem";
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Form, InputGroup, Dropdown, Nav, ListGroup, Accordion } from "react-bootstrap";

export function StakingPage() {
  const [stakingcard] = useState([
    {
      DaysBageColor: "soft-blue",
      DaysText: "30 days",
      StatusBg: "soft-red",
      StatusName: "No active",
      srcImage: "./assets/images/token/TGR.png",
      TokenName: "TGR",
      APYPercent: "2.73%",
      TotalStakeProgess: "547.88",
      TotalStake: "10 000",
      ProgressBarPercent: "56",
      TotalStakePerUser: "250",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "19.9%"
    },
    {
      DaysBageColor: "soft-blue",
      DaysText: "30 days",
      StatusBg: "soft-green",
      StatusName: "Active",
      srcImage: "./assets/images/token/ggr.png",
      TokenName: "GGR",
      APYPercent: "4.20%",
      TotalStakeProgess: "240",
      TotalStake: "6 000",
      ProgressBarPercent: "16",
      TotalStakePerUser: "30",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "12.9%"
    },
    {
      DaysBageColor: "soft-green",
      DaysText: "60 days",
      StatusBg: "soft-red",
      StatusName: "No active",
      srcImage: "./assets/images/token/lave.png",
      TokenName: "LAVE",
      APYPercent: "2.73%",
      TotalStakeProgess: "4 768",
      TotalStake: "15 000",
      ProgressBarPercent: "24",
      TotalStakePerUser: "400",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "14.05%"
    },
    {
      DaysBageColor: "soft-green",
      DaysText: "60 days",
      StatusBg: "soft-red",
      StatusName: "No active",
      srcImage: "./assets/images/token/idu.png",
      TokenName: "IDU",
      APYPercent: "8.25%",
      TotalStakeProgess: "360.20",
      TotalStake: "2 000",
      ProgressBarPercent: "44",
      TotalStakePerUser: "20",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "1.22%"
    },
    {
      DaysBageColor: "soft-red",
      DaysText: "90 days",
      StatusBg: "soft-red",
      StatusName: "No active",
      srcImage: "./assets/images/token/fnz.png",
      TokenName: "FNZ",
      APYPercent: "3.44%",
      TotalStakeProgess: "2 048",
      TotalStake: "4 000",
      ProgressBarPercent: "52",
      TotalStakePerUser: "24",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "1.18%"
    },
    {
      DaysBageColor: "soft-red",
      DaysText: "90 days",
      StatusBg: "soft-red",
      StatusName: "No active",
      srcImage: "./assets/images/token/ousdt.png",
      TokenName: "oUSDT",
      APYPercent: "1.82%",
      TotalStakeProgess: "1 702",
      TotalStake: "3 500",
      ProgressBarPercent: "30",
      TotalStakePerUser: "120",
      ContractLink: "https://bscscan.com/address/0xa04adebaf9c96882C6d59281C23Df95AF710003e",
      HarvestButtonOnClick: "",
      ApproveButton: "",
      CommissionFee: "0.36%"
    },

  ]);
  const showStakingCards = true;

  return (
    <>
      <section
        className="section hero bg-liner pt-5 border-bottom"
        style={{ paddingBottom: "96px" }}
      >
        <Container>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {/* <div className="mb-4 d-flex align-items-center justify-conten-center">
                            <div className="shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', zIndex: '2' }}>
                                <img className="rounded-circle" style={{ width: '80px', height: '80px' }} src="./assets/images/token/ton.png" alt="" />
                            </div>
                            <div className="shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', marginLeft: '-24px' }}>
                                <img className="rounded-circle" style={{ width: '80px', height: '80px' }} src="./assets/images/token/TGR.png" alt="" />
                            </div>
                        </div> */}
            <h1 className="fw-800 mb-3" style={{ fontSize: "50px" }}>
              Fixed Staking
            </h1>
            <p
              className="fs-20 color-grey mb-0"
            >
              1st on TONCOIN DEX. Level up your crypto earn!
            </p>
          </div>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </Container>
      </section>
      <section
        className="section position-relative mb-3 mb-lg-5"
        style={{ marginTop: "-60px", zIndex: "1" }}
      >
        <Container>
          <Row className="mb-3 mb-lg-5">
            <Col lg={3} className="d-flex align-items-center mb-4 mb-lg-0 order-1">
              <Nav
                justify
                variant="pills"
                className="content-nav-pills d-flex align-items-center flex-nowrap flex-fill overflow-auto"
                style={{ height: "44px" }}
              >
                <Nav.Item>
                  <a href="#!" className="nav-link btn active py-2 fs-14">Active</a>
                </Nav.Item>
                <Nav.Item>
                  <a href="#!" className="nav-link btn py-2 fs-14">inactive</a>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="col-6 col-lg-5 d-flex align-items-center order-3 order-lg-2">
              <Form.Check
                type="switch"
                id="custom-switch"
                className="mb-0 ms-auto ms-lg-0"
                label={
                  <div
                    className="ms-1 position-relative"
                    style={{ top: "2px" }}
                  >
                    Staked only
                  </div>
                }
              />
            </Col>
            <Col className="col-6 col-lg-1 d-flex align-items-center order-2 order-lg-3">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light btn-sm"
                  style={{ height: "44px" }}
                >
                  All
                  <i className="fa-solid fa-angle-down ms-3"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" className="active">
                    All
                  </Dropdown.Item>
                  <Dropdown.Item href="#">APY</Dropdown.Item>
                  <Dropdown.Item href="#">Total staked</Dropdown.Item>
                  <Dropdown.Item href="#">Earned</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="col-12 col-lg-3 d-flex align-items-center order-4 order-lg-4 mt-3 mt-lg-0">
              <Form className="flex-fill ms-lg-3 ms-xl-0">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa-regular fa-magnifying-glass" />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search Coins"
                    aria-label="Search Coins"
                    style={{ minHeight: "40px" }}
                  />
                </InputGroup>
              </Form>
            </Col>
          </Row>
          {/* Staking Cards */}
          <Row>
            {showStakingCards ? (
              <>
                {stakingcard.map((stakcard) => {
                  return (
                    <StakingCards
                      key={uuidv4()}
                      DaysBageColor={stakcard.DaysBageColor}
                      DaysText={stakcard.DaysText}
                      TokenName={stakcard.TokenName}
                      srcImage={stakcard.srcImage}
                      APYPercent={stakcard.APYPercent}
                      TotalStakeProgess={stakcard.TotalStakeProgess}
                      TotalStake={stakcard.TotalStake}
                      ProgressBarPercent={stakcard.ProgressBarPercent}
                      TotalStakePerUser={stakcard.TotalStakePerUser}
                      ContractLink={stakcard.ContractLink}
                      ApproveButton={stakcard.ApproveButton}
                      CommissionFee={stakcard.CommissionFee}
                    />
                  );
                })}
              </>
            ) : (
              <p>No data yet</p>
            )}
          </Row>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section py-5">
        <Container>
          <h2 className="fs-32 fw-700 mb-5" id="FAQ">
            FAQ
          </h2>
          <Accordion className="row">
            <Col lg={6}>
              {/* item */}
              <FagItems
                eventKey="1"
                title="Does the lock term period of 30,60, and 90 days restart after
            each additional stake?"
                text={
                  <>
                    Yes. For example, today, you have staked 1 TON in the pool
                    with a 60 days lock term. Right after the stake has been made,
                    the timer was launched for 60 days, when you can harvest
                    earnings with no fee. In 10 days, you decided to make an
                    additional stake of 2 TON in the same pool. During this stake,
                    the timer restarts and starts counting 60 days again. With
                    this action, the rewards are not being withdrawn and remain on
                    the balance.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="2"
                title="Can I unstake the total or partial amount from the pool?"
                text={
                  <>
                    You can only make an unstake of the total amount of staked
                    tokens. Once you make an unstake as not an early withdrawal,
                    you receive the total amount of staked tokens + gained
                    rewards.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="3"
                title="How much time does it take to make Harvest or Unstake?"
                text={
                  <>
                    Harvest or unstake are usually immediate, but it might take up
                    to 48 hours in some cases.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="4"
                title="When can I receive the rewards?"
                text={
                  <>
                    The staking interest is distributed on a daily basis from
                    12:00 PM (UTC) on the day after the funds are deposited to the
                    contract to the end of the corresponding product period (given
                    that the funds are deposited before 12:00 PM (UTC). The first
                    payout is tied to each stake separately. For example, today,
                    you have staked 10 TON in the pool with the 90-day lock term
                    at 11:30 AM UTC. The first rewards will be credited at 12:00
                    PM UTC on the next day.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="5"
                title="Do Fixed Staking pools continue to function after the 30/60/90
              days of lock term?"
                text={
                  <>
                    Yes. Fixed Staking pools are dateless and keep functioning
                    after the end of the lock term. The lock term identifies the
                    number of days after which the fee for early withdrawal won’t
                    be applied.
                  </>
                }
              />
            </Col>
            <Col lg={6}>
              {/* item */}
              <FagItems
                eventKey="6"
                title="What is Fixed Staking on Tegro Finance?"
                text={
                  <>
                    Fixed Staking allows you to stake a token and receive profit
                    with a fixed APR in the same token. For example, Stake TON -
                    Earn TON.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="7"
                title="What Fixed Staking pools are available on Tegro Finance?"
                text={
                  <>
                    Currently, there are pools with the tokens: TON, ADA, DOT.
                    More pools will be added in the future.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="8"
                title="Is there any impermanent loss in Fixed Staking?"
                text={
                  <>
                    There is no impermanent loss. You can maximize your crypto
                    funds safely and simply.
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="9"
                title="Is there any fee for early withdrawal from the pools?"
                text={
                  <>
                    Yes. For each token, there will be 3 options of pools with the
                    lock term at the time when the commission for early withdrawal
                    is required: 30, 60 and 90 days. If you have staked in a pool
                    and decide to withdraw earlier, the 1.99% commission will be
                    required from the amount of the stake + what has already been
                    credited as rewards.
                    <p className="mt-3 mb-0">
                      30/60/90 days - 1.99% fee from the amount of the stake
                    </p>
                  </>
                }
              />
              {/* item */}
              <FagItems
                eventKey="10"
                title="When can I make Harvest from the pool?"
                text={
                  <>
                    You can harvest your earned funds only after 30,60,90 days
                    after the moment of staking. For example, you have staked 1
                    TON in the 60-day lock term pool. You can harvest with no fee
                    on the 61st day when you have earned 0.03 TON during the 60
                    days period.
                  </>
                }
              />
            </Col>
          </Accordion>
        </Container>
      </section>

      {/* Terms of use */}
      <section className="py-5">
        <Container>
          <div className="mb-4 pb-4 border-bottom">
            <h2 className="fs-32 fw-700 mb-1">Terms of use</h2>
            <p className="color-grey fw-500 fs-16">Revised: April 8, 2022</p>
            <p className="mb-0 fs-18">
              Please read the terms carefully as they govern <br /> your use of
              Tegro.Finance “Fixed Staking” services.
            </p>
          </div>
          <Row>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">01.</span>
                  <span className="ms-3">
                    By approving any of the contracts on this page, you agree
                    that you have read, understood and accepted all of the terms
                    and conditions stipulated in these Terms of Use, hereinafter
                    referred to as “these Terms”.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">02.</span>
                  <span className="ms-3">
                    Reference to “you” and “your” in these Terms are references
                    to any person using or accessing or attempting to use or
                    access this page.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">03.</span>
                  <span className="ms-3">
                    By accessing, using or attempting to use Tegro “Fixed
                    Staking” service in any capacity, you acknowledge that you
                    unconditionally authorize Tegro to transfer your funds for
                    further temporary staking to a third-party.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">04.</span>
                  <span className="ms-3">
                    By making use of Tegro “Fixed Staking” services you
                    acknowledge and agree that you are aware of the risks
                    associated with such services and shall assume all risks
                    related to the use of such services.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">05.</span>
                  <span className="ms-3">
                    Tegro assumes all responsibility and liability for the funds
                    deposited by users to the “Fixed Staking” contracts.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">06.</span>
                  <span className="ms-3">
                    By approving any of the contracts on this page, you
                    acknowledge and agree that such actions represent your true
                    investment decisions and you accept the potential risks and
                    benefits of your investment decisions.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">07.</span>
                  <span className="ms-3">
                    The APY is adjusted daily based on the on-chain staking
                    rewards, and the specific APY is subject to the page display
                    on the day.
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">08.</span>
                  <span className="ms-3">
                    You can withdraw your funds at any time otherwise stipulated
                    by Tegro.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">09.</span>
                  <span className="ms-3">
                    The staking interest is distributed on a daily basis from
                    12:00 PM (UTC) on the day after the funds are deposited to
                    the contract to the end of the corresponding product period
                    (given that the funds are deposited before 12:00 PM (UTC).
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">10.</span>
                  <span className="ms-3">
                    By committing your tokens to be locked for periods ranging
                    from 30 to 90 days, you acknowledge and agree that in case
                    of an early redemption you will have to give up your earned
                    interest and pay a withdrawal fee of 1.99% on your
                    principle.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">11.</span>
                  <span className="ms-3">
                    By opting for an early redemption, you should fully
                    recognize the risks associated with such actions and operate
                    cautiously.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">12.</span>
                  <span className="ms-3">
                    Tegro may make changes to these Terms and to the information
                    contained on this page at any time. Users undertake to refer
                    to these Terms promptly and regularly. Tegro will not be
                    held liable or responsible in any way of compensation should
                    users incur personal losses arising from ignorance and/or
                    negligence of these Terms.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">13.</span>
                  <span className="ms-3">
                    No communication or information provided to you by Tegro is
                    intended as, or shall be considered or construed as,
                    investment advice, financial advice, trading advice,
                    recommendation to transact in any investment or solicitation
                    to engage in any investment activity.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex p-3">
                  <span className="fw-500">14.</span>
                  <span className="ms-3">
                    If you do not agree to the aforementioned Terms you should
                    refrain from using Tegro “Fixed Staking” services.
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

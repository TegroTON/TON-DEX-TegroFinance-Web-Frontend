import { Col, Card, Button, ListGroup, ProgressBar, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

function StakingCards(props: any) {
    return (
        <Col md={6} xl={4}>
            <Card className="p-0 mb-4">
                {/* Card Badge */}
                <Badge bg={props.DaysBageColor} className="position-absolute end-0 top-0 rounded m-2 fs-14 fw-500" style={{padding: "12px 16px 12px 16px"}}>
                    <i className="fa-regular fa-clock-eight me-2" />
                    {props.DaysText}
                </Badge>
                {/* Card Header */}
                <Card.Header className="p-4 border-bottom">
                    <div className="d-flex aligh-items-center mb-4">
                        <img
                            className="rounded"
                            src={props.srcImage}
                            width={50}
                            height={50}
                            alt={props.TokenName}
                        />
                        <div className="ms-4">
                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                Earn {props.TokenName}
                            </Card.Title>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip
                                        id="tooltip-Apy"
                                        style={{
                                            position: "absolute",
                                        }}
                                    >
                                        APY is calculated when Harvest and Stake is made
                                        once in {props.days} within a year
                                    </Tooltip>
                                }
                            >
                                <div className="color-grey fs-16 fw-500">
                                    Stake <u>APY</u> <span className="fw-700">{props.APYPercent}</span>
                                </div>
                            </OverlayTrigger>
                        </div>
                    </div>
                    {/* Progress Bar  */}
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                            <div className="d-flex align-items-center">
                                Total Stake
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id="tooltip-commission">
                                            The total stake of tokens for all users in this
                                            pool
                                        </Tooltip>
                                    }
                                >
                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                </OverlayTrigger>
                            </div>
                            <div className="ms-auto">
                                {props.TotalStakeProgess} <span className="color-grey">/ {props.TotalStake}</span>
                            </div>
                        </div>
                        <ProgressBar
                            variant="green"
                            className="bg-light"
                            now={props.ProgressBarPercent}
                            style={{ height: "8px" }}
                        />
                    </div>
                </Card.Header>
                {/* Card Body */}
                <Card.Body className="p-4">
                    {/* List Box One */}
                    <ListGroup className="list-unstyled mb-3 mx-1">
                        <ListGroup.Item className="d-flex">
                            <span className="me-auto color-grey">
                                Total stake per user:
                            </span>
                            <span className="fw-500">{props.TotalStakePerUser} {props.TokenName}</span>
                        </ListGroup.Item>
                    </ListGroup>
                    {/* List Box Two */}
                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                        <ListGroup.Item className="d-flex align-items-center mb-3">
                            <div className="d-flex align-items-center me-auto color-grey">
                                Earned {props.TokenName}
                                <Badge bg={props.StatusBg} className="ms-2 p-2">
                                    {props.StatusName}
                                </Badge>
                            </div>
                            <Button variant="green btn-sm py-2 px-3 disabled">
                                Harvest
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center">
                            <span className="me-auto color-grey">Overview</span>
                            <a href={props.ContractLink} className="link" target="_blank">
                                View contract
                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                    {/* Button */}
                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                        <img
                            className="rounded me-3"
                            src={props.srcImage}
                            width={24}
                            height={24}
                            style={{ outline: "2px solid var(--bg-primary)" }}
                        />
                        <span className="fs-16 fw-500">Approve {props.TokenName}</span>
                    </Button>
                    {/* Commission Box */}
                    <div className="mt-3">
                        <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Tooltip id={`tooltip-bottom`}>
                                    {props.CommissionFee} commission fee is required for early withdrawal.
                                    No additional fees after {props.days} lock term.
                                </Tooltip>
                            }
                        >
                            <div className="color-grey text-center">
                                {props.CommissionFee} unstaking fee if withdrawn within {props.days}
                            </div>
                        </OverlayTrigger>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default StakingCards;
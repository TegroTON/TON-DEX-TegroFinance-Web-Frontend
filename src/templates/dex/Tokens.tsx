import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';

export function TokensPage() {
  return (
    <Container>
      <Row>
        <Col className="mx-auto">
          <Card className="p-0" style={{ contain: 'paint' }}>
            <div className="d-block d-md-flex align-items-center box-blur px-4 py-3 border-bottom ">
              <h1 className="fs-20 me-auto m-0">Tokens</h1>
              <Form className="ms-auto mt-3 mt-md-0">
                <InputGroup>
                  <Form.Control
                    placeholder="Filter Tokens"
                    style={{ minHeight: '46px' }}
                  />
                  <InputGroup.Text id="basic-addon1">
                    <i className="fa-regular fa-magnifying-glass" />
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
            <table className="table table-tokens">
              <thead className="sticky-top" style={{ top: '79px' }}>
                <tr className="text-end">
                  <th scope="col" className="text-start">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Net Position</th>
                  <th scope="col">Volume($)</th>
                </tr>
              </thead>
              <tbody>
                {/*tr class="text-center">
                     <td colspan="4" class="py-5">
                        <div class="d-inline bg-soft-red color-red rounded-8 px-4 py-3">
                           No tokens found
                        </div>
                     </td>
                  </tr*/}
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/BTC.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">BTC</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$16513.7</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      $2.09 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-up me-1" />  0.63%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$44,603,824</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 34,643.54
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/eth.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">ETH</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$1218.1</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      -220.62 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-down me-1" /> -4.92%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$44,603,824</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 34,643.54
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/10000SHIB.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">10000SHIB</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$0.09242</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      127,724.00 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-up me-1" />  0.21%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$2,605,852</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 11,804.25
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/NEAR.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">NEAR</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$1.615</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      $277.26 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-grey" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        0.00%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$2,862,348</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 447.77
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/AVAX.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">AVAX</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$12.640</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      - 3,696.03 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-down me-1" />  -0.85%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$1,702,979</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: -46,717.82
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/BTC.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">BTC</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$16513.7</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      $2.09 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-up me-1" />  0.63%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$44,603,824</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 34,643.54
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/eth.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">ETH</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$1218.1</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      -220.62 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-down me-1" /> -4.92%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$44,603,824</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 34,643.54
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/10000SHIB.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">10000SHIB</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$0.09242</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      127,724.00 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-up me-1" />  0.21%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$2,605,852</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 11,804.25
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/NEAR.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">NEAR</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$1.615</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      $277.26 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-grey" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        0.00%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$2,862,348</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: 447.77
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="text-end">
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img src="/assets/images/token/AVAX.svg" width={24} height={24} alt="Tegro Coin" />
                      <Link to="/symboldetail" className="fw-700 ms-3">AVAX</Link>
                    </div>
                  </th>
                  <td>
                    <div className="fw-500">$12.640</div>
                    <div className="color-grey fw-500 small">USD</div>
                  </td>
                  <td>
                    <div className="fw-500">
                      - 3,696.03 USD
                    </div>
                    <div className="fw-500 color-green small mt-1">
                      <span className="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                        <i className="fa-solid fa-caret-down me-1" />  -0.85%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">$1,702,979</div>
                    <div className="color-grey fw-500 small mt-1">
                      <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                        NP: -46,717.82
                      </span>
                    </div>
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
        </Col>
      </Row>
    </Container>
  )
}
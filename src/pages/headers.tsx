import { useEffect, useState } from "react";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { selectTheme, switchTheme } from "../store/features/themeSlice";
import { AuthButton } from "./dex/components/AuthButton";
import LanguageMenu from "./dex/components/LanguageMenu";

export function DefaultHeader() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (theme === "dark-mode") {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [theme]);

  return (
    <>
      <header className="header border-bottom mb-4 mb-lg-5">
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={() => {
            setExpanded(!expanded);
          }}
        >
          <Container fluid className="px-auto px-xl-5">
            <Link to="/" className="header__logo">
              <img
                src="/static/assets/images/logotype.svg"
                alt=""
                className="header__logo-img"
              />
            </Link>
            <div className="d-block d-lg-none ms-auto me-4">
              <Nav.Item>
                <AuthButton isMobile={true} />
              </Nav.Item>
            </div>
            {/* Toggle Button */}
            <Navbar.Toggle
              data-bs-target="#navbarDexContent"
              data-bs-toggle="collapse"
              className="btn-toggler"
            >
              <span />
              <span />
              <span />
            </Navbar.Toggle>

            {/* Navigation Links */}
            <Navbar.Collapse id="navbarDexContent">
              <div className="d-flex flex-column flex-lg-row w-100">
                <Nav className="d-block d-lg-flex align-items-center order-2 order-lg-1 me-auto">
                  <Nav.Item>
                    <Link
                      className={`nav-link text-nowrap ${
                        location.pathname === "/swap" ? "active-link" : ""
                      }`}
                      to="/swap"
                      onClick={() => setExpanded(false)}
                    >
                      {t("navigation.exchange.exchange")}
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link
                      className={`nav-link text-nowrap ${
                        location.pathname.slice(0, 10) === "/liquidity"
                          ? "active-link"
                          : ""
                      }`}
                      to="/liquidity"
                      onClick={() => setExpanded(false)}
                    >
                      {t("navigation.liquidity.liquidity")}
                    </Link>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        {t("navigation.wallet.wallet")}{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collapsible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      href="https://tegro.io/wallet/"
                      target="_blank"
                      className="d-flex"
                    >
                      <i className="fa-light fa-wallet dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.wallet.webWallet")}
                        <div className="text-muted small">
                          {t("navigation.wallet.webWalletDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://play.google.com/store/apps/details?id=com.tonholdwallet.android"
                      target="_blank"
                    >
                      <i className="fa-brands fa-google-play dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.wallet.androidApp")}
                        <div className="text-muted small">
                          {t("navigation.wallet.androidAppDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://chrome.google.com/webstore/detail/cdpdjfhimjdmbakdbabcklagceoikifg"
                      target="_blank"
                    >
                      <i className="fa-brands fa-chrome dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.wallet.chromeApp")}
                        <div className="text-muted small">
                          {t("navigation.wallet.chromeAppDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://microsoftedge.microsoft.com/addons/detail/dgegbhgbijbhkmkacomdlogdkacokpam"
                      target="_blank"
                    >
                      <i className="fa-brands fa-edge dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.wallet.edgeApp")}
                        <div className="text-muted small">
                          {t("navigation.wallet.edgeAppDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        {t("navigation.e-commerce.e-commerce")}{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collapsible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.io/commerce/"
                      target="_blank"
                    >
                      <i className="fa-light fa-money-check-dollar-pen dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.e-commerce.paymentSystem")}
                        <div className="text-muted small">
                          {t("navigation.e-commerce.paymentSystemDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="p-3 fs-14 fw-medium text-muted  bg-transparent">
                      {t("navigation.e-commerce.forBusiness")}
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.money/referral-program/"
                      target="_blank"
                    >
                      <i className="fa-light fa-handshake dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.e-commerce.affiliateProgram")}
                        <div className="ms-1 u-badge">new</div>
                        <div className="text-muted small">
                          {t("navigation.e-commerce.affiliateProgramDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item> */}
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.money/security/"
                      target="_blank"
                    >
                      <i className="fa-light fa-shield-check dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.e-commerce.security")}
                        <div className="text-muted small">
                          {t("navigation.e-commerce.securityDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="p-3 fs-14 fw-medium text-muted bg-transparent">
                      {t("navigation.e-commerce.developers")}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://tegro.money/docs/en/"
                      target="_blank"
                    >
                      <div className="d-flex">
                        <i className="fa-light fa-book dropdown-item-icon" />
                        <div className="ms-3">
                          {t("navigation.e-commerce.allDocumentation")}
                          <div className="text-muted small">
                            {t("navigation.e-commerce.allDocumentationDesc")}
                          </div>
                        </div>
                      </div>
                      <Row className="list-style-inside">
                        <Col>
                          <NavDropdown.Item
                            className="fs-14"
                            href="https://tegro.money/docs/en/begin/register/add-shop/"
                            target="_blank"
                          >
                            {t("navigation.e-commerce.addingStore")}
                          </NavDropdown.Item>
                        </Col>
                        <Col>
                          <NavDropdown.Item
                            className="fs-14"
                            href="https://tegro.money/docs/en/sci/create-payment/"
                            target="_blank"
                          >
                            {t("navigation.e-commerce.apiDocumentation")}
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        {t("navigation.nft.nft")}{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collapsible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://libermall.com/"
                      target="_blank"
                    >
                      <i className="fa-light fa-house dropdown-item-icon" />
                      <div className="ms-3">
                        Libermall
                        <div className="dropdown-item__desc text-muted small">
                          {t("navigation.nft.libermallDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://libermall.com/#explore"
                      target="_blank"
                    >
                      <i className="fa-light fa-hexagon-vertical-nft dropdown-item-icon" />
                      <div className="ms-3">
                        {t("navigation.nft.exploreCollections")}
                        <div className="text-muted small">
                          {t("navigation.nft.exploreCollectionsDesc")}
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        {t("navigation.more.more")}{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collapsible-nav-dropdown"
                  >
                    <Row>
                      <Col>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.money/pay/coupons/"
                          target="_blank"
                        >
                          <i className="fa-light fa-badge-percent dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.discounts")}
                            <div className="text-muted small">
                              {t("navigation.more.discountsDesc")}
                            </div>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.money/advantages/"
                          target="_blank"
                        >
                          <i className="fa-light fa-rocket-launch dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.advantages")}
                            <div className="text-muted small">
                              {t("navigation.more.advantagesDesc")}
                            </div>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.gitbook.io/en/dex/bug-bounty"
                          target="_blank"
                        >
                          <i className="fa-light fa-bug dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.bugBounty")}
                            <div className="text-muted small">
                              {t("navigation.more.bugBountyDesc")}
                            </div>
                          </div>
                        </NavDropdown.Item>
                      </Col>
                      <Col>
                        <Link
                          className="d-flex dropdown-item"
                          to="/privacy"
                          onClick={() => setExpanded(false)}
                        >
                          <i className="fa-light fa-file-contract dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.privacyPolicy")}
                            <div className="text-muted small">
                              {t("navigation.more.privacyPolicyDesc")}
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="d-flex dropdown-item"
                          to="/terms"
                          onClick={() => setExpanded(false)}
                        >
                          <i className="fa-light fa-file-contract dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.termsOfUse")}
                            <div className="text-muted small">
                              {t("navigation.more.termsOfUseDesc")}
                            </div>
                          </div>
                        </Link>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://t.me/TegroForum"
                          target="_blank"
                        >
                          <i className="fa-light fa-envelope-open-text dropdown-item-icon" />
                          <div className="ms-3">
                            {t("navigation.more.contactUs")}
                            <div className="text-muted small">
                              {t("navigation.more.contactUsDesc")}
                            </div>
                          </div>
                        </NavDropdown.Item>
                      </Col>
                    </Row>
                  </NavDropdown>
                </Nav>

                <Nav className="d-block d-lg-flex align-items-center align-items-lg-center border-top-mobile order-3 ms-0 ms-lg-2">
                  <LanguageMenu setExpanded={setExpanded} />
                  <Nav.Item className="me-0 me-lg-2">
                    <Nav.Link
                      className="btn btn-sm btn-link bg-transparent"
                      href="javascript://"
                      onClick={() => {
                        dispatch(switchTheme());
                      }}
                    >
                      <div className="dark-mode-icon w-100">
                        <div className="d-flex align-items-center w-100">
                          <span className="d-inline d-lg-none me-auto">
                            {t("theme.dark")}
                          </span>
                          <i
                            className="fa-solid fa-moon fs-18"
                            style={{
                              transform: "rotate(210deg)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="light-mode-icon w-100">
                        <div className="d-flex align-items-center w-100">
                          <span className="d-inline d-lg-none me-auto">
                            {t("theme.light")}
                          </span>
                          <i className="fa-solid fa-sun-bright fs-18" />
                        </div>
                      </div>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="mx-2 mx-lg-0 mt-4 mt-lg-0 d-none d-lg-block">
                    <AuthButton />
                  </Nav.Item>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

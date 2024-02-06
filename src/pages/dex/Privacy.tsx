import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row>
          <Col lg={7} xl={6} className="mx-auto">
            <Card>
              <h1 className="fw-bolder">{t("privacy.privacyPolicy")}</h1>
              <div className="color-grey mb-5">
                <div className="mb-5">
                  {t("privacy.lastUpdated")} October 5, 2021.
                </div>
                <p>{t("privacy.desc.paragraph1")}</p>
                <p>{t("privacy.desc.paragraph2")}</p>
                <p>{t("privacy.desc.paragraph3")}</p>
              </div>
              <h2 className="mb-4">
                {t("privacy.informationWeCollect.title")}
              </h2>
              <div className="color-grey mb-5">
                <p>{t("privacy.informationWeCollect.paragraph1")}</p>
                <p>{t("privacy.informationWeCollect.paragraph2")}</p>
                <p>{t("privacy.informationWeCollect.paragraph3")}</p>
                <p>{t("privacy.informationWeCollect.paragraph4")}</p>
                <p>{t("privacy.informationWeCollect.paragraph5")}</p>
              </div>
              <h2 className="mb-4">{t("privacy.howWeUseInformation.title")}</h2>
              <div className="color-grey mb-5">
                <p>{t("privacy.howWeUseInformation.desc")}</p>
                <ul>
                  <li>{t("privacy.howWeUseInformation.item1")}</li>
                  <li>{t("privacy.howWeUseInformation.item2")}</li>
                  <li>{t("privacy.howWeUseInformation.item3")}</li>
                  <li>{t("privacy.howWeUseInformation.item4")}</li>
                  <li>{t("privacy.howWeUseInformation.item5")}</li>
                  <li>{t("privacy.howWeUseInformation.item6")}</li>
                  <li>{t("privacy.howWeUseInformation.item7")}</li>
                  <li>{t("privacy.howWeUseInformation.item8")}</li>
                  <li>{t("privacy.howWeUseInformation.item9")}</li>
                  <li>{t("privacy.howWeUseInformation.item10")}</li>
                </ul>
                <p />
              </div>
              <div className="main-title">
                {t("privacy.legalBasisForPersonalInformation.title")}
              </div>
              <div className="color-grey mb-5">
                {t("privacy.legalBasisForPersonalInformation.desc")}
                <ul>
                  <li>{t("privacy.legalBasisForPersonalInformation.item1")}</li>
                  <li>{t("privacy.legalBasisForPersonalInformation.item2")}</li>
                  <li>{t("privacy.legalBasisForPersonalInformation.item3")}</li>
                </ul>
              </div>
              <h2 className="mb-4">
                {t("privacy.sharingOfTheInformation.title")}
              </h2>
              <div className="color-grey mb-5">
                {t("privacy.sharingOfTheInformation.desc")}&nbsp;
                <ul>
                  <li>
                    <b>{t("privacy.sharingOfTheInformation.item1.title")}</b>
                    &nbsp;{t("privacy.sharingOfTheInformation.item1.text")}
                  </li>
                  <li>
                    <b>{t("privacy.sharingOfTheInformation.item2.title")}</b>
                    &nbsp;{t("privacy.sharingOfTheInformation.item2.text")}
                  </li>
                  <li>
                    <b>{t("privacy.sharingOfTheInformation.item3.title")}</b>
                    &nbsp;{t("privacy.sharingOfTheInformation.item3.text")}
                  </li>
                  <li>
                    <b>{t("privacy.sharingOfTheInformation.item4.title")}</b>
                    &nbsp;{t("privacy.sharingOfTheInformation.item4.text")}
                  </li>
                  <li>
                    <b>{t("privacy.sharingOfTheInformation.item5.title")}</b>
                    &nbsp;{t("privacy.sharingOfTheInformation.item5.text")}
                  </li>
                </ul>
              </div>
              <h2 className="mb-4">
                {t("privacy.crossBorderInformation.title")}
              </h2>
              <div className="color-grey mb-5">
                <p>{t("privacy.crossBorderInformation.paragraph1")}</p>
                <p>{t("privacy.crossBorderInformation.paragraph2")}</p>
                <p>{t("privacy.crossBorderInformation.paragraph3")}</p>
              </div>
              <div className="main-title">{t("privacy.yourRights.title")}</div>
              <div className="color-grey mb-5">
                {t("privacy.yourRights.desc")}
                <ul>
                  <li>
                    <b>{t("privacy.yourRights.item1.title")}</b>{" "}
                    {t("privacy.yourRights.item1.text")}
                  </li>
                  <li>
                    <b>{t("privacy.yourRights.item2.title")}</b>{" "}
                    {t("privacy.yourRights.item2.text")}
                  </li>
                  <li>
                    <b>{t("privacy.yourRights.item3.title")}</b>{" "}
                    {t("privacy.yourRights.item3.text")}
                  </li>
                  <li>
                    <b>{t("privacy.yourRights.item4.title")}</b>{" "}
                    {t("privacy.yourRights.item4.text")}
                  </li>
                  <li>
                    <b>{t("privacy.yourRights.item5.title")}</b>{" "}
                    {t("privacy.yourRights.item5.text")}
                  </li>
                  <li>
                    <b>{t("privacy.yourRights.item6.title")}</b>{" "}
                    {t("privacy.yourRights.item6.part1")}{" "}
                    <a href="mailto:contact@Tegro.Finance.com">
                      contact@Tegro.Finance.com
                    </a>
                    {t("privacy.yourRights.item6.part2")}{" "}
                    <a href="mailto:contact@Tegro.Finance.com">
                      contact@Tegro.Finance.com
                    </a>{" "}
                    {t("privacy.yourRights.item6.part3")}
                  </li>
                </ul>
              </div>
              <h2 className="mb-4">{t("privacy.retentionPeriod.title")}</h2>
              <div className="color-grey mb-5">
                {t("privacy.retentionPeriod.text")}
              </div>
              <h2 className="mb-4">{t("privacy.security.title")}</h2>
              <div className="color-grey mb-5">
                {t("privacy.security.text")}
              </div>
              <h2 className="mb-4">{t("privacy.thirdPartyServices.title")}</h2>
              <div className="color-grey mb-5">
                {t("privacy.thirdPartyServices.part1")}{" "}
                <a href="https://ton.org" target="_blank">
                  https://ton.org
                </a>{" "}
                {t("privacy.thirdPartyServices.part2")}
              </div>
              <h2 className="mb-4">{t("privacy.changesAndUpdates.title")}</h2>
              <div className="color-grey mb-5">
                {t("privacy.changesAndUpdates.text")}
              </div>
              <h2 className="mb-4">{t("privacy.contactInformation.title")}</h2>
              <div className="color-grey mb-5">
                {t("privacy.contactInformation.text")}
                <br />
                E-mail: <a href="mailto:contact@dex.com">contact@dex.com</a>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

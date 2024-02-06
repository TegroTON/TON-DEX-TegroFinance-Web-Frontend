import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row>
          <Col lg={7} xl={6} className="mx-auto">
            <Card>
              <h1 className="hero-title">{t("terms.title")}</h1>
              <div className="color-grey mb-5">
                {t("terms.lastUpdated")} October 5, 2021.
              </div>
              <h2 className="mb-4">{t("terms.overview.title")}</h2>
              <div className="color-grey mb-5">
                <p>{t("terms.overview.paragraph1")}</p>
                <p>{t("terms.overview.paragraph2")}</p>
                <p>{t("terms.overview.paragraph3")}</p>
              </div>
              <h2 className="mb-4">Our Services</h2>
              <div className="color-grey mb-5">
                <p>
                  We provide you with the Application that is a self-hosted,
                  non-custodial wallet for The Open Network blockchain. The
                  Application is a software that provides the following
                  functionality:
                </p>
                <p>
                  (a) generates public wallet addresses and encrypted private
                  keys that you may use to send and receive cryptocurrency in
                  The Open Network blockchain;
                  <br />
                  (b) facilitates the submission of cryptocurrency transfer
                  instructions to The Open Network blockchain;
                  <br />
                  (c) allows users to interact with a third-party supplier for
                  cryptocurrency purchase purposes. It is important to note that
                  we do not provide cryptocurrency purchase services by
                  ourselves. The cryptocurrency purchase with a banking card is
                  supported by Tegro Finance. When making a purchase, you agree
                  with the terms of service provided by Tegro Finance.;
                  <br />
                  (d) allows users to interact with decentralized exchanges
                  (e.g. Uniswap) for cryptocurrency exchange purposes. It is
                  important to note that we do not provide cryptocurrency
                  exchange services by ourselves. The cryptocurrency exchange is
                  made by the users of the decentralized exchanges. When making
                  an exchange, you agree with the terms of service provided by
                  the relevant decentralized exchange.
                </p>
                <p>
                  The Application does not store your private keys, backup
                  phrases, or passwords on its servers. It is important to note
                  that you keep your private keys, backup phrases, or passwords
                  secure. We recommend you write down your backup phrase and
                  store it offline in only your available places. If you lose
                  your private keys, backup phrases or passwords, it will not be
                  possible for us to recover it for you and you may lose access
                  to your cryptocurrencies stored with the Application.
                </p>
                <p>
                  The only authentic record of cryptocurrency transactions is
                  The Open Network blockchain. The Application provides
                  functionality that allows you to send cryptocurrency transfer
                  instructions. In order to be completed, all proposed
                  cryptocurrency transactions must be confirmed and recorded in
                  The Open Network blockchain. This blockchain is decentralized,
                  peer-to-peer network supported by independent third parties,
                  which we do not own, control, or operate. We do not guarantee
                  that your transactions will be completed, because your
                  transaction shall be added, confirmed and stored in The Open
                  Network blockchain. You are recommended to inquire about the
                  fees (e.g. validation or mining fees) associated with your
                  cryptocurrency transactions that are required by The Open
                  Network blockchain you engage with. We shall not be
                  responsible for any losses you incur due to the transaction
                  fees or losses that occur due to incorrectly set transaction
                  fees (i.e. too low or high).
                </p>
              </div>
              <h2 className="mb-4">Access and use of the application</h2>
              <div className="color-grey mb-5">
                <p>
                  <strong>Limited License.</strong> We own all rights, titles,
                  and interests to the Application. Subject to your compliance
                  with the ToU, we grant you a non-assignable, non-transferable,
                  non-sublicensable, revocable, and non-exclusive license to use
                  the Application on devices you own or control solely for your
                  personal or internal purposes. By accessing the Application,
                  you agree not to: (a) sub-license, sell, rent, lease,
                  transfer, assign, reproduce, distribute, or otherwise
                  commercially exploit the Application; (b) modify, translate,
                  adapt, merge, make derivative works of, disassemble,
                  decompile, reverse compile or reverse engineer any part of the
                  Application; (d) access the Application in order to build a
                  similar or competitive software; (d) copy, reproduce,
                  distribute, republish, download, display, post or transmit the
                  Application except as expressly permitted herein; and (e)
                  remove or destroy any copyright notices or other proprietary
                  markings contained in the Application.
                </p>
                <p>
                  <strong>Your Use.</strong> You will ensure that your use of
                  the Application does not violate any applicable law. You are
                  solely responsible for your use of the Application.
                </p>
                <p>
                  <strong>Your Security.</strong> Because the Application is
                  locally installed, you are responsible for the security of the
                  device on which it is installed, including ensuring that you
                  keep anti-virus software current and otherwise protect the
                  device on which the Application is installed against malware.
                  We are not responsible for any loss or damages resulting from
                  your failure to keep the device on which the Application is
                  installed safe and free of any malware.
                </p>
                <p>
                  <strong>Credentials.</strong> You must keep secret all
                  credentials associated with the Application. You are solely
                  responsible for managing and maintaining the security of any
                  information relating to such credentials and agree that we
                  shall not be held responsible (and you shall not hold us
                  responsible) for any unauthorised access to the Application or
                  any resulting harm you may suffer.
                </p>
                <p>
                  <strong>Third Party Services and Content.</strong>&nbsp;In
                  using the Application, you may view content or services
                  provided by third parties, including links to web pages and
                  services of such parties (“Third Party Content”). We do not
                  control, endorse or adopt any Third Party Content and have no
                  responsibility for Third Party Content, including, without
                  limitation, material that may be misleading, incomplete,
                  erroneous, offensive, indecent or otherwise objectionable in
                  your jurisdiction. In addition, your dealings or
                  correspondence with such third parties are solely between you
                  and the third party. We are not responsible or liable for any
                  loss or damage of any sort incurred as a result of any such
                  dealings and your use of Third Party Content is at your own
                  risk.
                </p>
                <p>
                  <strong>User Content.</strong> You own your user content. By
                  posting, displaying, sharing or distributing user content on
                  or through the Application, you grant us license to use the
                  user content solely for the purpose of operating the
                  Application.
                </p>
                <p>
                  <strong>Trademarks.</strong> All graphics, logos, service
                  marks and trade names used on or in connection with the
                  Application are our trademarks and may not be used without
                  permission in connection with any third-party products or
                  services.
                </p>
                <p>
                  <strong>Fees and Taxes.</strong> The Application is offered
                  for free of any charges. We may impose or change a fee for the
                  Application at any time. When applicable, we may give you
                  advance notice of the fee imposition or changes. If you don't
                  agree with the fee, you shall not use the Application. You are
                  responsible for all taxes and fees associated with your
                  activities. You must collect, report, and/or pay the correct
                  amounts to the appropriate authorities, if applicable. Tax
                  laws differ from jurisdiction to jurisdiction and may be
                  subject to different interpretations by different authorities.
                  We recommend you consult an appropriate tax professional for
                  your specific tax situation.
                </p>
                <p>
                  <strong>Risk Warning.</strong> Trading and investing in
                  cryptocurrency involve substantial risk of loss. Please make
                  sure you are trading and investing mindfully after
                  understanding the nature, complexity and risks inherent in the
                  trading of cryptocurrency. You should not purchase
                  cryptocurrency unless you understand the extent of your
                  exposure to potential loss. Please make sure you are not
                  risking funds you cannot afford to lose. In no event shall we
                  be liable to any loss or damage of any kind incurred as a
                  result of the use of the Application.
                </p>
              </div>
              <h2 className="mb-4">Discontinuance of services</h2>
              <div className="color-grey mb-5">
                <p>
                  We may, in our sole discretion and without cost to you, with
                  or without prior notice, and at any time, modify or
                  discontinue, temporarily or permanently, any portion of our
                  services. You are solely responsible for storing outside of
                  the Application a backup of any wallet address and private key
                  pair that you maintain in your wallet. Maintaining an external
                  backup of any wallet address and private key pairs associated
                  with your wallet will allow you to access the The Open Network
                  blockchain upon which your wallet is secured. Such a backup
                  will allow you to fully restore your wallet at any time. If
                  you do not maintain a backup of your wallet data outside of
                  the Application, you will be not be able to access the
                  cryptocurrency associated with your wallet. We shall not be
                  held responsible or liable for any loss of cryptocurrency in
                  the event that we discontinue or depreciate our services.
                </p>
              </div>
              <h2 className="mb-4">Indemnification</h2>
              <div className="color-grey mb-5">
                <p>
                  You agree to indemnify and hold us harmless from any losses,
                  costs, liabilities and expenses (including reasonable
                  attorneys’ fees) relating to or arising out of: (a) your use
                  of, or inability to use the Application; (b) your violation of
                  the ToU; (c) your violation of any rights of another party; or
                  (d) your violation of any applicable laws, rules or
                  regulations. This provision does not require you to indemnify
                  us for any fraud, gross negligence, or wilful misconduct in
                  connection with providing services.
                </p>
              </div>
              <h2 className="mb-4">Disclaimer</h2>
              <div className="color-grey mb-5">
                <p>
                  The Application is provided “as is” except to the extent
                  prohibited by law. We make no representations or warranties of
                  any kind, whether express, implied, statutory or otherwise
                  regarding the Application, and disclaim all warranties,
                  including any implied or express warranties (i) of
                  merchantability, satisfactory quality, fitness for a
                  particular purpose, non-infringement, (ii) arising out of any
                  course of dealing or usage of trade, (iii) that the
                  Application will be uninterrupted, error free or free of
                  harmful components, and (iv) that any content will be secure
                  or not otherwise lost or altered.
                </p>
                <p>
                  Our services rely on new technologies, such as The Open
                  Network blockchain. Some services are subject to increased
                  risk through your potential misuse of things such as
                  public/private key cryptography. By using the Application, you
                  explicitly acknowledge and accept these heightened risks.
                </p>
              </div>
              <h2 className="mb-4">Limitation of Liability</h2>
              <div className="color-grey mb-5">
                <p>
                  To the fullest extent permitted by applicable law, in no event
                  will we or any of our officers, directors, representatives,
                  agents, servants, counsel, employees, consultants, lawyers,
                  and other personnel authorized to act, acting, or purporting
                  to act on our behalf be liable to you under contract, tort,
                  strict liability, negligence, or any other legal or equitable
                  theory, for: (a) any lost profits, data loss, cost of
                  procurement of substitute goods or services, or direct,
                  indirect, incidental, special, punitive, compensatory, or
                  consequential damages of any kind whatsoever resulting from:
                  (i) your use of, or conduct in connection with, the
                  Application; (ii) any unauthorized use of your wallet address
                  and/or private key due to your failure to maintain the
                  confidentiality of your wallet; (iii) any interruption or
                  cessation of transmission to or from the Application; or (iv)
                  any bugs, viruses, trojan horses, or the like that are found
                  in the application or that may be transmitted to or through
                  our services by any third party (regardless of the source of
                  origination), or (b) any direct damages in excess of (in the
                  aggregate) of the greater of 100.00 US dollars. These
                  limitations apply regardless of legal theory, whether based on
                  tort, strict liability, breach of contract, breach of
                  warranty, or any other legal theory, and whether or not we
                  were advised of the possibility of such damages. Some
                  jurisdictions do not allow the exclusion or limitation of
                  liability for consequential or incidental damages, so the
                  above limitation may not apply to you. Under no circumstances
                  shall we be required to deliver to you any cryptocurrency as
                  damages, make specific performance or any other remedy.
                </p>
              </div>
              <h2 className="mb-4">Governing Law and Dispute Resolution</h2>
              <div className="color-grey mb-5">
                <p>
                  These ToU and any action related thereto will be governed and
                  interpreted by and under the laws of Panama, without giving
                  effect to the conflicts of law provisions. The parties agree
                  to submit to the courts of Panama for exclusive jurisdiction
                  of any dispute arising out of or related to this ToU or your
                  use of the Application. You waive any objection based on lack
                  of personal jurisdiction, place of residence, improper venue,
                  or forum non conveniens in any such action.
                </p>
              </div>
              <h2 className="mb-4">Miscellaneous</h2>
              <div className="color-grey mb-5">
                <p>
                  <strong>Assignment.</strong> You will not assign or otherwise
                  transfer this ToU or any of your rights and obligations under
                  this ToU, without our prior written consent. Any assignment or
                  transfer in violation of this section will be void. We may
                  assign this ToU without your consent (a) in connection with a
                  merger, acquisition or sale of all or substantially all of our
                  assets, or (b) to any affiliate or as part of a corporate
                  reorganization; and effective upon such assignment, the
                  assignee is deemed substituted for us as a party to this ToU
                  and we are fully released from all of our obligations and
                  duties to perform under this ToU. Subject to the foregoing,
                  this ToU will be binding upon, and inure to the benefit of the
                  parties and their respective permitted successors and assigns.
                </p>
                <p>
                  <strong>Force Majeure.</strong> Neither party nor their
                  respective affiliates will be liable for any delay or failure
                  to perform any obligation under this ToU where the delay or
                  failure results from any cause beyond such party’s reasonable
                  control, including but not limited to acts of God, utilities
                  or other telecommunications failures, cyber attacks,
                  earthquake, storms or other elements of nature, pandemics,
                  blockages, embargoes, riots, acts or orders of government,
                  acts of terrorism, or war.
                </p>
                <p>
                  <strong>Severability.</strong> In the event that any provision
                  of this ToU is unenforceable under applicable law, the
                  validity or enforceability of the remaining provisions will
                  not be affected. To the extent any provision of this ToU is
                  judicially determined to be unenforceable, a court of
                  competent jurisdiction may reform any such provision to make
                  it enforceable. The provisions of this ToU will, where
                  possible, be interpreted so as to sustain its legality and
                  enforceability.
                </p>
                <p>
                  <strong>Independent Contractors.</strong> Nothing in this ToU
                  is intended to, nor shall create any partnership, joint
                  venture, agency, consultancy or trusteeship. We and you are
                  independent contractors for purposes of this ToU.
                </p>
                <p>
                  <strong>Notice.</strong> We may provide any notice to you
                  under this ToU by: (i) posting a notice in the Application; or
                  (ii) sending a message to the email address if it was
                  previously provided by you. To give us notice under this ToU,
                  you must contact us by email at{" "}
                  <a href="mailto:contact@Tegro.Finance">
                    contact@Tegro.Finance
                  </a>
                  .
                </p>
                <p>
                  <strong>Entire Agreement.</strong> This ToU set forth the
                  entire understanding and agreement as to the subject matter
                  hereof and supersedes any and all prior discussions,
                  agreements, and understandings of any kind and every nature
                  between us.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

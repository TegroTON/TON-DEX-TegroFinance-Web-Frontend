import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = { setExpanded: (expanded: boolean) => void };

const LanguageMenu = ({ setExpanded }: Props) => {
  const { t, i18n } = useTranslation();
  const available_languages = Object.keys(i18n.options?.resources || {});

  return (
    <NavDropdown
      title={
        <>
          <i className="fa-light fa-globe fa-lg d-none d-lg-block" />
          <span className="d-inline d-lg-none">{t("languages.language")}</span>
          <i className="fa-solid fa-angle-down small d-block d-lg-none ms-auto ms-lg-2" />
        </>
      }
      id="collapsible-nav-dropdown"
    >
      {available_languages?.map((language_code) => (
        <NavDropdown.Item
          className="d-flex align-items-center"
          key={language_code}
          onClick={() => {
            i18n.changeLanguage(language_code);
            setExpanded(false);
          }}
        >
          <img
            width={22}
            height={16}
            style={{ marginRight: "8px" }}
            src={"/static/assets/images/flags/" + language_code + ".svg"}
            alt={language_code}
          />
          {t(`languages.${language_code}`)}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LanguageMenu;

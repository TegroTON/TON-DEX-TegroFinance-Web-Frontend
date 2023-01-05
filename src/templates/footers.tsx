import {
    ConfirmSwapModal, RemoveLiquidityModal, SettingsModal, TokenModal,
} from './modals';
import { ProcessingModal } from './modals/Processing';
import { ConfirmStakeModal } from './modals/ConfirmStake';

export function DefaultFooter() {
    return (
        <>
            <footer className="footer bg-circle pt-0 pb-5">
                <div className="container">
                    <div className="text-center d-flex flex-column align-items-center mx-auto">
                        <a
                            href="https://t.me/tegro_money"
                            className="copyright-link fw-700 mb-3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            DEX by Tegro
                        </a>
                        <div className="soc-box d-flex align-items-center">
                            <a
                                href="https://www.instagram.com/tegromoney/"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-instagram"
                                />
                            </a>
                            <a
                                href="https://t.me/tegromoney"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-telegram"
                                />
                            </a>
                            <a
                                href="https://vk.com/tegromoney"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-vk"
                                />
                            </a>
                            <a
                                href="https://twitter.com/tegromoney"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-twitter"
                                />
                            </a>
                            <a
                                href="https://www.reddit.com/user/TegroMoney"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-reddit-alien"
                                />
                            </a>
                            <a
                                href="https://medium.com/@tegromoney"
                                target="_blank"
                                className="soc-link px-3 text-muted"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-medium"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/tegromoney/"
                                target="_blank"
                                className="soc-link px-3 text-muted fs-18"
                                rel="noreferrer"
                            >
                                <i
                                    className="fa-brands fa-linkedin-in"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <TokenModal side="Left" />
            <TokenModal side="Right" />
            <RemoveLiquidityModal />
            <ConfirmSwapModal />
            <ConfirmStakeModal />
            <SettingsModal />
            <ProcessingModal />
        </>
    );
}

import { TokenModal } from './modals/Token';
export function DefaultFooter() {
    return (
        <>
            <footer className="footer bg-circle pt-0 pb-5">
                <div className="container">
                    <div className="text-center d-flex flex-column align-items-center mx-auto">
                        <span className="copyright-link fw-700 mb-3">DEX by Tegro</span>
                        <div className="soc-box d-flex align-items-center">
                            <a href="https://www.instagram.com/tegromoney/" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-instagram" />
                            </a>
                            <a href="https://t.me/TegroFinance" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-telegram" />
                            </a>
                            <a href="https://vk.com/tegro" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-vk" />
                            </a>
                            <a href="https://twitter.com/TegroDEX" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-twitter" />
                            </a>
                            <a href="https://www.reddit.com/user/TegroMoney" target="_blank" className="soc-link px-2 px-md-3 px-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-reddit-alien" />
                            </a>
                            <a href="https://medium.com/@tegromoney" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted" rel="noreferrer">
                                <i className="fa-brands fa-medium" />
                            </a>
                            <a href="https://www.linkedin.com/company/tegromoney/" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-linkedin-in" />
                            </a>
                            <a href="https://github.com/TegroTON/" target="_blank" className="soc-link flex-fill px-2 px-md-3 text-muted fs-18" rel="noreferrer">
                                <i className="fa-brands fa-github" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <TokenModal side="Left" />
            <TokenModal side="Right" />
        </>
    );
}
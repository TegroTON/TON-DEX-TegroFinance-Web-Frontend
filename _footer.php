
</div> <!-- End d-flex align-items-center hover rounded-8 p-3er -->
<footer class="footer bg-circle pt-0 pb-5">
   <div class="container">
      <div class="text-center d-flex flex-column align-items-center mx-auto">
         <a href="https://t.me/tegro_money" class="copyright-link fw-700 mb-3" target="_blank" rel="noreferrer">DEX by Tegro</a>
         <div class="soc-box d-flex align-items-center">
            <a href="https://www.instagram.com/tegromoney/" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://t.me/tegro_money" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-telegram"></i></a>
            <a href="https://vk.com/tegro" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-vk"></i></a>
            <a href="https://twitter.com/TegroDEX" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://www.reddit.com/user/TegroMoney" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-reddit-alien"></i></a>
            <a href="https://tegro.medium.com/" target="_blank" class="soc-link px-3 text-muted" rel="noreferrer"><i class="fa-brands fa-medium"></i></a>
            <a href="https://www.linkedin.com/company/tegromoney/" target="_blank" class="soc-link px-3 text-muted fs-18" rel="noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
         </div>
      </div>
   </div>
</footer>
 <!-- Connect Modal -->
      <div class="modal fade" id="ConnectModal" tabindex="-1" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
            <div class="modal-content p-4">
               <div class="modal-header border-0 p-0 mb-5">
                  <h5 class="modal-title fw-bold" id="ConnectModalLabel">Connect a wallet</h5>
                  <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
               </div>
               <div class="modal-body p-0">
                  <a class="d-flex align-items-center hover border rounded-8 mb-3 py-2 px-3" href="liquidity-connect.php">
                     <div>
                        <img src="assets/images/wallets/ton-wallet.png" alt="" class="wc-img" width="48">
                        <span class="ms-3">TON Wallet</span>
                     </div>
                     <div class="ms-auto">
                        <i class="fa-solid fa-angle-right"></i>
                     </div>
                  </a>
                  <a class="d-flex align-items-center hover border rounded-8 mb-3 py-2 px-3" href="connect.php">
                     <div>
                        <img src="assets/images/wallets/tonkeeper.png" alt="" class="wc-img" width="48">
                        <span class="ms-3">Tonkeeper</span>
                     </div>
                     <div class="ms-auto">
                        <i class="fa-solid fa-angle-right"></i>
                     </div>
                  </a>
                  <a class="d-flex align-items-center hover border rounded-8 mb-3 py-2 px-3" href="#!">
                     <div>
                        <img src="assets/images/wallets/tonhub.png" alt="" class="wc-img" width="48">
                        <span class="ms-3">Tonhub</span>
                     </div>
                     <div class="ms-auto">
                        <i class="fa-solid fa-angle-right"></i>
                     </div>
                  </a>
                  <div class="card-alert bg-light color-grey mt-5 p-3 rounded-8 small">
                     By connecting a wallet, you agree to Tegro  Labs’ <a href="terms.php" class="link">Terms of Service</a> and acknowledge that you have read and understand the Tegro  Protocol Disclaimer.
                  </div>
               </div>
            </div>
         </div>
      </div>
<!-- Token Modal -->
<div class="modal fade" id="TokenModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-header border-0 p-0 mb-40">
            <h5 class="modal-title fw-bold" id="ConnectModalLabel">Select a token</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
         </div>
         <div class="modal-body p-0">
            <form action="" class="token-form">
               <div class="input-group flex-nowrap mb-4">
                  <div class="input-group-text text-muted px-3"><i class="fa-solid fa-magnifying-glass fa-lg"></i></div>
                  <input type="search" class="form-control" placeholder="Search name or paste address">
               </div>
               <div class="token-form__btns row mb-4" style="margin: 0 -4px;">
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/Fantom.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">Fantom</span>
                  </button>
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/Glow.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">Glow</span>
                  </button>
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/1inch.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">UNI</span>
                  </button>
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/Tether.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">USD</span>
                  </button>
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/Walletconnect.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">WTC</span>
                  </button>
                  <button type="button" class="col-4 btn btn-outline-light flex-fill px-3 py-2 m-1" style="width: 120px;">
                  <img class="token-form__img" src="./assets/images/token/ApeSwap.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="text-uppercase ms-2 fs-12">Apes</span>
                  </button>
               </div>
               <h4 class="token-form__title fs-16 mb-4">Token Name</h4>
               <div class="token-form__list overflow-auto" style="max-height: 408px;">
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/1inch.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">1EARTH</span>
                  <span class="token-form__name text-muted ms-auto">EarthFund</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/ApeSwap.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">Ape Swap</span>
                  <span class="token-form__name text-muted ms-auto">Aswap</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/Avalanche-AVAX.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">Avalanche avax</span>
                  <span class="token-form__name text-muted ms-auto">Avax</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/Bitcoin.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">18c</span>
                  <span class="token-form__name text-muted ms-auto">Block 18</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/Coinbase.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">CoineBase</span>
                  <span class="token-form__name text-muted ms-auto">Coinbase</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/Dogecoin.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">Doge coin</span>
                  <span class="token-form__name text-muted ms-auto">Doge</span>
                  </a> <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/1inch.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">1EARTH</span>
                  <span class="token-form__name text-muted ms-auto">EarthFund</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/ApeSwap.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">Ape Swap</span>
                  <span class="token-form__name text-muted ms-auto">Aswap</span>
                  </a>
                  <a class="d-flex align-items-center hover rounded-8 p-3" href="#!">
                  <img class="token-form__img" src="./assets/images/token/Avalanche-AVAX.svg" width="24px" height="24px" alt="1EARTH">
                  <span class="token-form__symbol text-uppercase fw-500 ms-3">Avalanche avax</span>
                  <span class="token-form__name text-muted ms-auto">Avax</span>
                  </a>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
<!-- Remove Liquidity Modal -->
<div class="modal fade" id="RemoveLiquidity" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-body text-center p-0">
            <p class="fs-24 mb-5 pb-3">Are you sure you want to delete <span class="d-inline d-md-block">the liquidation?</span></p>
            <div class="d-flex">
               <button type="button" class="btn btn-sm btn-outline-light color-grey me-auto" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
               <button type="button" class="btn btn-sm btn-red"><i class="fa-regular fa-trash-can me-2"></i>Remove Liquidity</button>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- Confirm Offer Modal -->
<div class="modal fade" id="ConfirmOffer" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-header border-0 p-0 mb-40">
            <h5 class="modal-title fw-bold" id="ConnectModalLabel">You get</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
         </div>
         <div class="modal-body p-0">
            <div class="d-flex align-items-center mb-3">
               <img src="/assets/images/ton.png" width="40" height="40" alt="Ton Coin">
               <div class="ms-4">
                  <h4 class="fs-24 fw-700 mb-0">120.00000 TGR</h4>
                  <p class="mb-0 fw-500 text-muted">TON coin / Tegro coin</p>
               </div>
            </div>
            <p class="fs-16 mb-4 text-muted">
               The result is an orinter. If the price changes by more than 0.5%, the transaction will be returned.
            </p>
            <div class="card-alert p-3 bg-light rounded-8 mb-4">
               <ul class="list-unstyled">
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Entered:</span><span class="text-muted">12 TON</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Entered:</span><span class="text-muted">120 TGR</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Course:</span><span class="text-muted">1 TON = 10 TGR</span>
                  </li>
                  <li class="list-item d-flex">
                     <span class="me-auto fw-500">Your share in the pool:</span><span class="text-muted">0.0000049%</span>
                  </li>
               </ul>
            </div>
            <div class="d-flex">
               <button type="button" class="btn btn-sm btn-outline-light me-auto" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
               <button type="button" class="btn btn-sm btn-red"><i class="fa-regular fa-circle-plus me-2"></i>Confirm offer</button>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- Settings Modal -->
<div class="modal fade" id="SettingsModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-header border-0 p-0 mb-40">
            <h5 class="modal-title fw-bold" id="ConnectModalLabel">Settings</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
         </div>
         <div class="modal-body p-0">
            <div class="fs-500 fs-18 text-muted mb-4">
               Slippage tolerance
               <a href="#!" class="text-muted ms-2" data-bs-toggle="tooltip" data-bs-title="Your transaction will revert it the price changes unfavorably by more than this percentage.">
               <i class="fa-regular fa-circle-question color-blue"></i>
               </a>
            </div>
            <div class="row align-items-center">
               <div class="col-6 col-lg-3 mb-2 mb-lg-0">
                  <a href="#!" class="btn btn-primary d-block">0,1%</a>
               </div>
               <div class="col-6 col-lg-3 mb-2 mb-lg-0">
                  <a href="#!" class="btn btn-light d-block">0,5%</a>
               </div>
               <div class="col-6 col-lg-3 mb-2 mb-lg-0">
                  <a href="#!" class="btn btn-light d-block">1%</a>
               </div>
               <div class="col-6 col-lg-3 mb-2 mb-md-0">
                  <div class="input-group" style="height: 50px;">
                     <input type="text" class="form-control" value="0,1" disabled>
                     <span class="input-group-text text-muted" style="height: 50px;"><i class="fa-solid fa-percent"></i></span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- Processing Modal -->
<div class="modal fade" id="ProcessingModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-body text-center py-5">
            <i class="fa-regular fa-server fa-3x mb-4 color-blue"></i>
            <h2 class="card-title fs-24 fw-700 mb-3 position-relative">
               Processing
               <span class="dots ms-1 mt-1">
               <span class="dot-one">.</span><span class="dot-two">.</span><span class="dot-three">.</span>
               </span>
            </h2>
            <p class="text-muted mb-0">Your USTD will be credited to your account <br> after this transaction has been processed.</p>
         </div>
      </div>
   </div>
</div>
<!-- Withdraw Modal -->
<div class="modal fade" id="WithdrawModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered mobile-modal-bottom">
      <div class="modal-content p-4">
         <div class="modal-header border-0 p-0 mb-4">
            <h5 class="modal-title fw-bold" id="ConnectModalLabel">Withdraw</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
         </div>
         <form class="modal-body p-0">
            <div class="input-group mb-3">
               <input type="number" class="form-control" placeholder="0">
               <div class="input-group-text" id="basic-addon1">
                  <button type="button" class="btn btn-sm btn-light">All</button>
               </div>
            </div>
            <div class="text-muted mb-5">Withdrawal fee: <span class="fw-500">0.5 BSW</span></div>
            <div class="d-flex">
               <button type="button" class="btn btn-sm btn-outline-light color-grey me-auto" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
               <button type="button" class="btn btn-sm btn-primary"><i class="fa-regular fa-trash-can me-2"></i>Save</button>
            </div>
         </form>
      </div>
   </div>
</div>

<script charset="UTF-8" src="//web.webpushs.com/js/push/cbb05a201d237186ab2ff280100b2475_1.js" async></script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");

   ym(91906619, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/91906619" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1HY1511EV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L1HY1511EV');
</script>

<script src="/assets/js/jquery-3.6.0.min.js"></script>
<script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<?php if($_SERVER['REQUEST_URI'] == '/symbol-detail.php') { ?>
<script src="/assets/js/chart.js"></script>
<script>
   const ctx = document.getElementById('TokenChart');

   new Chart(ctx, {
     type: 'line',
     data: {
       labels: ["03:00", "", "", "", "", "", "06:00", "", "", "", "", "", "09:00", "", "", "", "", "", "12:00", "", "", "", "", "", "15:00", "", "", "", "", "", "18:00", "", "", "", "", "", "21:00", "", "", "", "", "", "23:00", ""],
       datasets: [{
         label: 'USD',
         data: [2.09, 2.24, 1.58, 1.45, 0.96, 1.98, 2.00, 2.05,1.09, 1.24, 2.58, 2.45, 1.96, 2.98, 2.00, 2.05,2.09, 2.24, 1.58, 1.45, 0.96, 1.98, 2.00, 2.05,2.09, 2.24, 1.58, 1.45, 0.96, 1.98, 2.00, 2.05,2.09, 2.24, 1.58, 1.45, 0.96, 1.98, 2.00, 2.05,2.09, 2.24, 1.58, 1.45],
         borderWidth: 2,
         borderColor: "#1b73f9",
         backgroundColor: "#1b73f9",
       }]
     }
   });
</script>
<?php } ?>
<script type="text/javascript">
   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
   const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

           const btn = document.querySelector(".btn-change-theme");
           const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

           btn.addEventListener("click", function() {
             if (prefersDarkScheme.matches) {
               document.body.classList.toggle("light-theme");
               var theme = document.body.classList.contains("light-theme") ? "light" : "dark";
             } else {
               document.body.classList.toggle("dark-theme");
               var theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
             }
             document.cookie = "theme=" + theme;
           });
</script>

<script>
   $(document).on('click', function (e){
    /* bootstrap collapse js adds "in" class to your collapsible element*/
    var menu_opened = $('#navbarDexContent').hasClass('show');

    if(!$(e.target).closest('#navbarDexContent').length &&
        !$(e.target).is('#navbarDexContent') &&
        menu_opened === true){
            $('#navbarDexContent').collapse('toggle');
    }

});
</script>
</body>
</html>

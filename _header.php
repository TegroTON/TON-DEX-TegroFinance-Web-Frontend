<?php
   $themeClass = '';
   if (!empty($_COOKIE['theme'])) {
     if ($_COOKIE['theme'] == 'dark') {
       $themeClass = 'dark-theme';
     } else if ($_COOKIE['theme'] == 'light') {
       $themeClass = 'light-theme';
     }  
   }
   ?>
<!DOCTYPE html>
<html lang="ru" translate="yes">
   <head>
      <meta charset="UTF-8">
      <title>DEX</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="format-detection" content="telephone=no">
      <meta name="google" content="translate">
      <link rel="icon" href="/assets/images/favicon.svg">
      <meta property="og:title" content="TegroFinance - A next evolution DeFi exchange on The Open Network (TON)" />
      <meta property="og:description" content="Cheaper and faster than any DEX? Discover Tegro Finance, the leading DEX on The Open Network (TON) with the best farms in DeFi and a lottery for TGR." />
      <meta property="og:image" content="https://dex.unerd.online/assets/images/dex-preview.png" />
      <meta property="og:url" content="https://tegro.finance" />
      <meta property="og:site_name" content="Tegro Finance" />
      <meta name="twitter:site" content="Tegro Finance" />
      <meta name="twitter:title" content="TegroFinance - A next evolution DeFi exchange on The Open Network (TON)" />
      <meta name="twitter:description" content="Cheaper and faster than any DEX? Discover Tegro Finance, the leading DEX on The Open Network (TON) with the best farms in DeFi and a lottery for TGR." />
      <meta property="twitter:creator" content="@TegroDEX">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="/assets/libs/bootstrap/css/bootstrap.min.css">
      <link rel="stylesheet" href="/assets/libs/fontawesome/css/all.min.css">
      <link rel="stylesheet" href="/assets/css/style.css?v=<?=time()?>">
   </head>
   <body class="<?php echo $themeClass; ?>">
      <div class="wrapper border-page-right border-page-left">
      <header class="header border-bottom mb-5">
         <nav class="navbar navbar-expand-lg">
            <div class="container-fluid px-auto px-xl-5">
               <a href="/" class="header__logo"><img src="/assets/images/logotype.svg?v=2" alt="" class="header__logo-img"></a>
               <div class="dropdown d-block d-lg-none ms-auto me-4">
                  <?php if($_SERVER['REQUEST_URI'] == '/') { ?>
                  <button type="button" class="btn btn-sm-mobile btn-primary text-nowrap" data-bs-toggle="modal" data-bs-target="#ConnectModal">
                  <i class="fa-solid fa-wallet me-2"></i> Connect Wallet
                  </button>
                  <?php } else { ?>
                  <a class="btn btn-sm-mobile box-blur border text-nowrap d-flex align-items-center" href="#!" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/assets/images/ton.png" width="18" height="18" alt="Ton Coin">
                  <span class="fw-medium ms-2">12874 TGR</span>
                  <i class="fa-solid fa-angle-down ms-3"></i>
                  </a> 
                  <ul class="dropdown-menu bg-second border-0 mr-4 mt-2 shadow rounded">
                     <li>
                        <a class="dropdown-item d-flex align-items-center" href="/">
                           <i class="fa-light fa-copy dropdown-item-icon"></i>
                           <div class="ms-3">
                              Copy address
                              <div class="text-truncate text-muted small" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           </div>
                        </a>
                     </li>
                     <li>
                        <a class="dropdown-item d-flex align-items-center" href="/liquidity.php">
                           <i class="fa-light fa-power-off dropdown-item-icon"></i>
                           <div class="ms-3">
                              Disconnect
                              <div class="text-muted small">Disable your wallet</div>
                           </div>
                        </a>
                     </li>
                  </ul>
                  <?php } ?>
               </div>
               <button class="btn-toogler navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDexContent" aria-controls="navbarDexContent" aria-expanded="false" aria-label="Toggle navigation">
               <span></span>
               <span></span>
               <span></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarDexContent">
                  <div class="d-flex flex-column flex-lg-row w-100">
                     <ul class="navbar-nav align-items-lg-center d-block d-lg-flex align-items-center order-2 order-lg-1">
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="/">
                           Exchange
                           </a>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="/liquidity.php">
                           Liquidity
                           </a>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                           Wallet <i class="fa-solid fa-angle-down small ms-auto ms-lg-2"></i>
                           </a>
                           <ul class="dropdown-menu" data-bs-popper="static">
                              <li>
                                 <a class="dropdown-item d-flex" href="https://tegro.io/wallet.php" target="_blank" title="Web Wallet">
                                    <i class="fa-light fa-wallet dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Web Wallet
                                       <div class="dropdown-item__desc text-muted small">The easiest way to store, send, and receive Toncoin</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://play.google.com/store/apps/details?id=com.tonholdwallet.android" title="Android App" target="_blank">
                                    <i class="fa-brands fa-google-play dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Android App
                                       <div class="text-muted small">Wallet extension for Android</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://chrome.google.com/webstore/detail/cdpdjfhimjdmbakdbabcklagceoikifg" title="Chrome App" target="_blank">
                                    <i class="fa-brands fa-chrome dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Chrome App
                                       <div class="text-muted small">Wallet extension for Chrome browser</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://microsoftedge.microsoft.com/addons/detail/dgegbhgbijbhkmkacomdlogdkacokpam" title="Microsoft Edge" target="_blank">
                                    <i class="fa-brands fa-edge dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Microsoft Edge
                                       <div class="text-muted small">Wallet extension for Edge browser</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                           E-Commerce<i class="fa-solid fa-angle-down small ms-auto ms-lg-2"></i>
                           </a>
                           <ul class="dropdown-menu" data-bs-popper="static">
                              <li>
                                 <a class="dropdown-item d-flex" href="https://tegro.io/commerce.php" target="__blank">
                                    <i class="fa-light fa-money-check-dollar-pen dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Payment system
                                       <div class="text-muted small">Connection of payment systems and banks without commissions.</div>
                                    </div>
                                 </a>
                              </li>
                              <li class="p-3 fs-14 fw-medium text-muted">
                                 For Business
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://tegro.money/referral-program/" target="__blank">
                                    <i class="fa-light fa-handshake dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Affiliate program
                                       <div class="ms-1 u-badge">new</div>
                                       <div class="text-muted small">Invite clients and get percentage of their turnover</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://tegro.money/security/" target="__blank">
                                    <i class="fa-light fa-shield-check dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Security
                                       <div class="text-muted small">About PCI DSS, SSL Security Standards</div>
                                    </div>
                                 </a>
                              </li>
                              <li class="p-3 fs-14 fw-medium text-muted">
                                 Developers
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://tegro.money/docs/en/" target="__blank">
                                    <i class="fa-light fa-book dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       All documentation
                                       <div class="text-muted small">All ways of integration and interaction</div>
                                    </div>
                                 </a>
                                 <ul class="list-style-inside ps-0 ps-lg-4 d-flex">
                                    <li>
                                       <a class="dropdown-item fs-14" href="https://tegro.money/docs/en/begin/register/add-shop/" target="__blank">
                                       Adding a store
                                       </a>
                                    </li>
                                    <li>
                                       <a class="dropdown-item fs-14" href="https://tegro.money/docs/en/sci/create-payment/" target="__blank">
                                       Api Documentation
                                       </a>
                                    </li>
                                 </ul>
                              </li>
                           </ul>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                           NFT <i class="fa-solid fa-angle-down small ms-auto ms-lg-2"></i>
                           </a>
                           <ul class="dropdown-menu" data-bs-popper="static">
                              <li>
                                 <a class="dropdown-item d-flex" href="https://libermall.com/" target="__blank">
                                    <i class="fa-light fa-house dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Libermall
                                       <div class="dropdown-item__desc text-muted small">A new, modern and slick NFT marketplace</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex" href="https://libermall.com/#explore" target="__blank">
                                    <i class="fa-light fa-hexagon-vertical-nft dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Explore Collections
                                       <div class="text-muted small">Catalog of NFT collections</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </li>
                        <li class="nav-item dropdown">
                           <a class="nav-link text-nowrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           More  <i class="fa-solid fa-angle-down small ms-auto ms-lg-2"></i>
                           </a>
                           <div class="dropdown-menu" data-bs-popper="static">
                              <div class="d-flex flex-wrap">
                                 <ul class="list-unstyled w-50 flex-lg-fill">
                                    <li>
                                       <a class="dropdown-item d-flex" href="https://tegro.money/pay/coupons/" target="_blank">
                                          <i class="fa-light fa-badge-percent dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Discounts
                                             <div class="text-muted small">And coupons</div>
                                          </div>
                                       </a>
                                    </li>
                                    <li>
                                       <a class="dropdown-item d-flex" href="https://tegro.money/advantages/" target="_blank">
                                          <i class="fa-light fa-rocket-launch dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Advantages
                                             <div class="text-muted small">Use all the features of the service</div>
                                          </div>
                                       </a>
                                    </li>
                                    <li>
                                       <a class="dropdown-item d-flex" href="/contact.php" target="_blank">
                                          <i class="fa-light fa-code dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Jobs
                                             <div class="text-muted small">Leaders in the provision of services</div>
                                          </div>
                                       </a>
                                    </li>
                                 </ul>
                                 <ul class="list-unstyled w-50 flex-lg-fill">
                                    <li>
                                       <a class="dropdown-item d-flex" href="/privacy.php" target="_blank">
                                          <i class="fa-light fa-file-contract dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Privacy policy
                                             <div class="text-muted small">Last updated October 5, 2021.</div>
                                          </div>
                                       </a>
                                    </li>
                                    <li>
                                       <a class="dropdown-item d-flex" href="/terms.php" target="_blank">
                                          <i class="fa-light fa-file-contract dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Terms of use
                                             <div class="text-muted small">Last updated October 18, 2022.</div>
                                          </div>
                                       </a>
                                    </li>
                                    <li>
                                       <a class="dropdown-item d-flex" href="https://tegro.money/contacts/" target="_blank">
                                          <i class="fa-light fa-envelope-open-text dropdown-item-icon"></i>
                                          <div class="ms-3">
                                             Contact Us
                                             <div class="text-muted small">Write to us</div>
                                          </div>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </li>
                     </ul>
                     <ul class="navbar-nav align-items-lg-center d-block d-lg-flex align-items-center ms-auto order-1 order-lg-2">
                        <li class="nav-item dropdown ms-0 ms-lg-auto">
                           <form action="" class="header-search">
                              <div class="input-group" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 <div class="input-group-text"><i class="fa-regular fa-magnifying-glass"></i></div>
                                 <input type="search" class="form-control" placeholder="Search Tokens" style="min-height: 44px">
                              </div>
                              <ul class="dropdown-menu">
                                 <li>
                                    <a class="dropdown-item px-2 px-lg-4 py-2 " href="/symbol-detail.php">
                                       <div class="d-flex align-items-center">
                                          <img src="/assets/images/ton.png" width="32" height="32" alt="Ton Coin">
                                          <div class="ms-3">
                                             <span class="d-block fw-500">TON Coin</span>
                                             <span class="d-block color-grey small">TON</span>
                                          </div>
                                          <div class="ms-auto text-end">
                                             <div class="fw-500">
                                                $2.09 USD
                                             </div>
                                             <div class="fw-500 color-green small mt-1">
                                                <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                                                <i class="fa-solid fa-caret-up me-1"></i>  0.63%
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </a>
                                 </li>
                                 <li>
                                    <a class="dropdown-item px-2 px-lg-4 py-2 " href="#">
                                       <div class="d-flex align-items-center">
                                          <img src="/assets/images/token/eth.svg" width="32" height="32" alt="Ton Coin">
                                          <div class="ms-3">
                                             <span class="d-block fw-500">Ether</span>
                                             <span class="d-block color-grey small">ETH</span>
                                          </div>
                                          <div class="ms-auto text-end">
                                             <div class="fw-500">
                                                $1522.09 USD
                                             </div>
                                             <div class="fw-500 color-green small mt-1">
                                                <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                                                <i class="fa-solid fa-caret-up me-1"></i>  2.34%
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </a>
                                 </li>
                                 <li>
                                    <a class="dropdown-item px-2 px-lg-4 py-2 " href="#">
                                       <div class="d-flex align-items-center">
                                          <img src="/assets/images/token/BNB.svg" width="32" height="32" alt="Ton Coin">
                                          <div class="ms-3">
                                             <span class="d-block fw-500">Binance Coin</span>
                                             <span class="d-block color-grey small">BNB</span>
                                          </div>
                                          <div class="ms-auto text-end">
                                             <div class="fw-500">
                                                $12.09 USD
                                             </div>
                                             <div class="fw-500 color-green small mt-1">
                                                <span class="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                                                <i class="fa-solid fa-caret-down me-1"></i>  2.02%
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </a>
                                 </li>
                                 <li>
                                    <a class="dropdown-item px-2 px-lg-4 py-2 " href="#">
                                       <div class="d-flex align-items-center">
                                          <img src="/assets/images/token/Tether.svg" width="32" height="32" alt="Ton Coin">
                                          <div class="ms-3">
                                             <span class="d-block fw-500">Tether</span>
                                             <span class="d-block color-grey small">USDT</span>
                                          </div>
                                          <div class="ms-auto text-end">
                                             <div class="fw-500">
                                                $1.00 USD
                                             </div>
                                             <div class="fw-500 color-green small mt-1">
                                                <span class="color-grey" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                                                0.00%
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </a>
                                 </li>
                              </ul>
                           </form>
                        </li>
                     </ul>
                     <ul class="navbar-nav align-items-lg-center d-block d-lg-flex align-items-center border-top-mobile order-3 ms-0 ms-lg-2">
                        <li class="nav-item dropdown">
                           <a href="#" class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <i class="fa-light fa-globe fa-lg d-none d-lg-block"></i>
                           <span class="d-inline d-lg-none">Language</span>
                           <i class="fa-solid fa-angle-down small d-block d-lg-none ms-auto ms-lg-2"></i>
                           </a>
                           <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <li>
                                 <a class="dropdown-item d-flex align-items-center active" href="#">
                                 <img class="me-2" src="/assets/images/usa.svg" alt="">
                                 English
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex align-items-center" href="#">
                                 <img class="me-2" src="/assets/images/spain.svg" alt="">
                                 Spanish
                                 </a>
                              </li>
                           </ul>
                        </li>
                        <li class="nav-item me-0 me-lg-2">
                           <a href="#!" class="nav-link btn-change-theme">
                              <div class="dark-mode-icon w-100">
                                 <div class="d-flex align-items-center w-100">
                                    <span class="d-inline d-lg-none me-auto">Dark Mode</span>
                                    <i class="fa-solid fa-moon fs-18" style="transform: rotate(210deg); margin-top: 2px"></i>
                                 </div>
                              </div>
                              <div class="light-mode-icon w-100">
                                 <div class="d-flex align-items-center w-100">
                                    <span class="d-inline d-lg-none me-auto">Light Mode</span>
                                    <i class="fa-solid fa-sun-bright fs-18"></i>
                                 </div>
                              </div>
                           </a>
                        </li>
                        <li class="nav-item mx-2 mx-lg-0 mt-4 mt-lg-0 dropdown d-none d-lg-block">
                           <?php if($_SERVER['REQUEST_URI'] == '/') { ?>
                           <button type="button" class="btn btn-sm btn-primary text-nowrap w-100" data-bs-toggle="modal" data-bs-target="#ConnectModal">
                           <i class="fa-solid fa-wallet me-2"></i> Connect <span class="d-inline d-lg-none d-xl-inline">Wallet</span>
                           </button>
                           <?php } else { ?>
                           <a class="nav-link box-blur border rounded-8 text-nowrap" href="#!" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                           <img src="/assets/images/ton.png" width="18" height="18" alt="Ton Coin">
                           <span class="fw-medium ms-2">12874 TGR</span>
                           <i class="fa-solid fa-angle-down ms-3"></i>
                           </a> 
                           <ul class="dropdown-menu end-0 me-3">
                              <li>
                                 <a class="dropdown-item d-flex align-items-center" href="/">
                                    <i class="fa-light fa-copy dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Copy address
                                       <div class="text-truncate text-muted small" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a class="dropdown-item d-flex align-items-center" href="/liquidity.php">
                                    <i class="fa-light fa-power-off dropdown-item-icon"></i>
                                    <div class="ms-3">
                                       Disconnect
                                       <div class="text-muted small">Disable your wallet</div>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                           <?php } ?>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      </header>
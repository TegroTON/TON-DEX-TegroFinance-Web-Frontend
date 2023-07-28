<?php
   require "_header.php";
   ?>
<div class="container">
   <div class="row">
      <div class="col-lg-7 col-xl-5 mx-auto">
         <ul class="nav nav-pills content-nav-pills mb-5 d-flex d-lg-none">
            <li class="nav-item flex-fill">
               <a class="nav-link btn active" aria-current="page" href="/">Exchange</a>
            </li>
            <li class="nav-item flex-fill">
               <a class="nav-link btn" href="/liquidity.php">Liquidity</a>
            </li>
         </ul>
         <div class="card">
            <div class="d-flex align-items-center mb-4">
               <h2 class="card-title fs-24 fw-700 me-auto">Swap</h2>
               <a href="#!" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i class="fa-regular fa-gear fa-lg"></i></a>
            </div>
            <form action="">
               <!-- input -->
               <div class="mb-4">
                  <div class="d-flex justify-content-between mb-2 px-1">
                     <label>You pay:</label>
                     <span class="small fw-500 color-grey">Balance: 245.000 TON</span>
                  </div>
                  <div class="input-group">
                     <input type="number" class="form-control fw-500 fs-18 px-3" placeholder="0">
                     <div class="input-group-text p-1">
                        <a class="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2" style="min-width: 124px" href="#!" data-bs-toggle="modal" data-bs-target="#TokenModal">
                        <img src="/assets/images/ton.png" width="24" height="24" alt="Ton Coin">
                        <span class="mx-3 fw-500 text-uppercase">Ton</span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                     </div>
                  </div>
               </div>
               <!-- input -->
               <div class="mb-4">
                  <div class="d-flex justify-content-between mb-2 px-1">
                     <label>You receive:</label>
                     <span class="small fw-500 color-grey">Balance: 1485.000 TGR</span>
                  </div>
                  <div class="input-group">
                     <input type="number" class="form-control fw-500 fs-18 px-3" placeholder="0" disabled>
                     <div class="input-group-text p-1">
                        <a class="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2" style="min-width: 124px" href="#!" data-bs-toggle="modal" data-bs-target="#TokenModal">
                        <img src="/assets/images/tgr.png" width="24" height="24" alt="Tegro Coin">
                        <span class="mx-3 fw-500 text-uppercase">Tgr</span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                     </div>
                  </div>
               </div>
               <ul class="list-unstyled bg-light p-3 rounded-8 mb-4">
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Price:</span>
                     <span class="text-muted">1 TON per 10 TGR</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Slippage Tolarance:</span>
                     <span class="text-muted">3%</span>
                  </li>
                  <li class="list-item d-flex">
                     <span class="me-auto fw-500">Slippage Tolarance:</span>
                     <span class="text-muted">0.3%</span>
                  </li>
               </ul>
               <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#ConnectModal">
               <i class="fa-solid fa-wallet me-2"></i> Connect Wallet
               </button>
            </form>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
   ?>
<?php
   require "_header.php";
   ?>
<div class="container">
   <div class="row">
      <div class="col-lg-7 col-xl-5 mx-auto">
          <ul class="nav nav-pills content-nav-pills mb-5 d-flex d-lg-none">
            <li class="nav-item flex-fill">
               <a class="nav-link btn" aria-current="page" href="/">Exchange</a>
            </li>
            <li class="nav-item flex-fill">
               <a class="nav-link btn active" href="/liquidity.php">Liquidity</a>
            </li>
         </ul>
         <div class="card">
            <form action="">
               <div class="d-flex align-items-center mb-4">
                  <h2 class="card-title fs-24 fw-700 me-auto">
                     <a href="/liquidity-connect.php" class="me-3"><i class="fa-regular fa-arrow-left"></i></a>
                     Add Liquidity
                  </h2>
                  <a href="#!" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i class="fa-regular fa-gear fa-lg"></i></a>
               </div>
               <!-- input --> 
               <div class="d-flex justify-content-between mb-3 px-2">
                  <label for="">You pay:</label>
                  <div class="fw-500 color-grey">Balance: <span>245.000 TON</span></div>
               </div>
               <div class="input-group mb-4">
                  <input type="number" class="form-control fw-500 fs-18 px-3" placeholder="0">
                  <div class="input-group-text p-1">
                     <a class="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2" style="min-width: 124px" href="#!" data-bs-toggle="modal" data-bs-target="#TokenModal">
                     <img src="/assets/images/ton.png" width="24" height="24" alt="Ton Coin"> 
                     <span class="mx-3 fw-500 text-uppercase">Ton</span>
                     <i class="fa-solid fa-ellipsis-vertical"></i>
                     </a>
                  </div>
               </div>
               <!-- input --> 
               <div class="d-flex justify-content-between mb-3 px-2">
                  <label for="">You receive:</label>
                  <div class="fw-500 color-grey">Balance: <span>1485.000 TGR</span></div>
               </div>
               <div class="input-group mb-4">
                  <input type="number" class="form-control fw-500 fs-18 px-3" placeholder="0">
                  <div class="input-group-text p-1">
                     <a class="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2" style="min-width: 124px" href="#!" data-bs-toggle="modal" data-bs-target="#TokenModal">
                     <img src="/assets/images/tgr.png" width="24" height="24" alt="Tegro Coin"> 
                     <span class="mx-3 fw-500 text-uppercase">Tgr</span>
                     <i class="fa-solid fa-ellipsis-vertical"></i>
                     </a>
                  </div>
               </div>
               <div class="d-flex align-items-center mb-4 px-2">
                  <span class="me-auto fw-500 color-blue">BTCB per ALPACA</span><span class="fw-500 color-red">0.11%</span>
               </div>
               <ul class="list-unstyled bg-light rounded-8 p-3 m-0">
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">BTCB per ALPACA</span><span class="text-muted">0.0000107444</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">ALPACA per BTCB</span><span class="text-muted">93071.5</span>
                  </li>
                  <li class="list-item d-flex">
                     <span class="me-auto fw-500">Share of Pool</span><span class="text-muted">0%</span>
                  </li>
               </ul>
               <div class="mt-4">
                  <button type="button" class="btn btn-red w-100" data-bs-toggle="modal" data-bs-target="#ConfirmOffer">
                  <i class="fa-regular fa-money-bill-transfer me-3"></i>Suggest
                  </button>
                  <!--button type="button" id="bim-button" class="btn btn-outline-red w-100 disabled">Enter an amount</button-->
               </div>
            </form>
         </div>
         <div class="alert alert-dismissible bg-light rounded shadow border-0 fade show mt-40 p-4" role="alert">
            <div class="d-flex">
               <i class="fa-regular fa-circle-info fa-2x color-red mt-1"></i>
               <p class="ms-3 mb-0 pe-3 text-muted">
                  By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing 
                  your liquidity.
               </p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
   ?>
<?php
   require "_header.php";
   ?>
<div class="container">
   <div class="row">
      <div class="col-lg-5 col-xl-4 order-2 order-lg-1 mt-4 mt-lg-0">
         <div class="card h-100">
            <div class="sticky-top" style="top: 116px">
               <div class="d-flex align-items-center mb-4">
                  <h2 class="card-title fs-24 fw-700 me-auto">Swap</h2>
                  <a href="#!" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i class="fa-regular fa-gear fa-lg"></i></a>
               </div>
               <form action="">
                  <div class="position-relative">
                     <!-- input --> 
                     <div class="d-flex justify-content-between mb-3 px-2">
                        <label for="">You pay:</label>
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
                  </div>
                  <div class="text-center mt-40">
                     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ConnectModal">Review Swap</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
      <div class="col-lg-7 col-xl-8 order-1 order-lg-2">
         <div class="card mb-4">
            <div class="d-block d-lg-flex align-items-center mb-4">
               <div class="d-flex me-auto">
                  <img src="/assets/images/token/eth.svg" width="40" height="40" alt="Ton Coin">
                  <div class="ms-3">
                     <span class="d-block fs-18 fw-500">Ethereum</span>
                     <span class="d-block color-grey small">ETH</span>
                  </div>
               </div>
               <div class="btn-group border rounded-8 mt-3 mt-lg-0" role="group" aria-label="Button group with nested dropdown">
                  <button type="button" class="btn btn-sm btn-light fs-12 active">1D</button>
                  <button type="button" class="btn btn-sm btn-light fs-12">7D</button>
                  <button type="button" class="btn btn-sm btn-light fs-12">1M</button>
                  <button type="button" class="btn btn-sm btn-light fs-12">3M</button>
                  <button type="button" class="btn btn-sm btn-light fs-12">1Y</button>
               </div>
            </div>
            <canvas id="TokenChart" style="height: 340px"></canvas>
         </div>
         <div class="card">
            <h2 class="fs-24 fw-700 mb-2">About</h2>
            <p class="fw-500 fs-16 color-grey">ETH (Ethereum)</p>
            <p>
               Ethereum (ETH) is an open-source, public, blockchain-based distributed computing platform featuring smart contract (scripting) functionality, which facilitates online contractual agreements.  
            </p>
            <p>
               Ethereum also provides a cryptocurrency token called "ether", which can be transferred between accounts and used to compensate participant nodes for computations performed. "Gas", an internal transaction pricing mechanism, is used to mitigate spamand allocate resources on the network.The value token of the Ethereum blockchain is called ether.
            </p>
            <p>
               It is listed under the diminutive ETH and traded on cryptocurrency exchanges. It is also used to pay for transaction fees and computational services on the Ethereum network.
            </p>
            <div class="bg-light p-4 rounded-8">
               <ul class="list-unstyled mb-0">
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Issue Time</span>
                     <span class="text-muted">2014-07-23</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Total Supply</span>
                     <span class="text-muted">109,542,949</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Circulation</span>
                     <span class="text-muted">109,542,949</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">White paper</span>
                     <span class="text-muted">https://github.com/ethereum/wiki/wiki/White-Paper</span>
                  </li>
                  <li class="list-item d-flex mb-3">
                     <span class="me-auto fw-500">Website</span>
                     <span class="text-muted">https://www.ethereum.org/</span>
                  </li>
                  <li class="list-item d-flex">
                     <span class="me-auto fw-500">Block Explorer</span>
                     <span class="text-muted">https://www.yitaifang.com/</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
   ?>
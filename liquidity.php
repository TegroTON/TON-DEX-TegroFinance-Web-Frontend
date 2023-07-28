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
         <div class="card rounded shadow border-0">
            <form action="">
               <div class="d-flex mb-40">
                  <div>
                     <h2 class="card-title fs-24 fw-700 me-auto mb-2">Your Liquidity</h2>
                     <p class="mb-0 text-muted">Remove liquidity to receive tokens back</p>
                  </div>
                  <a href="#!" class="ms-auto" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i class="fa-regular fa-gear fa-lg"></i></a>
               </div>
               <div class="bg-light text-center rounded-8 p-5">
                  <i class="fa-regular fa-cloud-arrow-down fa-4x mb-4 color-blue"></i>
                  <p class="text-muted fs-16 mb-0">Your active V3 liquidity positions <br> will appear here.</p>
               </div>
               <div class="mt-4">
               <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#ConnectModal">
               <i class="fa-solid fa-wallet me-2"></i> Connect Wallet
               </button>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
   ?>
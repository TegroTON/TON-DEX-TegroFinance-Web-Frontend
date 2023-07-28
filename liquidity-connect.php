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
            <div class="d-flex mb-4">
               <div>
                  <h2 class="card-title fs-24 fw-700 me-auto mb-2">Your Liquidity</h2>
                  <p class="mb-0 text-muted">Remove liquidity to receive tokens back</p>
               </div>
               <a href="#!" class="ms-auto" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i class="fa-regular fa-gear fa-lg"></i></a>
            </div>
            <?php
               require "_accordion.php";
             ?>
            <div class="mt-4">
               <a href="/add-liq.php" class="btn btn-red w-100"><i class="fa-regular fa-money-bill-transfer me-3"></i>Add Liquidity</a>
            </div>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
   ?>
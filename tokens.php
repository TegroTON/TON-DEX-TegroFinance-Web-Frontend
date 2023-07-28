<?php
   require "_header.php";
   ?>
<div class="container">
   <div class="row">
      <div class="col-lg-12 mx-auto">
         <div class="card p-0"> 
         <div class="d-block d-md-flex align-items-center box-blur px-4 py-3 border-bottom ">
            <h1 class="fs-20 me-auto m-0">Tokens</h1>
            <form action="" class="ms-auto mt-3 mt-md-0">
               <div class="input-group">
                  <input type="search" class="form-control" placeholder="Filter Tokens" style="min-height: 46px">
                  <button class="input-group-text border-0"><i class="fa-regular fa-magnifying-glass"></i></button>
               </div>
            </form>
         </div>
            <table class="table table-tokens">
               <thead class="sticky-top" style="top: 79px">
                  <tr class="text-end">
                     <th scope="col" class="text-start">Name</th>
                     <th scope="col">Price</th>
                      <th scope="col">Net Position</th>
                     <th scope="col">Volume($)</th>
                  </tr>
               </thead>
               <tbody>
                  <!--tr class="text-center">
                     <td colspan="4" class="py-5">
                        <div class="d-inline bg-soft-red color-red rounded-8 px-4 py-3">
                           No tokens found
                        </div>
                     </td>
                  </tr-->
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/BTC.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">BTC</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$16513.7</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           $2.09 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-up me-1"></i>  0.63%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$44,603,824</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 34,643.54
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/eth.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">ETH</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$1218.1</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           -220.62 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-down me-1"></i> -4.92%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$44,603,824</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 34,643.54
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/10000SHIB.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">10000SHIB</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$0.09242</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           127,724.00 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-up me-1"></i>  0.21%	
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$2,605,852</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 11,804.25
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/NEAR.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">NEAR</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$1.615</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           $277.26 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-grey" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             0.00%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$2,862,348</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 447.77
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/AVAX.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">AVAX</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$12.640</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           - 3,696.03 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-down me-1"></i>  -0.85%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$1,702,979</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: -46,717.82
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/BTC.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">BTC</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$16513.7</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           $2.09 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-up me-1"></i>  0.63%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$44,603,824</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 34,643.54
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/eth.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">ETH</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$1218.1</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           -220.62 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-down me-1"></i> -4.92%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$44,603,824</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 34,643.54
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/10000SHIB.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">10000SHIB</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$0.09242</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           127,724.00 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-green" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-up me-1"></i>  0.21%	
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$2,605,852</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 11,804.25
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/NEAR.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">NEAR</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$1.615</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           $277.26 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-grey" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             0.00%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$2,862,348</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: 447.77
                           </span>
                        </div>
                     </td>
                  </tr>
                  <tr class="text-end">
                     <th scope="row">
                        <div class="d-flex align-items-center">
                           <img src="/assets/images/token/AVAX.svg" width="24" height="24" alt="Tegro Coin">
                           <a href="/symbol-detail.php" class="fw-700 ms-3">AVAX</a>
                        </div>
                     </th>
                     <td>
                        <div class="fw-500">$12.640</div>
                        <div class="color-grey fw-500 small">USD</div>
                     </td>
                     <td>
                        <div class="fw-500">
                           - 3,696.03 USD
                        </div>
                        <div class="fw-500 color-green small mt-1">
                           <span class="color-red" data-bs-toggle="tooltip" data-bs-title="Net Position Ratio">
                             <i class="fa-solid fa-caret-down me-1"></i>  -0.85%
                           </span>
                        </div>
                     </td>
                     <td>
                        <div class="fw-bold">$1,702,979</div>
                        <div class="color-grey fw-500 small mt-1">
                           <span data-bs-toggle="tooltip" data-bs-title="Net Position Value ($)">
                              NP: -46,717.82
                           </span>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
            <div class="text-center p-5">
               <div class="d-inline bg-light px-4 py-3 rounded-8">
                  <i class="fa-solid fa-circle-notch fa-spin me-2"></i> Loading
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<?php
   require "_footer.php";
?>
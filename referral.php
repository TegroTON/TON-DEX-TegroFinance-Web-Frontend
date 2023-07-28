<?php
   require "_header.php";
   ?>
<section class="section hero py-4 py-md-5 border-bottom">
   <div class="container py-5">
      <div class="row align-items-center">
         <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="fw-900 fs-40 mb-3"> 
               Invite your friends.
               <span class="d-block">Earn cryptocurrency together</span>
            </h1>
            <p class="fs-18 mb-4">
               Earn up to <span class="fw-500 color-grey">20%</span> from friends’ swap commission on Biswap
               <br> and <span class="fw-500 color-grey">5%</span> from their earnings on Farms &amp; Launchpools
            </p>
            <a href="#!" class="btn btn-sm btn-outline-primary">Read More <i class="fa-solid fa-angle-right ms-2"></i></a>
         </div>
         <div class="col-lg-5 ms-auto">
            <div class="card box-blur">
               <h2 class="card-title fs-20 mb-4">My Referral Link</h2>
               <div class="d-flex align-items-center mb-3">
                  <div class="input-group">
                     <input type="text" class="form-control fs-14" value="https://dex.io/?ref=6e02054c95b51f663878" disabled />
                     <button type="button" class="input-group-text btn-clipboard  px-4"><i class="fa-regular fa-copy fa-lg"></i></button>
                  </div>
                  <button class="btn btn-light ms-2 px-3"><i class="fa-regular fa-share-nodes fa-lg"></i></button>
               </div>
               <div class="row">
                  <div class="col-12 col-sm-8 mb-2 mb-sm-0">
                     <div class="d-flex align-items-center border rounded-8 py-2 py-sm-3">
                        <div class="px-2 px-sm-3 border-end">
                           <div class="fs-12 fw-500 mb-2 text-nowrap">You will get</div>
                           <div class="fs-24 fw-700 color-blue">100%</div>
                        </div>
                        <ul class="list-unstyled small fw-500 m-0 px-2 px-sm-3 w-100">
                           <li class="d-flex mb-1">Swaps <span class="text-muted ms-auto">10%</span></li>
                           <li class="d-flex mb-1">Farms <span class="text-muted ms-auto">5%</span></li>
                           <li class="d-flex">Launchpools <span class="text-muted ms-auto">5%</span></li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-12 col-sm-4">
                     <div class="border rounded-8 p-2 p-sm-3">
                        <div class="fs-12 fw-500 mb-2">Friends will get</div>
                        <div class="fs-24 fw-700 color-blue">0%</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="section__blur rellax" data-rellax-speed="-6" data-rellax-percentage="0.5">
      <div class="blur__circle-1"></div>
      <div class="blur__circle-2"></div>
   </div>
</section>
<section class="section hero">
   <div class="container">
      <div class="row mb-5">
         <div class="col-md-6 col-lg mb-3 mb-lg-0">
            <div class="card p-4">
               <div class="d-flex align-items-center mb-4">
                  <div class="me-auto">
                     <h4 class="fs-16 fw-500 text-muted mb-3">Farms Referral</h4>
                     <p class="fs-24 fw-700 mb-0">0.0000 TGR</p>
                  </div>
                  <i class="fa-duotone fa-money-bill-wheat card-item-icon bg-soft-red"></i>
               </div>
               <div class="btn-group">
                  <a href="" class="btn btn-sm btn-red w-50 me-1" data-bs-toggle="modal" data-bs-target="#WithdrawModal">Withdraw</a>
                  <a href="" class="btn btn-sm btn-outline-red w-50 ms-1"><i class="fa-regular fa-clock-rotate-left me-2"></i>History</a>
               </div>
            </div>
         </div>
         <div class="col-md-6 col-lg mb-3 mb-lg-0">
            <div class="card p-4">
               <div class="d-flex align-items-center mb-4">
                  <div class="me-auto">
                     <h4 class="fs-16 fw-500 text-muted mb-3">Launchpools Referral</h4>
                     <p class="fs-24 fw-700 mb-0">0.0000 TGR</p>
                  </div>
                  <i class="fa-duotone fa-square-poll-horizontal card-item-icon bg-soft-purple"></i>
               </div>
               <div class="btn-group">
                  <a href="" class="btn btn-sm btn-purple w-50 me-1">Withdraw</a>
                  <a href="" class="btn btn-sm btn-outline-purple w-50 ms-1"><i class="fa-regular fa-clock-rotate-left me-2"></i>History</a>
               </div>
            </div>
         </div>
         <div class="col-md-6 col-lg mb-3 mb-lg-0">
            <div class="card p-4">
               <div class="d-flex align-items-center mb-4">
                  <div class="me-auto">
                     <h4 class="fs-16 fw-500 text-muted mb-3">Swaps Referral</h4>
                     <p class="fs-24 fw-700 mb-0">0.0000 TGR</p>
                  </div>
                  <i class="fa-duotone fa-arrow-up-arrow-down card-item-icon bg-soft-green"></i>
               </div>
               <div class="btn-group">
                  <a href="" class="btn btn-sm btn-green w-50 me-1">Withdraw</a>
                  <a href="" class="btn btn-sm btn-outline-green w-50 ms-1"><i class="fa-regular fa-clock-rotate-left me-2"></i>History</a>
               </div>
            </div>
         </div>
      </div>
      <ul class="nav nav-pills box-blur border w-100 mb-4">
         <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Referral list</a>
         </li>
         <li class="nav-item">
            <a class="nav-link" href="#">Swaps</a>
         </li>
         <li class="nav-item">
            <a class="nav-link" href="#">Farms</a>
         </li>
         <li class="nav-item">
            <a class="nav-link" href="#">Launchpools</a>
         </li>
      </ul>
      <div class="card p-4 mb-4">
         <h2 class="card-title fs-20 fw-700 mb-4">Dashboard</h2>
         <div class="row">
            <div class="col-md-6 col-xl mb-4 mb-xl-0">
               <div class="bg-light border rounded-8 p-4">
                  <div class="d-flex align-items-center mb-4">
                     <i class="fa-duotone fa-users dropdown-item-icon rounded-circle fs-20" style="width: 48px; height: 48px; line-height: 48px;"></i>
                     <div class="ms-3">
                        <h4 class="fs-12 fw-500 text-muted mb-1">Active Friends / Total Friends</h4>
                        <p class="fs-20 fw-700 mb-0">0 / 0</p>
                     </div>
                  </div>
                  <div class="d-flex align-items-center">
                     <img src="/assets/images/favicon.svg" alt="" width="48" height="48">
                     <div class="ms-3">
                        <h4 class="fs-12 fw-500 text-muted mb-1">Total earned</h4>
                        <p class="fs-20 fw-700 mb-0">0.0000 TGR</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-6 col-xl mb-4 mb-xl-0">
               <div class="border rounded-8 p-4">
                  <div class="mb-4">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Swap friends</h4>
                     <p class="fs-20 fw-700 mb-0">0</p>
                  </div>
                  <div class="mb-0">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Swap earned</h4>
                     <p class="fs-20 fw-700 mb-0">0.0000 TGR</p>
                  </div>
               </div>
            </div>
            <div class="col-md-6 col-xl mb-4 mb-xl-0">
               <div class="border rounded-8 p-4">
                  <div class="mb-4">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Farms friends</h4>
                     <p class="fs-20 fw-700 mb-0">0</p>
                  </div>
                  <div class="mb-0">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Farms earned</h4>
                     <p class="fs-20 fw-700 mb-0">0.0000 TGR</p>
                  </div>
               </div>
            </div>
            <div class="col-md-6 col-xl mb-4 mb-xl-0">
               <div class="border rounded-8 p-4">
                  <div class="mb-4">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Launchpool friends</h4>
                     <p class="fs-20 fw-700 mb-0">0</p>
                  </div>
                  <div class="mb-0">
                     <h4 class="fs-12 fw-500 text-muted mb-1">Total Launchpool earned</h4>
                     <p class="fs-20 fw-700 mb-0">0.0000 TGR</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="card p-0">
         <div class="d-block d-md-flex align-items-center box-blur px-4 py-3 border-bottom ">
            <h1 class="fs-20 me-auto m-0">Referral List</h1>
            <form action="" class="ms-auto mt-3 mt-md-0">
               <div class="input-group">
                  <input type="search" class="form-control" placeholder="Search wallet / ref.link..." style="min-height: 46px">
                  <button class="input-group-text border-0"><i class="fa-regular fa-magnifying-glass"></i></button>
               </div>
            </form>
         </div>
         <table class="table table-tokens">
            <thead class="sticky-top" style="top: 79px">
               <tr class="text-end">
                  <th scope="col" class="text-start">Wallet Address</th>
                  <th scope="col">Farms Liquidity</th>
                  <th scope="col">Stacked in Launchpools</th>
                  <th scope="col">Total Earned</th>
               </tr>
            </thead>
            <tbody>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
               </tr>
               <tr class="text-end">
                  <th scope="row" class="text-start">
                     <div class="d-flex align-items-center">
                        <i class="fa-regular fa-wallet dropdown-item-icon"></i>
                        <div class="ms-3">
                           <div class="fw-500 text-truncate" style="max-width: 150px">mtTCazo8VEyTZLqAbD7q9D1U8zwhsouyV5</div>
                           <div class="small text-muted fw-500 mt-1">Date: 07/03/22, 5:24:08 PM</div>
                        </div>
                     </div>
                  </th>
                  <td>
                     <div class="fw-500">$0.00</div>
                     <div class="color-grey fw-500 small mt-1">USD</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
                  </td>
                  <td>
                     <div class="fw-500">
                        0.0000 TGR
                     </div>
                     <div class="color-grey fw-500 small mt-1">$0.00</div>
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
</section>
<section class="section py-5">
   <div class="container">
      <h2 class="fs-24 fw-700 mb-5">FAQ</h2>
      <div class="row accordion" id="accordionReferal">
         <div class="col-lg-6 mb-3">
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
               <a href="#!" class="d-flex align-items-start">
               <span>Where do I get my referral link?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse1" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Connect a wallet and find your referral link in the Referral section.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
               <a href="#!" class="d-flex align-items-start">
               <span>How do I invite a referral friend?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse2" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Invite your friends to register via your referral link.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
               <a href="#!" class="d-flex align-items-start">
               <span>Are there separate balances for referral rewards from friends' Swaps, Farms, Launchpools?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse3" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Yes, there are three separate balances for the referral rewards.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
               <a href="#!" class="d-flex align-items-start">
               <span>How do I generate a new referral link?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse4" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Find 'My Referral Link' block and click on the 'plus' button near the link field. Choose the profit share for your friends and click generate a referral link.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
               <a href="#!" class="d-flex align-items-start">
               <span>How does profit sharing work?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse5" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Profit sharing allows you to share a portion of referral rewards with your invited friends. The percentage can be: 0%, 10% 25%, 50%
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
               <a href="#!" class="d-flex align-items-start">
               <span>Where are all my generated referral links?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse6" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  View all of your generated links on the 'Referral Links' section of the Referral page.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
               <a href="#!" class="d-flex align-items-start">
               <span>In what crypto currency the referral commission is accounted to my referral balance?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse7" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  The referral rewards are accounted in TGR tokens only.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
               <a href="#!" class="d-flex align-items-start">
               <span>Are there fees for referral rewards withdrawal from referral balances?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse8" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Once you withdraw from your referral balances, a BSC network fee of approximately 0.5 TGR will be charged.
               </div>
            </div>
         </div>
         <div class="col-lg-6">
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
               <a href="#!" class="d-flex align-items-start">
               <span>How much crypto can I earn via the Swap Referral Program?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse9" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  You can earn from 10% to 20% in TGR right after your friends have made a swap. The percentage depends on the amount of staked TGR tokens in TGR Holder Pool:
                  <ul class="list-unstyled mt-3">
                     <li class="mb-2">0 TGR Staked = 10% Reff Bonus</li>
                     <li class="mb-2">200 TGR Staked = 12% Reff Bonus</li>
                     <li class="mb-2">1 000 TGR Staked = 14% Reff Bonus</li>
                     <li class="mb-2">3 000 TGR Staked = 16% Reff Bonus</li>
                     <li class="mb-2">7 000 TGR Staked = 18% Reff Bonus</li>
                     <li>10 000 TGR Staked = 20% Reff Bonus</li>
                  </ul>
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
               <a href="#!" class="d-flex align-items-start">
               <span>What percentage of Swap referral rewards will I earn if I have 0 TGR staked in TGR Holder Pool?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse10" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  If you have 0 TGR staked in the TGR Holder pool, you will be getting 10% by default. To earn more in the Swap Referral Program on Biswap, you need to stake TGR in the Holder Pool.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
               <a href="#!" class="d-flex align-items-start">
               <span>Is the Swap referral program active for all swap pairs?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse11" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  No. Referral Program consider only whitelisted pairs, including but not limited to:ETH - BTCB, BUSD - USDT, BTCB - USDT, ETH - USDT, USDC - USDT, BNB - TGR, ETH - BNB, BNB - USDT, BNB - BUSD, BNB - BTCB, USDT - TGR, LINK - BNB, ADA - BNB, DOGE - BNB, CAKE - BNB, UST - BUSD, DOT - BNB, DAI - USDT, UNI - BNB, FIL - USDT, USDT - LTC, BUSD - VAI, SOL - BNB, BUSD - TUSD, BFG - TGR, XVS - BNB, AVAX - BNB. Find the complete list of whitelisted pairs in Biswap Docs
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
               <a href="#!" class="d-flex align-items-start">
               <span>How much can I earn from my friends' Farms & Launchpools?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse12" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  You can expect a 5% return from your friends' earnings in TGR.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
               <a href="#!" class="d-flex align-items-start">
               <span>Is Referral Program Active for all Launchpools?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse13" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  No. Referral Program is active only for Stake BSW - Earn BSW Launchpool without auto-compound.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse14" aria-expanded="false" aria-controls="collapse14">
               <a href="#!" class="d-flex align-items-start">
               <span>When will I get my referral reward from Farms & Launchpools?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse14" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  You will get your referral reward the moment your friend makes Harvest.
               </div>
            </div>
            <!-- item -->
            <div class="accordion-item card p-4 mb-3 " data-bs-toggle="collapse" data-bs-target="#collapse15" aria-expanded="false" aria-controls="collapse15">
               <a href="#!" class="d-flex align-items-start">
               <span>Can I profit from the Referral Program without any investments from my side?</span>
               <i class="fa-solid fa-angle-right ms-auto"></i>
               </a>
               <div id="collapse15" class="accordion-collapse collapse mt-4" data-bs-parent="#accordionReferal">
                  Yes, you can earn 10% from the Swap Referral Program and 5% from Farms & Launchpools without any required investments from your side.
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<?php
   require "_footer.php";
   ?>
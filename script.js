$(document).ready(function() {

    $('#print').click(function() {
      var name = $('#name').val();  
      var date = $('#date').val();
      var grandTotal = $('#totalprice').val();

      let modalContent = `
      Name: ${name}<br>Date: ${date}<br>
      <table class="table">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item</th>
      <th scope="col">Quantity</th>
      <th scope="col">Amount</th>
    </tr>
    </thead>
    <tbody>
    ${insertRow()}
    </tbody>
    </table>
    <hr>Grand Total: ${grandTotal}
  `;

    
     $('#modalBody').html(modalContent);  
    $('#myModal').modal('show');  // Show the modal
    });
    

    $('#add').click( function(){

      
      $("#row").append( `
          
         <div class="row input-group justify-content-center">
              <div class="col-4 mt-3">
                  <div class="form-group">
              <select class="form-select" aria-label="Default select example">
              
             ${selectList()}
            </select>
                  </div>
              </div>
              <div class="col-4 mt-3">
                  <div class="form-group">
                      <input type="number" class="form-control quantity" placeholder="Quantity" />
                  </div>
              </div>
              <div class="col-4 mt-3">
                  <div class="form-group">
                      <input type="text" class="form-control price" placeholder="Amount" readonly />
                  </div>
              </div>
          </div>
      `);

  });


  $('#remove').click( function(){


      $("#row .input-group").last().remove();
      updateTotal();
      
  });

  $(document).on('change', '.form-select, .quantity', function() { //listening for changes in any dropdown or quantity input
    // Find the row this select or input is in
    let row = $(this).closest('.input-group');
  
    let selectedItem = row.find('.form-select').val();// getting the selected item from the .form-select value
    let quantity = row.find('.quantity').val();
    // cant use var quantity = $("#quantity").val(); since ada banyak id quantity, sebab kita add dynamically
  
    // Make sure both are valid
    if (selectedItem && !isNaN(quantity)) {
      let price = menuItems[selectedItem];
      let total = price * quantity;
  
      row.find('.price').val(`RM ${total.toFixed(2)}`);
    } else {
      row.find('.price').val('');
    }

    updateTotal();
  });

     /**
 *  Why use .find()?
 * 
 * - Since kita add rows dynamically, each row ada their own select, quantity and price inputs
 * - Kalau guna $("#quantity").val(), kita akan dapat value dari input pertama je (bukan dari row yang kita interact dengan)
 * 
 *  Why use .closest()?
 * 
 * - .closest() akan naik ke atas DOM (Document Object Model) untuk cari parent terdekat yang kita target (dalam kes ni, row atau .input-group)
 * - Lepas tu guna .find() untuk cari input dalam row tu je — supaya kita tak ambil value dari row lain
 * - penting supaya bila user tukar quantity atau pilih item, kita update harga untuk row tu sahaja
 * 
 * 
 */

});

// tak guna dah copy(), save as future ref
function copy(){
    const textToCopy = $('#modalBody').text();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Copied!");
      })
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Failed to copy text.");
      });
}

const menuItems = {
  "Popsicle": 1.00, 
  "Nasi Goreng Telur (Promo)": 2.00,
  "Nasi Lemak Ayam (Promo)": 3.00,
  "Nasi Goreng Ayam (Promo)": 3.00,
  "Donut 1 Pcs": 1.00,
  "Donut 4 Pcs": 3.00,
  "Nasi Goreng Ayam": 4.00,
  "Nasi Lemak Ayam": 4.00,
  "Nasi Lemak Telur Mata": 3.00,
  "Nasi Goreng Telur Mata": 3.00,
  "Sandwich Telur": 3.00,
  "Chicken Popcorn": 4.00,
  "Spaghetti": 3.50,
  "Meatball": 4.00,
  "Bubur Ayam": 3.00,
  "Sosej Egg Rolls": 4.00,
  "Roti Sosej": 2.00,
  "Maggi Goreng Telur Mata": 3.00,
  "Maggi Goreng Kosong": 3.00,
  "Macaroni Goreng": 3.00,
  "Spaghetti (Promo)": 4.00,
  "Bekas Polisterine": 0.50,
  "Roti Sosej (Promo)": 1.00,
  "Bubur Ayam (Promo)": 1.00,
  "Sosej Roll": 2.50,
  "Burger Ayam Crispy": 5.50,
  "Burger Ayam": 3.00,
  "Macaroni Ayam": 4.00,
  "Macaroni Telur": 3.00,
  "Kuey Teow Goreng": 3.00,
  "Kuey Teow Telur": 3.00,
  "Kuey Teow Ayam": 4.00,
  "Meatball (Promo)": 3.00,
  "Macaroni Telur (Promo)": 2.00,
  "Kuey Teow Ayam (Promo)": 3.00,
  "Kuey Teow Telur (Promo)": 2.00,
  "Kuey Teow Goreng (Promo)": 2.00,
  "Nasi Goreng Ayam (Promo)": 3.00,
  "Donut Ketiang Telur (Promo)": 2.00
};
  
function selectList(){
  let option = '<option selected disabled >Select An item</option>' //header
  for (let item in menuItems){
    option += `<option value = "${item}">${item}</option>`;
  }

  return option;
}

function updateTotal(){
  let grandTotal = 0;

  //iterate every price input to get grandtotal
  $('.price').each(function() {
    let priceText = $(this).val();
    if (priceText) {
      let price = parseFloat(priceText.replace('RM ', '').trim()); //only get the price and trim the RM
      grandTotal += price;
    }
  });

  $('#totalprice').val(`RM ${grandTotal.toFixed(2)}`);

}

function insertRow(){

    //iterating thru every dynamically inserted .input-group
    let rows = '';
    let x = 0
  $('.input-group').each(function() {
       
    //use .closest() and .find() because its a dynamically inserted element
  

    const item = $(this).find('.form-select').val();
    const quantity = $(this).find('.quantity').val();
    const price = $(this).find('.price').val();

    rows += `
            <tr>
              <th scope="row">${x+1}</th>
              <td>${item}</td>
              <td>${quantity}</td>
              <td>${price}</td>
            </tr>
                    `;
       x += 1;             
    });

    return rows

}

function printToPDF() {
  
  $('#myModal').modal('hide');

  // Wait a tiny bit for the modal to fully hide before printing
  setTimeout(function () {
    var printContents = $('#modalBody').html();
    var originalContents = $('body').html();
    $("body").css("background","white");
    $("body").css("color","black");

    $('body').html(printContents);
    window.print();
    

     // restores original page and reloads to recover dynamic elements
  }); // delay to let the modal finish closing animation
}
